/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Palette, Layers, HelpCircle, Check, Copy, AlertTriangle } from 'lucide-react';
import { ColorDefinition } from '../types';

interface BrandGuideProps {
  brand?: 'buchanans' | 'smirnoff' | 'donjulio' | 'johnniewalker';
}

const BUCHANANS_COLORS: ColorDefinition[] = [
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
];

const SMIRNOFF_COLORS: ColorDefinition[] = [
  // Red Mode
  { name: 'Wrapper exterior', hex: '#8E0019', description: 'Rojo Profundo para fondo exterior de mail y espaciados secundarios.', category: 'Red Mode' },
  { name: 'Contenedor principal', hex: '#DA0022', description: 'Rojo Smirnoff icónico para el cuerpo central del correo.', category: 'Red Mode' },
  { name: 'Headlines y destacados', hex: '#FFED00', description: 'Amarillo de alto impacto o Spicy para llamados y textos clave.', category: 'Red Mode' },
  { name: 'Texto de párrafos', hex: '#FFFFFF', description: 'Blanco neto con peso 400 (Archivo) para lectura limpia.', category: 'Red Mode' },
  { name: 'Banda legal footer', hex: '#B00020', description: 'Rojo opaco intenso para el fondo de disclaimers y desuscripción.', category: 'Red Mode' }
];

const DON_JULIO_COLORS: ColorDefinition[] = [
  // Stone Mode
  { name: 'Fondo / Lienzo Stone', hex: '#E4E2DB', description: 'Fondo neutro piedra premium de uso obligatorio en CRM y landers en Stone Mode.', category: 'Stone Mode' },
  { name: 'Texto / Horno Black', hex: '#000000', description: 'Negro puro para headlines, textos de párrafo y legibilidad premium.', category: 'Stone Mode' },
  { name: 'Llamados / Talavera Blue', hex: '#0055C8', description: 'Azul pop mexicano para realce de botones y palabras de pasión (CTAs).', category: 'Stone Mode' },
  { name: 'Calidez / Jalisco Orange', hex: '#F47521', description: 'Naranja atardecer para resaltar elements cálidos secundarios.', category: 'Stone Mode' }
];

const JOHNNIE_WALKER_COLORS: ColorDefinition[] = [
  // Blue Mode
  { name: 'Wrapper exterior', hex: '#000040', description: 'Azul marino profundo para encuadre del correo.', category: 'Blue Mode' },
  { name: 'Contenedor principal', hex: '#0033A0', description: 'Azul cobalto de alta gama para el cuerpo central del correo.', category: 'Blue Mode' },
  { name: 'Sello de Lujo (Gold)', hex: '#C5A059', description: 'Dorado líquido para headlines, textos clave, botones y acentos de lujo.', category: 'Blue Mode' },
  { name: 'Texto de párrafos', hex: '#FFFFFF', description: 'Blanco puro de tamaño 14px con peso delgado (Montserrat 300).', category: 'Blue Mode' },
  { name: 'Banda legal footer', hex: '#000020', description: 'Azul oscuro absoluto para avisos legales y desuscripciones.', category: 'Blue Mode' }
];

export function BrandGuide({ brand = 'buchanans' }: BrandGuideProps) {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const colors = brand === 'johnniewalker' ? JOHNNIE_WALKER_COLORS : brand === 'donjulio' ? DON_JULIO_COLORS : (brand === 'smirnoff' ? SMIRNOFF_COLORS : BUCHANANS_COLORS);
  const brandName = brand === 'johnniewalker' ? 'Johnnie Walker Blue' : brand === 'donjulio' ? 'Don Julio' : (brand === 'smirnoff' ? 'Smirnoff' : "Buchanan's");
  const brandSub = brand === 'johnniewalker' ? 'Blue Label Society & Regalo de Lujo con Intención' : brand === 'donjulio' ? 'Stone Mode & Devoción Artesanal' : (brand === 'smirnoff' ? 'Red Mode & Spicy Polémica' : 'Guía de Estilo Oficial & Diageo Marketing Code');

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="bg-neutral-900 border border-neutral-804 rounded-2xl p-6 text-white space-y-8" id="brand-guide">
      {/* Header */}
      <div className="flex items-center space-x-3 border-b border-neutral-800 pb-4">
        <Palette className={`${brand === 'johnniewalker' ? 'text-[#C5A059]' : brand === 'donjulio' ? 'text-blue-500' : brand === 'smirnoff' ? 'text-red-500' : 'text-yellow-400'} w-6 h-6 zoom-in`} />
        <div>
          <h2 className={`text-lg font-bold tracking-tight ${brand === 'johnniewalker' ? 'text-[#C5A059]' : brand === 'donjulio' ? 'text-[#0055C8]' : brand === 'smirnoff' ? 'text-red-500' : 'text-yellow-400'}`}>Identidad de Marca - {brandName}</h2>
          <p className="text-xs text-neutral-400 font-mono">{brandSub}</p>
        </div>
      </div>

      {/* Idea Central */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-neutral-955 p-4 rounded-xl border border-neutral-850">
        <div>
          <h3 className={`text-sm font-semibold uppercase tracking-wider mb-2 ${brand === 'johnniewalker' ? 'text-[#C5A059]' : brand === 'donjulio' ? 'text-blue-400' : brand === 'smirnoff' ? 'text-red-400' : 'text-yellow-450'}`}>Concepto de Diseño</h3>
          {brand === 'johnniewalker' ? (
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                <span className="font-semibold text-white">Idea Central:</span> "Blue Label Society" — El club de la excelencia, la máxima expresión de lujo y el regalo de mayor valor.
              </li>
              <li>
                <span className="font-semibold text-white">Tagline Oficial:</span> <span className="font-mono bg-neutral-900 px-1.5 py-0.5 rounded text-[#C5A059]">UN REGALO CON INTENCIÓN SE NOTA</span>
              </li>
              <li>
                <span className="font-semibold text-white">Esencia:</span> Elegancia contemporánea, sobriedad, carisma excepcional y el arte de regalar con intención y grabado personalizado.
              </li>
              <li>
                <span className="font-semibold text-white">Acción:</span> Art of Gifting 365 (notas escritas a mano, personalización extrema, accesorios de cuero de lujo).
              </li>
            </ul>
          ) : brand === 'donjulio' ? (
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                <span className="font-semibold text-white">Idea Central:</span> "Por Amor" — El tributo definitivo al proceso, la tierra mexicana y la devoción artesanal.
              </li>
              <li>
                <span className="font-semibold text-white">Tagline Oficial:</span> <span className="font-mono bg-neutral-900 px-1.5 py-0.5 rounded text-blue-400">POR AMOR</span>
              </li>
              <li>
                <span className="font-semibold text-white">Esencia:</span> Devoción impecable al agave azul, elegancia atemporal de la piedra mexicana y orgullo ultra-premium de Don Julio.
              </li>
              <li>
                <span className="font-semibold text-white">Aliado FY26:</span> Colectivo de Creadores — Copa Mundial FIFA 26™
              </li>
            </ul>
          ) : brand === 'smirnoff' ? (
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                <span className="font-semibold text-white">Idea Central:</span> "Saca tu lado Spicy" — El picante y sabor vibrante que desafía las convenciones.
              </li>
              <li>
                <span className="font-semibold text-white">Tagline Oficial:</span> <span className="font-mono bg-neutral-900 px-1.5 py-0.5 rounded text-red-400">SACA TU LADO SPICY</span>
              </li>
              <li>
                <span className="font-semibold text-white">Esencia:</span> Polémica amigable, diversión irreverente y el picor latino de Smirnoff Spicy.
              </li>
              <li>
                <span className="font-semibold text-white">Aliada FY26:</span> Camila Pulgarín — Copa Mundial FIFA 26™
              </li>
            </ul>
          ) : (
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
          )}
        </div>
        <div>
          <h3 className={`text-sm font-semibold uppercase tracking-wider mb-2 ${brand === 'johnniewalker' ? 'text-[#C5A059]' : brand === 'donjulio' ? 'text-blue-400' : brand === 'smirnoff' ? 'text-red-400' : 'text-yellow-450'}`}>Plataforma de Campaña</h3>
          {brand === 'johnniewalker' ? (
            <p className="text-sm text-neutral-300 leading-relaxed">
              La plataforma <strong>"Blue Label Society / Art of Gifting 365"</strong> celebra el arte de regalar con significado, intención y personalización suprema. El contenido habla con elegancia contemporánea, sobriedad, y un tono elevado de carácter impecable, acompañando a los miembros del club en celebraciones exclusivas y momentos trascendentes.
            </p>
          ) : brand === 'donjulio' ? (
            <p className="text-sm text-neutral-300 leading-relaxed">
              La plataforma <strong>"Por Amor al Juego / Devoción en la Cancha"</strong> celebra el compromiso supremo, el orgullo y la herencia del agave. La marca habla con elegancia natural, sobriedad de Stone Mode y un tono amigable pero profundamente exclusivo y artesanal en cada hito del mundial.
            </p>
          ) : brand === 'smirnoff' ? (
            <p className="text-sm text-neutral-300 leading-relaxed">
              La plataforma <strong>"La Copa es Nuestra / El Sabor que Enciende el Juego"</strong> enfoca su narrativa en momentos Spicy y debates de fútbol amistosos ("Spicy Polémica"). La voz habla como un amigo irreverente, alegre, que pone el toque picante y divertido a las reuniones para ver los partidos del mundial.
            </p>
          ) : (
            <p className="text-sm text-neutral-300 leading-relaxed">
              Se enfoca en esas conexiones significativas que trascienden lo laboral, el colegio o la universidad, y se convierten en vínculos permanentes (familias elegidas). Por esto, la voz de la marca habla como alguien que ya hace parte de ese hogar: <strong className="text-white">"No vende, invita. No grita, convoca."</strong>
            </p>
          )}
        </div>
      </div>

      {/* Palette Section */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Layers className="text-emerald-400 w-4 h-4" />
          <h3 className="text-sm font-bold text-neutral-200">Paleta de Colores Autorizada ({brand === 'johnniewalker' ? 'Blue Mode' : brand === 'donjulio' ? 'Stone Mode' : brand === 'smirnoff' ? 'Red Mode' : 'Night Mode'})</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {colors.map((color) => (
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
              <button className="text-neutral-500 group-hover:text-yellow-400 transition-colors p-1" type="button">
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
        <div className={brand === 'johnniewalker' ? "p-4 rounded-xl bg-orange-950/10 border border-amber-900/40" : brand === 'donjulio' ? "p-4 rounded-xl bg-blue-950/10 border border-blue-900/30" : brand === 'smirnoff' ? "p-4 rounded-xl bg-red-950/10 border border-red-900/30" : "p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40"}>
          <div className={`flex items-center space-x-2 font-bold text-sm mb-3 ${brand === 'johnniewalker' ? 'text-amber-400' : brand === 'donjulio' ? 'text-blue-400' : brand === 'smirnoff' ? 'text-red-400' : 'text-emerald-400'}`}>
            <Check className="w-4 h-4" />
            <span>VOCABULARIO PERMITIDO (USAR)</span>
          </div>
          <ul className="space-y-1.5 text-xs text-neutral-300 text-left pl-1">
            {(brand === 'johnniewalker' ? VOCABULARY_JOHNNIE : brand === 'donjulio' ? VOCABULARY_DON_JULIO : brand === 'smirnoff' ? VOCABULARY_SMIRNOFF : VOCABULARY_BUCHANANS).map((vocab, i) => (
              <li className="flex items-center space-x-2" key={i}>
                <span className={`w-1.5 h-1.5 rounded-full ${brand === 'johnniewalker' ? 'bg-amber-450' : brand === 'donjulio' ? 'bg-blue-400' : brand === 'smirnoff' ? 'bg-red-400' : 'bg-emerald-400'}`}></span>
                <span>{vocab}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-xl bg-red-955/20 border border-red-900/40">
          <div className="flex items-center space-x-2 text-red-400 font-bold text-sm mb-3">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span>TOTALMENTE ADVERTIDO (EVITAR / NO USAR)</span>
          </div>
          <ul className="space-y-1.5 text-xs text-neutral-300 text-left pl-1">
            <li className="flex items-center space-x-2">
              <span className="text-red-400 font-bold">✗</span>
              <span>Fiesta / Rumba</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-red-400 font-bold">✗</span>
              <span>Tomar / Beber en exceso</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-red-400 font-bold">✗</span>
              <span>Emborracharse / Enloquecer</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-red-400 font-bold">✗</span>
              <span>Incentivos directos al consumo</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-red-400 font-bold">✗</span>
              <span>"Médica", "empiézate un trago"</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-red-400 font-bold">✗</span>
              <span>Glamorizar el exceso de alcohol</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Diageo Code restrictions */}
      <div className="p-4 rounded-xl bg-neutral-955 border-l-4 border-yellow-500 text-xs text-neutral-300 space-y-2">
        <div className="flex items-center space-x-2 text-yellow-500 font-bold">
          <AlertTriangle className="w-4 h-4" />
          <span>RESTRICCIONES DIAGEO MARKETING CODE (MANDATORIO)</span>
        </div>
        <ol className="list-decimal pl-4 space-y-1 text-left">
          <li><strong>NUNCA</strong> mostrar personas consumiendo alcohol en imágenes.</li>
          <li><strong>NUNCA</strong> incentivar directamente el consumo ("toma más", "brinda ahora").</li>
          <li><strong>NUNCA</strong> asociar el alcohol con desinhibición, fiesta o exceso.</li>
          <li><strong>NUNCA</strong> mostrar personas con signos de haber consumido en exceso.</li>
          <li><strong>SIEMPRE</strong> incluir el disclaimer exacto de Diageo en el footer.</li>
          <li><strong>SIEMPRE</strong> incluir la etiqueta "18+" donde aplique por regulación.</li>
          <li>El foco debe ser en la reunión, el momento, el sabor vibrante {brand === 'johnniewalker' ? 'de un regalo con intención para la comunidad' : brand === 'donjulio' ? 'por amor al agave' : brand === 'smirnoff' ? 'Spicy' : 'en familia elegida'} — no en el trago.</li>
        </ol>
      </div>

    </div>
  );
}

const VOCABULARY_BUCHANANS = [
  "Familia elegida / La familia",
  "El círculo / Estamos juntos",
  "Compartir / Reunirse",
  "Celebrar / El momento",
  "Cooling Break / Buchanita",
  "Estamos en familia"
];

const VOCABULARY_SMIRNOFF = [
  "Lado Spicy / Saca tu lado Spicy",
  "Spicy Polémica / El debate",
  "La copa es nuestra / Sabor vibrante",
  "Fanzone / Hero Outlets",
  "Refresca el juego / Mix toronja/soda",
  "Enciende la copa"
];

const VOCABULARY_DON_JULIO = [
  "Por Amor / Amor de la tierra",
  "Devoción / Devoción al proceso",
  "Artesanal / Hecho a mano",
  "El Legado / Don Julio González",
  "Tierra y alma / Jalisco",
  "Tequila Blanco / Ultra-Premium"
];

const VOCABULARY_JOHNNIE = [
  "Blue Label Society / Comunidad Excelencia",
  "Regalo con Intención / Se Nota",
  "Art of Gifting 365 / Arte de Regalar",
  "Elixir de Carácter / Excepcional",
  "Grabado personalizado / Notas escritas a mano",
  "Ritual Perfect Serve / Un vaso de agua helada al lado"
];
