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
}

export function EmailPreview({ variables, contentType }: EmailPreviewProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [previewMode, setPreviewMode] = useState<'ampscript' | 'preview'>('preview');
  const [copied, setCopied] = useState(false);
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
                ? 'bg-yellow-400 text-black'
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
                ? 'bg-yellow-400 text-black'
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
            {/* AMPScript vs Simulated toggles */}
            <div className={`flex items-center space-x-1 bg-neutral-900 p-1 border border-neutral-800 ${contentType === 'landing' ? 'rounded-none' : 'rounded-lg'}`}>
              <button
                onClick={() => setPreviewMode('preview')}
                className={`px-3 py-1 text-[10px] uppercase font-bold transition-colors ${
                  previewMode === 'preview'
                    ? 'bg-neutral-800 text-emerald-400'
                    : 'text-neutral-500 hover:text-neutral-300'
                } ${contentType === 'landing' ? 'rounded-none' : 'rounded'}`}
                title="Sustituir marcas con valores simulados de prueba"
              >
                Simular Cliente
              </button>
              <button
                onClick={() => setPreviewMode('ampscript')}
                className={`px-3 py-1 text-[10px] uppercase font-bold transition-colors ${
                  previewMode === 'ampscript'
                    ? 'bg-neutral-800 text-yellow-400'
                    : 'text-neutral-500 hover:text-neutral-300'
                } ${contentType === 'landing' ? 'rounded-none' : 'rounded'}`}
                title="Mostrar variables de Salesforce (%%FirstName%%, etc)"
              >
                AMPscript Bruto
              </button>
            </div>

            {/* Viewports (Desktop / Mobile) */}
            <div className={`flex items-center space-x-1 bg-neutral-900 p-1 border border-neutral-800 ${contentType === 'landing' ? 'rounded-none' : 'rounded-lg'}`}>
              <button
                onClick={() => setViewport('desktop')}
                className={`p-1.5 transition-colors ${
                  viewport === 'desktop' ? 'bg-neutral-800 text-yellow-400' : 'text-neutral-500'
                } ${contentType === 'landing' ? 'rounded-none' : 'rounded'}`}
                title="Vista Escritorio (600px)"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewport('mobile')}
                className={`p-1.5 transition-colors ${
                  viewport === 'mobile' ? 'bg-neutral-800 text-yellow-400' : 'text-neutral-500'
                } ${contentType === 'landing' ? 'rounded-none' : 'rounded'}`}
                title="Vista Móvil (Pilas apiladas adaptables)"
              >
                <Smartphone className="w-4 h-4" />
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
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 bg-neutral-850 hover:bg-neutral-800 text-xs font-bold text-yellow-400 transition-colors border border-neutral-800 ${contentType === 'landing' ? 'rounded-none' : 'rounded-lg'}`}
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
          <div className={`w-full max-w-2xl h-[560px] flex flex-col bg-neutral-950 border border-neutral-850 overflow-hidden ${contentType === 'landing' ? 'rounded-none' : 'rounded-xl'}`}>
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
          {contentType === 'email' ? 'Max Width: 600px • Tables Only • Poppins/Arial' : 'Full Width Responsive • Tailwind CSS • Custom Forms'}
        </div>
      </div>

    </div>
  );
}
