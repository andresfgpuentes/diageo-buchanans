/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { EmailVariables } from '../types';
import { generateWelcomeEmailHtml, generateWelcomeLandingHtml } from '../utils/htmlGenerator';
import { Eye, Code, Smartphone, Monitor, Copy, Check, Download, Sparkles, AlertCircle } from 'lucide-react';

interface EmailPreviewProps {
  variables: EmailVariables;
  contentType: 'email' | 'landing';
  brand?: 'buchanans' | 'smirnoff' | 'donjulio';
}

export function EmailPreview({ variables, contentType, brand = 'buchanans' }: EmailPreviewProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [previewMode, setPreviewMode] = useState<'ampscript' | 'preview'>('preview');
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isCapturing, setIsCapturing] = useState<'jpg' | 'pdf' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const triggerCapture = async (type: 'jpg' | 'pdf') => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentDocument || !iframe.contentDocument.body) {
      alert("La previsualización no está lista aún.");
      return;
    }

    try {
      setIsCapturing(type);

      const body = iframe.contentDocument.body;
      const width = body.scrollWidth || 600;
      const height = body.scrollHeight || 1200;

      const { toJpeg } = await import('html-to-image');

      const dataUrl = await toJpeg(body, {
        quality: 0.95,
        backgroundColor: brand === 'donjulio' ? '#E4E2DB' : brand === 'smirnoff' ? '#DA0022' : '#0a0a0a',
        width: width,
        height: height,
        style: {
          width: width + 'px',
          height: height + 'px',
          transform: 'scale(1)',
          transformOrigin: 'top left',
        }
      });

      if (type === 'jpg') {
        const link = document.createElement('a');
        link.download = `${brand}_${contentType === 'email' ? 'email' : 'landing'}_captura.jpg`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const { jsPDF } = await import('jspdf');
        const orientation = width > height ? 'l' : 'p';
        const pdf = new jsPDF({
          orientation: orientation,
          unit: 'px',
          format: [width, height],
          hotfixes: ['px_scaling']
        });
        pdf.addImage(dataUrl, 'JPEG', 0, 0, width, height);
        pdf.save(`${brand}_${contentType === 'email' ? 'email' : 'landing'}_captura.pdf`);
      }
    } catch (err) {
      console.error('Error al capturar la previsualización:', err);
      alert("No se pudo generar el archivo de captura visual. Esto ocurre usualmente por restricciones de seguridad (CORS) de las imágenes en el entorno de pruebas o restricciones de descarga del sandbox. Puedes descargar el archivo .html definitivo haciendo clic en 'Descargar .html' o copiar el código directamente.");
    } finally {
      setIsCapturing(null);
    }
  };

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
    ? generateWelcomeEmailHtml(variables, previewMode, brand)
    : generateWelcomeLandingHtml(variables, previewMode, brand);
  // Always offer the Salesforce production version (with raw AMPScript) in the code editor tab
  const productionHtml = contentType === 'email'
    ? generateWelcomeEmailHtml(variables, 'ampscript', brand)
    : generateWelcomeLandingHtml(variables, 'ampscript', brand);

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
    link.download = `${brand}_${contentType === 'email' ? 'bienvenida' : 'landing'}_${previewMode === 'preview' ? 'test' : 'sfmc'}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`bg-neutral-900 border border-neutral-800 overflow-hidden flex flex-col h-full text-white ${contentType === 'landing' ? 'rounded-none' : 'rounded-2xl'}`} id="email-preview">
      
      {/* Top bar with tabs and control icons */}
      <div className="bg-neutral-950 border-b border-neutral-800 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Navigation tabs */}
        <div className={`flex space-x-1.5 bg-neutral-900 p-1 border border-neutral-800 self-start ${contentType === 'landing' ? 'rounded-none' : 'rounded-xl'}`}>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center space-x-2 px-4 py-2 text-xs font-bold transition-colors ${
              activeTab === 'preview'
                ? brand === 'donjulio' ? 'bg-[#0055C8] text-white' : brand === 'smirnoff' ? 'bg-red-500 text-white' : 'bg-yellow-400 text-black'
                : 'text-neutral-400 hover:text-white'
            } ${contentType === 'landing' ? 'rounded-none' : 'rounded-lg'}`}
          >
            <Eye className="w-4 h-4" />
            <span>Previsualizar</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center space-x-2 px-4 py-2 text-xs font-bold transition-colors ${
              activeTab === 'code'
                ? brand === 'donjulio' ? 'bg-[#0055C8] text-white' : brand === 'smirnoff' ? 'bg-red-500 text-white' : 'bg-yellow-400 text-black'
                : 'text-neutral-400 hover:text-white'
            } ${contentType === 'landing' ? 'rounded-none' : 'rounded-lg'}`}
          >
            <Code className="w-4 h-4" />
            <span>{contentType === 'email' ? 'Código SFMC HTML' : 'Código CloudPage HTML'}</span>
          </button>
        </div>

        {/* Dynamic Controls based on selected Tab */}
        {activeTab === 'preview' ? (
          <div className="flex items-center flex-wrap gap-3">
            {/* Viewports (Desktop / Mobile) */}
            <div className={`flex items-center space-x-1 bg-neutral-900 p-1 border border-neutral-800 ${contentType === 'landing' ? 'rounded-none' : 'rounded-lg'}`}>
              <button
                onClick={() => setViewport('desktop')}
                className={`p-1.5 transition-colors ${
                  viewport === 'desktop' ? brand === 'donjulio' ? 'bg-neutral-800 text-blue-400' : brand === 'smirnoff' ? 'bg-neutral-800 text-red-400' : 'bg-neutral-800 text-yellow-400' : 'text-neutral-500'
                } ${contentType === 'landing' ? 'rounded-none' : 'rounded'}`}
                title="Vista Escritorio (600px)"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewport('mobile')}
                className={`p-1.5 transition-colors ${
                  viewport === 'mobile' ? brand === 'donjulio' ? 'bg-neutral-800 text-blue-400' : brand === 'smirnoff' ? 'bg-neutral-800 text-red-400' : 'bg-neutral-800 text-yellow-400' : 'text-neutral-500'
                } ${contentType === 'landing' ? 'rounded-none' : 'rounded'}`}
                title="Vista Móvil (Pilas apiladas adaptables)"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            {/* Premium Download Capture Dropdown */}
            <div className="relative flex items-center space-x-2" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                disabled={isCapturing !== null}
                className={`flex items-center space-x-2 px-3.5 py-2.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-neutral-700 text-xs font-bold ${brand === 'donjulio' ? 'text-blue-450' : brand === 'smirnoff' ? 'text-red-400' : 'text-yellow-400'} transition-all duration-150 cursor-pointer select-none ${contentType === 'landing' ? 'rounded-none' : 'rounded-xl'}`}
              >
                {isCapturing !== null ? (
                  <>
                    <span className={`w-3.5 h-3.5 border-2 border-dashed ${brand === 'donjulio' ? 'border-blue-500' : brand === 'smirnoff' ? 'border-red-450' : 'border-yellow-400'} border-t-transparent rounded-full animate-spin`}></span>
                    <span>Generando {isCapturing.toUpperCase()}...</span>
                  </>
                ) : (
                  <>
                    <Download className={`w-4 h-4 ${brand === 'donjulio' ? 'text-blue-450' : brand === 'smirnoff' ? 'text-red-400' : 'text-yellow-400'}`} />
                    <span>Descargar Captura</span>
                    <span className="text-[10px] text-neutral-500">▼</span>
                  </>
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-neutral-950 border border-neutral-800 shadow-[0_10px_30px_rgba(0,0,0,0.8)] rounded-xl overflow-hidden z-[100] animate-fadeIn">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      triggerCapture('jpg');
                    }}
                    className="w-full text-left px-4 py-3 text-xs font-bold hover:bg-neutral-900 flex items-center space-x-2 border-b border-neutral-900 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <span className={`w-2 h-2 rounded-full ${brand === 'donjulio' ? 'bg-[#0055C8]' : brand === 'smirnoff' ? 'bg-red-500' : 'bg-yellow-400'} shrink-0`}></span>
                    <span>Descargar Imagen (.jpg)</span>
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      triggerCapture('pdf');
                    }}
                    className="w-full text-left px-4 py-3 text-xs font-bold hover:bg-neutral-900 flex items-center space-x-2 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <span className={`w-2 h-2 rounded-full ${brand === 'donjulio' ? 'bg-[#F47521]' : brand === 'smirnoff' ? 'bg-yellow-400' : 'bg-emerald-500'} shrink-0`}></span>
                    <span>Descargar Documento (.pdf)</span>
                  </button>
                </div>
              )}

              {/* Direct HTML Download Button on the main bar */}
              <button
                onClick={handleDownload}
                className={`flex items-center space-x-1.5 px-3.5 py-2.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-neutral-700 text-xs font-bold text-white transition-all duration-150 cursor-pointer select-none ${contentType === 'landing' ? 'rounded-none' : 'rounded-xl'}`}
                title="Descargar archivo .html"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Descargar .html</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 bg-neutral-850 hover:bg-neutral-800 text-xs font-bold text-emerald-400 transition-colors border border-neutral-800 ${contentType === 'landing' ? 'rounded-none' : 'rounded-lg'}`}
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
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 bg-neutral-850 hover:bg-neutral-800 text-xs font-bold ${brand === 'donjulio' ? 'text-blue-400' : brand === 'smirnoff' ? 'text-neutral-200' : 'text-yellow-400'} transition-colors border border-neutral-800 ${contentType === 'landing' ? 'rounded-none' : 'rounded-lg'}`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar .html</span>
            </button>
          </div>
        )}
      </div>

      {/* Main viewport canvas */}
      <div className="flex-1 bg-neutral-950 p-6 flex flex-col items-center justify-center min-h-[500px]">
        {activeTab === 'preview' ? (
          <div 
            className={`transition-all duration-300 ease-in-out border border-neutral-850 shadow-2xl overflow-hidden bg-black flex flex-col ${contentType === 'landing' ? 'rounded-none' : 'rounded-2xl'}`}
            style={{ 
              width: viewport === 'desktop' ? (contentType === 'landing' ? '100%' : '600px') : '375px',
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
              <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center space-x-1 ${brand === 'donjulio' ? 'text-blue-400 bg-blue-950/20' : brand === 'smirnoff' ? 'text-red-400 bg-red-950/20' : 'text-emerald-400 bg-emerald-950/20'}`}>
                <Sparkles className="w-2.5 h-2.5" />
                <span>{brand === 'donjulio' ? 'STONE MODE' : brand === 'smirnoff' ? 'RED MODE' : 'NIGHT MODE'}</span>
              </div>
            </div>

            {/* Simulated Device Sandbox */}
            <div className="flex-1 relative bg-black">
              <iframe 
                ref={iframeRef}
                srcDoc={compiledHtml}
                className="w-full h-full border-0 bg-black"
                title={contentType === 'email' ? `${brand === 'donjulio' ? 'Don Julio' : brand === 'smirnoff' ? 'Smirnoff' : "Buchanan's"} Welcome Email Sandbox` : `${brand === 'donjulio' ? 'Don Julio' : brand === 'smirnoff' ? 'Smirnoff' : "Buchanan's"} Welcome Landing Sandbox`}
              />
            </div>
          </div>
        ) : (
          <div className={`w-full max-w-2xl h-[560px] flex flex-col bg-neutral-950 border border-neutral-850 overflow-hidden ${contentType === 'landing' ? 'rounded-none' : 'rounded-xl'}`}>
            {/* Information Warning banner */}
            <div className={`border-b px-4 py-2.5 flex items-start space-x-2 text-[11px] leading-normal ${brand === 'donjulio' ? 'bg-blue-950/10 border-blue-900/30 text-blue-400' : brand === 'smirnoff' ? 'bg-red-950/10 border-red-900/30 text-red-400' : 'bg-emerald-950/10 border-b border-emerald-900/30 text-emerald-400'}`}>
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
          <span className={`w-2 h-2 rounded-full ${brand === 'donjulio' ? 'bg-[#0055C8]' : brand === 'smirnoff' ? 'bg-red-500' : 'bg-emerald-450'} animate-pulse`}></span>
          <span>{contentType === 'email' ? 'Modelo de Email Generado con Éxito' : 'Modelo de Landing Page Generado con Éxito'}</span>
        </div>
        <div className="font-mono text-neutral-500">
          {contentType === 'email' ? `Max Width: 600px • Tables Only • ${brand === 'donjulio' ? 'Space Grotesk' : brand === 'smirnoff' ? 'Archivo' : 'Poppins'}/Arial` : 'Full Width Responsive • Tailwind CSS • Custom Forms'}
        </div>
      </div>

    </div>
  );
}
