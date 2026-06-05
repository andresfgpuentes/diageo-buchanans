/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Palette, Layers, FileWarning, HelpCircle, Check, Copy, AlertTriangle } from 'lucide-react';
import { ColorDefinition } from '../types';

const BRAND_COLORS: ColorDefinition[] = [
  // Night Mode (Obligatorio en emails)
  { name: 'Fondo body y exterior', hex: '#000000', description: 'Uso obligatorio en fondo de body y tablas exteriores.', category: 'Night Mode' },
  { name: 'Franja header', hex: '#015D2F', description: 'Verde Exuberante sólido en cabecera principal sin texturas.', category: 'Night Mode' },
  { name: 'Headlines y destacados', hex: '#fffd48', description: 'Pistacho/Amarillo Corporativo para llamados y textos clave.', category: 'Night Mode' },
  { name: 'Texto párrafos', hex: '#FFFFFF', description: 'Blanco puro con peso 300 para óptima legibilidad.', category: 'Night Mode' },
  { name: 'Texto footer legal', hex: '#888888', description: 'Gris neutro de tamaño 11px para disclaimers y links.', category: 'Night Mode' },
  
  // DeLuxe (Referencia Marca)
  { name: 'Lush Green (Primary)', hex: '#015D2F', description: 'Verde heráldico icónico de la botella DeLuxe.', category: 'DeLuxe' },
  { name: 'Buchanan\'s Green', hex: '#119e20', description: 'Verde brillante de realce intermedio.', category: 'DeLuxe' },
  { name: 'Sello Red Seal', hex: '#cc0000', description: 'Sello rojo lacre de garantía y familia reunida.', category: 'DeLuxe' },
  { name: 'Pistacchio Accent', hex: '#CAE124', description: 'Variante verdosa pistacho para marca original.', category: 'DeLuxe' },

  // Piña Variation
  { name: 'Piña Yellow', hex: '#fffd48', description: 'Verde piña/amarillo brillante característico de la campaña.', category: 'Piña' },
  { name: 'Special Honey Brown', hex: '#986444', description: 'Marrón miel característico de los 18 años.', category: 'Green Seal' },
];

export function BrandGuide() {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-white space-y-8" id="brand-guide">
      {/* Header */}
      <div className="flex items-center space-x-3 border-b border-neutral-800 pb-4">
        <Palette className="text-yellow-400 w-6 h-6" />
        <div>
          <h2 className="text-lg font-bold tracking-tight text-yellow-400">Identidad de Marca - Buchanan's</h2>
          <p className="text-xs text-neutral-400 font-mono">Guía de Estilo Oficial & Diageo Marketing Code</p>
        </div>
      </div>

      {/* Idea Central */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-neutral-950 p-4 rounded-xl border border-neutral-850">
        <div>
          <h3 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-2">Concepto de Diseño</h3>
          <ul className="space-y-2 text-sm text-neutral-300">
            <li>
              <span className="font-semibold text-white">Idea Central:</span> "Ritmo in the Circle" — el círculo como ancla visual inspirado en el Red Seal.
            </li>
            <li>
              <span className="font-semibold text-white">Tagline Oficial:</span> <span className="font-mono bg-neutral-900 px-1.5 py-0.5 rounded text-yellow-400">ESTAMOS EN FAMILIA</span>
            </li>
            <li>
              <span className="font-semibold text-white">Esencia:</span> Generosidad, Calor humano y el Vibrante Ritmo de LATAM.
            </li>
            <li>
              <span className="font-semibold text-white">Aliado FY26:</span> Rauw Alejandro — Copa Mundial FIFA 26™
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-2">Plataforma "Familias Elegidas"</h3>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Se enfoca en esas conexiones significativas que trascienden lo laboral, el colegio o la universidad, y se convierten en vínculos permanentes. Por esto, la voz de la marca habla como alguien que ya hace parte de ese hogar: <strong className="text-white">"No vende, invita. No grita, convoca."</strong>
          </p>
        </div>
      </div>

      {/* Palette Section */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Layers className="text-emerald-400 w-4 h-4" />
          <h3 className="text-sm font-bold text-neutral-200">Paleta de Colores Autorizada (E-mails)</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BRAND_COLORS.map((color) => (
            <div 
              key={color.name}
              onClick={() => handleCopy(color.hex)}
              className="flex items-center justify-between p-3 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-neutral-700 cursor-pointer transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-md border border-neutral-700 shadow-inner flex items-center justify-center relative"
                  style={{ backgroundColor: color.hex }}
                >
                  {color.hex === '#FFFFFF' && <div className="absolute inset-0 border border-neutral-300 rounded-md"></div>}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-white">{color.name}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-neutral-850 font-mono text-neutral-400 text-[10px]">
                      {color.category}
                    </span>
                  </div>
                  <span className="text-xs text-neutral-400 font-mono">{color.hex}</span>
                </div>
              </div>
              <button className="text-neutral-500 group-hover:text-yellow-400 transition-colors p-1">
                {copiedHex === color.hex ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-neutral-400 mt-2 italic">
          💡 Haz clic en cualquier tarjeta de color para copiar el código hexadecimal al portapapeles.
        </p>
      </div>

      {/* Vocabulary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm mb-3">
            <Check className="w-4 h-4" />
            <span>VOCABULARIO PERMITIDO (USAR)</span>
          </div>
          <ul className="space-y-1.5 text-xs text-neutral-300">
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Familia elegida / La familia</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>El círculo / Estamos juntos</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Compartir / Reunirse</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Celebrar / El momento</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Cooling Break / Buchanita</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Estamos en familia</span>
            </li>
          </ul>
        </div>

        <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/40">
          <div className="flex items-center space-x-2 text-red-400 font-bold text-sm mb-3">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span>TOTALMENTE ADVERTIDO (EVITAR / NO USAR)</span>
          </div>
          <ul className="space-y-1.5 text-xs text-neutral-300">
            <li className="flex items-center space-x-2">
              <span className="text-red-400">✗</span>
              <span>Fiesta / Rumba</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-red-400">✗</span>
              <span>Tomar / Beber en exceso</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-red-400">✗</span>
              <span>Emborracharse / Enloquecer</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-red-400">✗</span>
              <span>Incentivos directos al consumo</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-red-400">✗</span>
              <span>"Médica", "empiézate un trago"</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-red-400">✗</span>
              <span>Glamorizar el exceso de alcohol</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Diageo Code restrictions */}
      <div className="p-4 rounded-xl bg-neutral-950 border-l-4 border-yellow-500 text-xs text-neutral-300 space-y-2">
        <div className="flex items-center space-x-2 text-yellow-500 font-bold">
          <AlertTriangle className="w-4 h-4" />
          <span>RESTRICCIONES DIAGEO MARKETING CODE (MANDATORIO)</span>
        </div>
        <ol className="list-decimal pl-4 space-y-1">
          <li><strong>NUNCA</strong> mostrar personas consumiendo alcohol en imágenes.</li>
          <li><strong>NUNCA</strong> incentivar directamente el consumo ("toma más", "brinda ahora").</li>
          <li><strong>NUNCA</strong> asociar el alcohol con desinhibición, fiesta o exceso.</li>
          <li><strong>NUNCA</strong> mostrar personas con signos de haber consumido en exceso.</li>
          <li><strong>SIEMPRE</strong> incluir el disclaimer exacto de Diageo en el footer.</li>
          <li><strong>SIEMPRE</strong> incluir la etiqueta "18+" donde aplique por regulación.</li>
          <li>El foco debe ser en la reunión, el momento, la familia elegida — no en el trago.</li>
        </ol>
      </div>

    </div>
  );
}
