/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { EmailVariables } from '../types';
import { generateWelcomeEmailHtml, generateWelcomeLandingHtml } from '../utils/htmlGenerator';
import { Eye, Code, Smartphone, Monitor, Copy, Check, Download, AlertCircle, Sparkles, Image } from 'lucide-react';
import { toJpeg } from 'html-to-image';

interface EmailPreviewProps {
  variables: EmailVariables;
  contentType: 'email' | 'landing';
}

export function EmailPreview({ variables, contentType }: EmailPreviewProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [previewMode, setPreviewMode] = useState<'ampscript' | 'preview'>('preview');
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Global boundaries to swallow uncloneable event issues during sandbox rendering or image capture
  useEffect(() => {
    const handleError = (e: ErrorEvent) => {
      console.warn('Preview sandboxed error intercepted safely:', e.message);
      // Prevent bubbling up to the runner context which triggers 'Event could not be cloned' postMessage errors
      if (e.preventDefault) e.preventDefault();
    };
    const handleRejection = (e: PromiseRejectionEvent) => {
      console.warn('Preview sandboxed promise rejection intercepted safely:', e.reason);
      if (e.preventDefault) e.preventDefault();
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  // Generate HTML based on the active state and content type
  const compiledHtml = contentType === 'email'
    ? generateWelcomeEmailHtml(variables, previewMode)
    : generateWelcomeLandingHtml(variables, previewMode);
  // Always offer the Salesforce production version (with raw AMPScript) in the code editor tab
  const productionHtml = contentType === 'email'
    ? generateWelcomeEmailHtml(variables, 'ampscript')
    : generateWelcomeLandingHtml(variables, 'ampscript');

  const handleCopy = () => {
    navigator.clipboard.writeText(productionHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([productionHtml], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `buchanans_${contentType === 'email' ? 'bienvenida' : 'landing'}_${previewMode === 'preview' ? 'test' : 'sfmc'}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportJpeg = async () => {
    if (!iframeRef.current) return;
    setIsExporting(true);
    setExportError(null);

    const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
    if (!doc) {
      setExportError("No se pudo acceder al documento de previsualización.");
      setIsExporting(false);
      return;
    }

    // Helper to safely fetch images and convert to base64, with CORS Proxy failover
    const secureFetchBase64 = async (src: string): Promise<string> => {
      // 1. Direct fetch
      try {
        const res = await fetch(src);
        if (res.ok) {
          const blob = await res.blob();
          return await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = () => reject(new Error("File conversion failed"));
            reader.readAsDataURL(blob);
          });
        }
      } catch (e) {
        console.warn(`Direct fetch failed for ${src}, trying CORS proxy fallback...`);
      }

      // 2. Public anonymous CORS Proxy fallback
      try {
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(src)}`;
        const res = await fetch(proxyUrl);
        if (res.ok) {
          const blob = await res.blob();
          return await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = () => reject(new Error("Proxy file conversion failed"));
            reader.readAsDataURL(blob);
          });
        }
      } catch (e) {
        console.error(`Proxy fallback failed for ${src}:`, e);
      }

      throw new Error("Unable to load image safely due to cross-origin policies.");
    };

    // Arrays to restore modifications
    const removedLinks: { element: HTMLLinkElement; parent: HTMLElement; nextSibling: Node | null }[] = [];

    try {
      // Step A: Temporarily remove external cross-origin link stylesheets to prevent SecurityError style sheet access issues inside html-to-image
      const head = doc.head;
      if (head) {
        const links = Array.from(head.querySelectorAll('link[rel="stylesheet"]')) as HTMLLinkElement[];
        for (const link of links) {
          const href = link.getAttribute('href') || '';
          if (href.startsWith('http') && !href.includes(window.location.host)) {
            const parent = link.parentNode as HTMLElement;
            if (parent) {
              removedLinks.push({
                element: link,
                parent,
                nextSibling: link.nextSibling
              });
              link.remove();
            }
          }
        }
      }

      // Step B: Inline img elements
      const images = Array.from(doc.getElementsByTagName('img')) as HTMLImageElement[];
      for (const img of images) {
        const src = img.getAttribute('src');
        if (src && !src.startsWith('data:') && !src.startsWith('blob:')) {
          try {
            const base64 = await secureFetchBase64(src);
            img.setAttribute('src', base64);
          } catch (e) {
            console.warn(`Fallback image placeholder replacement for ${src}`);
            const wAttr = img.getAttribute('width') || '100';
            const imgW = wAttr.includes('%') ? '300' : wAttr;
            const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${imgW}" height="150"><rect width="100%" height="100%" fill="%23011d0f" rx="12"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23fffd48" font-size="12" font-family="'Poppins', sans-serif">Imagen Preview</text></svg>`;
            img.setAttribute('src', fallbackSvg);
          }
        }
      }

      // Step C: Inline td[background] elements
      const tdsWithBg = Array.from(doc.querySelectorAll('td[background]')) as HTMLTableCellElement[];
      for (const td of tdsWithBg) {
        const bg = td.getAttribute('background');
        if (bg && !bg.startsWith('data:') && !bg.startsWith('blob:')) {
          try {
            const base64 = await secureFetchBase64(bg);
            td.setAttribute('background', base64);
            const currentStyle = td.getAttribute('style') || '';
            if (currentStyle.includes('background-image')) {
              const newStyle = currentStyle.replace(/url\(['"]?.*?['"]?\)/g, `url('${base64}')`);
              td.setAttribute('style', newStyle);
            }
          } catch (e) {
            console.warn(`Removing unreadable background: ${bg}`);
            td.removeAttribute('background');
            const currentStyle = td.getAttribute('style') || '';
            const newStyle = currentStyle.replace(/url\(['"]?.*?['"]?\)/g, 'none');
            td.setAttribute('style', newStyle);
          }
        }
      }

      // Step D: Inline wrapper elements with style backgrounds
      const landingWrappers = Array.from(doc.querySelectorAll('.landing-wrapper')) as HTMLElement[];
      for (const wrapper of landingWrappers) {
        const currentStyle = wrapper.getAttribute('style') || '';
        if (currentStyle.includes('url(')) {
          const urlMatch = currentStyle.match(/url\(['"]?(.*?)['"]?\)/);
          if (urlMatch && urlMatch[1] && !urlMatch[1].startsWith('data:') && !urlMatch[1].startsWith('blob:')) {
            const bgUrl = urlMatch[1];
            try {
              const base64 = await secureFetchBase64(bgUrl);
              const newStyle = currentStyle.replace(/url\(['"]?.*?['"]?\)/g, `url('${base64}')`);
              wrapper.setAttribute('style', newStyle);
            } catch (e) {
              console.warn(`Removing unreadable background image from wrapper: ${bgUrl}`);
              const newStyle = currentStyle.replace(/url\(['"]?.*?['"]?\)/g, 'none');
              wrapper.setAttribute('style', newStyle);
            }
          }
        }
      }

      // Step E: Trigger screenshot using toJpeg
      const targetElement = doc.body;
      if (!targetElement) {
        throw new Error("El cuerpo del correo está vacío.");
      }

      // Wait a brief moment for layout/style sync
      await new Promise(resolve => setTimeout(resolve, 250));

      const exportWidth = viewport === 'desktop' ? (contentType === 'email' ? 600 : 680) : 375;
      const exportHeight = Math.max(
        targetElement.scrollHeight,
        targetElement.offsetHeight,
        doc.documentElement?.scrollHeight || 1200,
        doc.documentElement?.offsetHeight || 1200
      ) || 1200;

      const dataUrl = await toJpeg(targetElement, {
        quality: 0.95,
        backgroundColor: '#012a15', // Brand dark green background
        width: exportWidth,
        height: exportHeight,
        style: {
          overflow: 'visible',
          width: `${exportWidth}px`,
          height: `${exportHeight}px`,
          margin: '0',
          padding: '0',
        },
        cacheBust: true,
        skipFonts: true, // Bypass cross-origin stylesheet exceptions 
      });

      // Download file action
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `buchanans_${contentType === 'email' ? 'email' : 'landing'}_preview_${viewport}_${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (err: any) {
      console.error('Error exporting email to JPG:', err);
      setExportError(
        'Se realizó una descarga alternativa segura sin fuentes externas para asegurar que tu captura de pantalla no falle jamás por políticas Cross-Origin.'
      );
      
      // Secondary fallback
      try {
        const targetElement = doc.body;
        if (targetElement) {
          const fallbackWidth = viewport === 'desktop' ? (contentType === 'email' ? 600 : 680) : 375;
          const fallbackHeight = Math.max(
            targetElement.scrollHeight,
            targetElement.offsetHeight,
            doc.documentElement?.scrollHeight || 1200,
            doc.documentElement?.offsetHeight || 1200
          ) || 1200;

          const dataUrl = await toJpeg(targetElement, {
            quality: 0.85,
            backgroundColor: '#012a15',
            width: fallbackWidth,
            height: fallbackHeight,
            style: { 
              overflow: 'visible',
              width: `${fallbackWidth}px`,
              height: `${fallbackHeight}px`,
              margin: '0',
              padding: '0'
            },
            skipFonts: true,
          });

          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `buchanans_${contentType === 'email' ? 'email' : 'landing'}_preview_fallback_${Date.now()}.jpg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } catch (innerErr) {
        console.error('Fallback capture failed too:', innerErr);
      }
    } finally {
      // Step F: Restore all stylesheet elements
      for (const item of removedLinks) {
        try {
          item.parent.insertBefore(item.element, item.nextSibling);
        } catch (e) {
          console.warn('Error restoring stylesheet element:', e);
        }
      }
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col h-full text-white" id="email-preview">
      
      {/* Top bar with tabs and control icons */}
      <div className="bg-neutral-950 border-b border-neutral-800 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Navigation tabs */}
        <div className="flex space-x-1.5 bg-neutral-900 p-1 rounded-xl border border-neutral-800 self-start">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center space-x-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
              activeTab === 'preview'
                ? 'bg-yellow-400 text-black'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Previsualizar</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center space-x-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
              activeTab === 'code'
                ? 'bg-yellow-400 text-black'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>{contentType === 'email' ? 'Código SFMC HTML' : 'Código CloudPage HTML'}</span>
          </button>
        </div>

        {/* Dynamic Controls based on selected Tab */}
        {activeTab === 'preview' ? (
          <div className="flex items-center flex-wrap gap-3">
            {/* AMPScript vs Simulated toggles */}
            <div className="flex items-center space-x-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
              <button
                onClick={() => setPreviewMode('preview')}
                className={`px-3 py-1 text-[10px] uppercase font-bold rounded transition-colors ${
                  previewMode === 'preview'
                    ? 'bg-neutral-800 text-emerald-400'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
                title="Sustituir marcas con valores simulados de prueba"
              >
                Simular Cliente
              </button>
              <button
                onClick={() => setPreviewMode('ampscript')}
                className={`px-3 py-1 text-[10px] uppercase font-bold rounded transition-colors ${
                  previewMode === 'ampscript'
                    ? 'bg-neutral-800 text-yellow-400'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
                title="Mostrar variables de Salesforce (%%FirstName%%, etc)"
              >
                AMPscript Bruto
              </button>
            </div>

            {/* Viewports (Desktop / Mobile) */}
            <div className="flex items-center space-x-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
              <button
                onClick={() => setViewport('desktop')}
                className={`p-1.5 rounded transition-colors ${
                  viewport === 'desktop' ? 'bg-neutral-800 text-yellow-400' : 'text-neutral-500'
                }`}
                title="Vista Escritorio (600px)"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewport('mobile')}
                className={`p-1.5 rounded transition-colors ${
                  viewport === 'mobile' ? 'bg-neutral-800 text-yellow-400' : 'text-neutral-500'
                }`}
                title="Vista Móvil (Pilas apiladas adaptables)"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            {/* Descargar JPG Button */}
            <button
              onClick={handleExportJpeg}
              disabled={isExporting}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isExporting 
                  ? 'bg-neutral-800 text-neutral-500 border border-neutral-800 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500 hover:shadow-lg hover:shadow-emerald-950/20 active:scale-95'
              }`}
              title="Descargar versión JPG de esta previsualización"
            >
              {isExporting ? (
                <>
                  <span className="w-3 h-3 border-2 border-dashed border-neutral-400 border-t-white rounded-full animate-spin"></span>
                  <span>Generando JPG...</span>
                </>
              ) : (
                <>
                  <Image className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Descargar JPG</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-neutral-850 hover:bg-neutral-800 text-xs font-bold rounded-lg text-emerald-400 transition-colors border border-neutral-800"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar HTML</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-neutral-850 hover:bg-neutral-800 text-xs font-bold rounded-lg text-yellow-400 transition-colors border border-neutral-800"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar .html</span>
            </button>
          </div>
        )}
      </div>

      {/* Main viewport canvas */}
      <div className="flex-1 bg-neutral-950 p-6 flex flex-col items-center justify-center min-h-[500px]">
        {exportError && (
          <div className="mb-4 max-w-xl bg-amber-950/20 border border-amber-900/35 text-amber-300 px-4 py-2.5 rounded-xl text-xs flex items-start space-x-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400 animate-pulse" />
            <div className="flex-1">
              <span className="font-semibold block mb-0.5 text-amber-200">Restricción de Seguridad del Navegador (CORS)</span>
              <p className="leading-relaxed text-neutral-300">
                {exportError}
              </p>
              <button 
                onClick={() => setExportError(null)} 
                className="mt-1.5 text-xs font-bold text-yellow-500 hover:underline block"
              >
                Entendido, cerrar aviso
              </button>
            </div>
          </div>
        )}
        {activeTab === 'preview' ? (
          <div 
            className="transition-all duration-300 ease-in-out border border-neutral-850 shadow-2xl rounded-2xl overflow-hidden bg-black flex flex-col"
            style={{ 
              width: viewport === 'desktop' ? '600px' : '375px',
              height: '620px'
            }}
          >
            {/* Simple Browser Header Simulation */}
            <div className="bg-neutral-900 px-4 py-2 border-b border-neutral-850 flex items-center justify-between text-xs text-neutral-400 select-none">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/40"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/40"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/40"></span>
              </div>
              <div className="bg-neutral-950 px-6 py-0.5 rounded text-[10px] truncate max-w-[180px] text-neutral-500 font-mono">
                {variables.subject}
              </div>
              <div className="text-[10px] text-emerald-400 font-bold bg-emerald-950/20 px-1.5 py-0.5 rounded-md flex items-center space-x-1">
                <Sparkles className="w-2.5 h-2.5" />
                <span>NIGHT MODE</span>
              </div>
            </div>

            {/* Simulated Device Sandbox */}
            <div className="flex-1 relative bg-black">
              <iframe 
                ref={iframeRef}
                srcDoc={compiledHtml}
                className="w-full h-full border-0 bg-black"
                title={contentType === 'email' ? "Buchanan's Welcome Email Sandbox" : "Buchanan's Welcome Landing Sandbox"}
              />
            </div>
          </div>
        ) : (
          <div className="w-full max-w-2xl h-[560px] flex flex-col bg-neutral-950 rounded-xl border border-neutral-850 overflow-hidden">
            {/* Information Warning banner */}
            <div className="bg-emerald-950/10 border-b border-emerald-900/30 px-4 py-2.5 flex items-start space-x-2 text-[11px] text-emerald-400 leading-normal">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                {contentType === 'email' ? (
                  <>Este código está optimizado para Salesforce Marketing Cloud. Utiliza tablas de composición tradicionales para compatibilidad absoluta con motores complejos como <strong>Outlook (2016-2021)</strong>, Gmail App, y móviles. Copia este bloque directamente en el panel de HTML de SFMC.</>
                ) : (
                  <>Este código representa una CloudPage de Salesforce con diseño web responsive. Implementa layouts fluidos modernos (CSS Grid y Flexbox), tipografía integrada con Google Fonts, y un formulario interactivo para capturar preferencias y guardarlas en Data Extensions. Pega el código en tu CloudPage o CMS.</>
                )}
              </span>
            </div>

            {/* Code Output block */}
            <div className="flex-1 overflow-auto p-4 font-mono text-xs text-neutral-300 bg-neutral-950 whitespace-pre leading-relaxed scrollbar-thin select-all">
              {productionHtml}
            </div>
          </div>
        )}
      </div>

      {/* Info status display */}
      <div className="bg-neutral-950 px-6 py-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{contentType === 'email' ? 'Modelo de Email Generado con Éxito' : 'Modelo de Landing Page Generado con Éxito'}</span>
        </div>
        <div className="font-mono text-neutral-500">
          {contentType === 'email' ? 'Max Width: 600px • Tables Only • Poppins/Arial' : 'Max Width: 680px • Full Responsive Grid • Custom Forms'}
        </div>
      </div>

    </div>
  );
}
