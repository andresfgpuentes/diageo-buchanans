/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  EmailVariables, 
} from './types';
import { DEFAULT_EMAIL_VARIABLES } from './utils/htmlGenerator';
import { CALENDAR_PRESETS, CalendarPreset } from './utils/calendarPresets';
import { getMarketingOptions } from './utils/marketingOptions';
import { BrandGuide } from './components/BrandGuide';
import { EmailForm } from './components/EmailForm';
import { EmailPreview } from './components/EmailPreview';
import { 
  Crown, 
  Calendar, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  ListTodo, 
  BookOpen, 
  MessageSquareCode, 
  Grid, 
  Info,
  Layers,
  ChevronRight,
  ChevronLeft,
  Globe,
  Save,
  RotateCcw,
  Mail,
  PlusCircle,
  X,
  Check
} from 'lucide-react';

interface JourneyDetail {
  title: string;
  audience: string;
  metric: string;
  description: string;
}

const JOURNEYS_SPEC: JourneyDetail[] = [
  {
    title: "Journey 1: Bienvenida",
    audience: "Nuevos registrados en CloudPages (Trade on/off)",
    metric: "1er Impacto de Campaña",
    description: "Confirmación de registro + expectativa del Mundial FIFA 26 + perfilamiento de preferencias individuales: ¿Cómo vivirás los partidos? (En Casa vs Bares)."
  },
  {
    title: "Journey 2: Cooling Break",
    audience: "Todos los usuarios de la base",
    metric: "Frecuencia: 6 Impactos",
    description: "Eje temático: 'Se pausa el partido, se enciende el sabor'. Activado en los minutos clave de televisión (~min 22 y ~min 67)."
  },
  {
    title: "Journey 3: Ruta Buchanita",
    audience: "Bogotá, Barranquilla, Cartagena, Medellín, Cali",
    metric: "Activaciones por Geo",
    description: "Tráfico calificado hacia CloudPage con listado geolocalizado de Hero Outlets para adquirir cócteles Buchanitas."
  },
  {
    title: "Journey 4: Enrichment / Fan Fest",
    audience: "Usuarios en Bogotá y Barranquilla",
    metric: "Sorteo Entradas y Botellas",
    description: "Formularios interactivos para capturar ocasiones de consumo preferidas e incentivar asistencia al festival oficial de hinchas de Buchanan's."
  },
  {
    title: "Journey 5: Email de Cierre",
    audience: "Todos los suscriptores",
    metric: "Cierre Emocional",
    description: "Despedida del mundial bajo la premisa de 'El mundial termina, el sabor sigue'. Incorpora recetas Perfect Serve para ocasiones post-torneo."
  }
];

export default function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Clean, robust client-side storage persistence targeting the Netlify environment requirements
  const [presets, setPresets] = useState<CalendarPreset[]>(() => {
    try {
      const saved = localStorage.getItem('buchanans_presets');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Automatic migration to the new red seal logo if using the old placeholder logo
        const migrated = parsed.map((p: any) => {
          if (p.editorVariables && p.editorVariables.logoUrl === "https://lh3.googleusercontent.com/sitesv/AA5AbUDAMWKl4CQDj3m1YdX1HotdzforjPuQW28TyPrLlQaVBk7WiLdvcFlghgpmSnpFlNJDWWvFM7a8aPBi1hFbgLjcYISEBuw8Cx2HGnFKD0aI64cETjxyEpZm1_S5ooXQmnNPpBh_5KVoma96Lbk_pEquomgWEhSLm9xoJ_63phSXbJKDijJzsukz1PNZ3Dt1pdx63PuvrXdO8mmRWE87MMinJ6wDk040uD14DLZ0vWg=w1280") {
            return {
              ...p,
              editorVariables: {
                ...p.editorVariables,
                logoUrl: "https://lh3.googleusercontent.com/d/1ZtNqBvS6qL-g9-7Lz1eZ_T0J3_TjW69i=w360"
              }
            };
          }
          return p;
        });
        return migrated;
      }
    } catch (e) {
      console.error("Error reading presets from localStorage", e);
    }
    return CALENDAR_PRESETS;
  });

  const [variables, setVariables] = useState<EmailVariables>(() => {
    try {
      const saved = localStorage.getItem('buchanans_variables');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Automatic migration of variables to the new red seal logo
        if (parsed.logoUrl === "https://lh3.googleusercontent.com/sitesv/AA5AbUDAMWKl4CQDj3m1YdX1HotdzforjPuQW28TyPrLlQaVBk7WiLdvcFlghgpmSnpFlNJDWWvFM7a8aPBi1hFbgLjcYISEBuw8Cx2HGnFKD0aI64cETjxyEpZm1_S5ooXQmnNPpBh_5KVoma96Lbk_pEquomgWEhSLm9xoJ_63phSXbJKDijJzsukz1PNZ3Dt1pdx63PuvrXdO8mmRWE87MMinJ6wDk040uD14DLZ0vWg=w1280") {
          parsed.logoUrl = "https://lh3.googleusercontent.com/d/1ZtNqBvS6qL-g9-7Lz1eZ_T0J3_TjW69i=w360";
        }
        return parsed;
      }
    } catch (e) {
      console.error("Error reading variables from localStorage", e);
    }
    return DEFAULT_EMAIL_VARIABLES;
  });

  const [leftTab, setLeftTab] = useState<'edit' | 'brand'>(() => {
    try {
      const saved = localStorage.getItem('buchanans_leftTab');
      if (saved === 'edit' || saved === 'brand') {
        return saved;
      }
    } catch (e) {}
    return 'edit';
  });

  const [contentType, setContentType] = useState<'email' | 'landing'>(() => {
    try {
      const saved = localStorage.getItem('buchanans_contentType');
      if (saved === 'email' || saved === 'landing') {
        return saved;
      }
    } catch (e) {}
    return 'email';
  });

  const [selectedJourney, setSelectedJourney] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('buchanans_selectedJourney');
      if (saved !== null) {
        return Number(saved);
      }
    } catch (e) {}
    return 0;
  });

  const [selectedCalIndex, setSelectedCalIndex] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('buchanans_selectedCalIndex');
      if (saved !== null) {
        return Number(saved);
      }
    } catch (e) {}
    return 0;
  });

  const [headerSliderIdx, setHeaderSliderIdx] = useState<number>(0);
  const [copySliderIdx, setCopySliderIdx] = useState<number>(0);
  const [ctaSliderIdx, setCtaSliderIdx] = useState<number>(0);
  const [loadSuccess, setLoadSuccess] = useState<string | null>(null);

  const [customMarketingOptions, setCustomMarketingOptions] = useState<any>(null);
  const [isGeneratingHeader, setIsGeneratingHeader] = useState(false);
  const [isGeneratingCopy, setIsGeneratingCopy] = useState(false);
  const [isGeneratingCta, setIsGeneratingCta] = useState(false);

  const [showAddPresetModal, setShowAddPresetModal] = useState<boolean>(false);
  const [newPresetForm, setNewPresetForm] = useState({
    eventName: '',
    date: '',
    day: 'Sábado',
    type: 'Engagement',
    subject: '',
    channel: 'Salesforce Journey Builder / Email Studio',
    audience: 'Hinchas de Buchanan\'s de la base activa',
    objective: 'Promocionar ocasiones de consumo y combos con Rappi.',
    suggestedCopy: 'Disfruta cada partido de la copa con el sabor inigualable de Buchanan\'s. Combínalo con agua con gas y limón para una frescura insuperable.',
  });

  const handleAddCustomPreset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPresetForm.eventName || !newPresetForm.date || !newPresetForm.subject) {
      alert("Por favor complete los campos obligatorios: Nombre, Fecha y Asunto.");
      return;
    }

    const eventId = `custom-cal-${Date.now()}`;
    const editorVariables: EmailVariables = JSON.parse(JSON.stringify(variables));

    const preparedPreset: CalendarPreset = {
      eventId,
      eventName: newPresetForm.eventName,
      date: newPresetForm.date,
      day: newPresetForm.day,
      type: newPresetForm.type,
      subject: newPresetForm.subject,
      channel: newPresetForm.channel,
      audience: newPresetForm.audience,
      objective: newPresetForm.objective,
      suggestedCopy: newPresetForm.suggestedCopy,
      editorVariables: {
        ...editorVariables,
        subject: newPresetForm.subject,
        welcomeHeadline: newPresetForm.eventName.toUpperCase(),
        paragraph1: newPresetForm.suggestedCopy,
        paragraph2: "DIAGEO te invita a disfrutar con responsabilidad. El exceso de alcohol es perjudicial para la salud. Prohíbase el expendio de bebidas embriagantes a menores de edad.",
      }
    };

    const updated = [...presets, preparedPreset];
    setPresets(updated);
    setSelectedCalIndex(updated.length - 1);
    setShowAddPresetModal(false);

    // Reset form
    setNewPresetForm({
      eventName: '',
      date: '',
      day: 'Sábado',
      type: 'Engagement',
      subject: '',
      channel: 'Salesforce Journey Builder / Email Studio',
      audience: 'Hinchas de Buchanan\'s de la base activa',
      objective: 'Promocionar ocasiones de consumo y combos con Rappi.',
      suggestedCopy: 'Disfruta cada partido de la copa con el sabor inigualable de Buchanan\'s. Combínalo con agua con gas y limón para una frescura insuperable.',
    });

    setLoadSuccess(`¡Hito personalizado "${newPresetForm.eventName}" agregado y seleccionado con éxito! 📅`);
    setTimeout(() => setLoadSuccess(null), 4500);
  };

  // Sync state to localStorage to prevent data loss on refresh
  React.useEffect(() => {
    try {
      localStorage.setItem('buchanans_presets', JSON.stringify(presets));
    } catch (e) {
      console.error(e);
    }
  }, [JSON.stringify(presets)]);

  React.useEffect(() => {
    try {
      localStorage.setItem('buchanans_variables', JSON.stringify(variables));
    } catch (e) {
      console.error(e);
    }
  }, [JSON.stringify(variables)]);

  React.useEffect(() => {
    try {
      localStorage.setItem('buchanans_leftTab', leftTab);
    } catch (e) {}
  }, [leftTab]);

  React.useEffect(() => {
    try {
      localStorage.setItem('buchanans_contentType', contentType);
    } catch (e) {}
  }, [contentType]);

  React.useEffect(() => {
    try {
      localStorage.setItem('buchanans_selectedJourney', String(selectedJourney));
    } catch (e) {}
  }, [selectedJourney]);

  React.useEffect(() => {
    try {
      localStorage.setItem('buchanans_selectedCalIndex', String(selectedCalIndex));
    } catch (e) {}
  }, [selectedCalIndex]);

  // Reset custom Gemini generated options when campaign context changes
  React.useEffect(() => {
    setCustomMarketingOptions(null);
  }, [selectedCalIndex, contentType]);

  const handleSelectCalPreset = (idx: number) => {
    setSelectedCalIndex(idx);
    setHeaderSliderIdx(0);
    setCopySliderIdx(0);
    setCtaSliderIdx(0);
  };

  const defaultMarketingOptions = getMarketingOptions(
    presets[selectedCalIndex]?.eventName || '',
    presets[selectedCalIndex]?.date || '',
    contentType
  );

  const activeMarketingOptions = customMarketingOptions || defaultMarketingOptions;

  // Fetch new text suggestions from backend server-side Gemini 3.5 Flash proxy safely
  const handleGenerateNewOptions = async (type: 'header' | 'copy' | 'cta') => {
    const campaignName = presets[selectedCalIndex]?.eventName || 'Campaña Integral de Sabor';
    const campaignDescription = presets[selectedCalIndex]?.objective || '';

    if (type === 'header') setIsGeneratingHeader(true);
    else if (type === 'copy') setIsGeneratingCopy(true);
    else if (type === 'cta') setIsGeneratingCta(true);

    try {
      const response = await fetch('/api/generate-options', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type,
          campaignName,
          campaignDescription
        })
      });

      if (!response.ok) {
        throw new Error('El servicio de OpenAI/Gemini ha retornado un estado inválido.');
      }

      const data = await response.json();
      if (data && data.options) {
        setCustomMarketingOptions((prev: any) => {
          const base = prev ? { ...prev } : { ...defaultMarketingOptions };
          if (type === 'header') {
            base.headerOptions = data.options;
          } else if (type === 'cta') {
            base.ctaOptions = data.options;
          } else if (type === 'copy') {
            base.copyOptions = data.options;
          }
          return base;
        });

        setLoadSuccess(`¡Nuevas sugerencias de ${type === 'header' ? 'Cabezote' : type === 'copy' ? 'Copys' : 'CTA'} generadas con éxito con Gemini! ✨`);
        setTimeout(() => setLoadSuccess(null), 4000);
      }
    } catch (err: any) {
      console.error(err);
      setLoadSuccess("La generación con Gemini falló. Por favor comprueba tu conexión o API Key.");
      setTimeout(() => setLoadSuccess(null), 4000);
    } finally {
      if (type === 'header') setIsGeneratingHeader(false);
      else if (type === 'copy') setIsGeneratingCopy(false);
      else if (type === 'cta') setIsGeneratingCta(false);
    }
  };

  const handleApplyHeaderToEditor = () => {
    const selectedHeader = activeMarketingOptions.headerOptions[headerSliderIdx];
    if (selectedHeader) {
      setVariables(prev => {
        // Deep update structural headline block for real-time visual update
        const updatedBlocks = (prev.blocks || []).map(block => {
          if (block.type === 'text' && block.textStyle === 'headline') {
            return { ...block, text: selectedHeader };
          }
          if (block.type === 'columns' && block.columns) {
            const updatedCols = block.columns.map(col => {
              const updatedItems = (col.items || []).map(item => {
                if (item.type === 'text' && item.textStyle === 'headline') {
                  return { ...item, text: selectedHeader };
                }
                return item;
              });
              return { ...col, items: updatedItems };
            });
            return { ...block, columns: updatedCols };
          }
          return block;
        });

        return {
          ...prev,
          welcomeHeadline: selectedHeader,
          blocks: updatedBlocks
        };
      });
      setLoadSuccess(`¡Cabezote "${selectedHeader}" aplicado con éxito al constructor! ✍️`);
      setTimeout(() => setLoadSuccess(null), 4000);
    }
  };

  const handleApplyCopiesToEditor = () => {
    const selectedCopyObj = activeMarketingOptions.copyOptions[copySliderIdx];
    if (selectedCopyObj) {
      setVariables(prev => {
        let textParagraphCount = 0;
        const updatedBlocks = (prev.blocks || []).map(block => {
          if (block.type === 'text' && block.textStyle === 'paragraph') {
            textParagraphCount++;
            if (textParagraphCount === 1) {
              return { ...block, text: selectedCopyObj.long };
            } else if (textParagraphCount === 2) {
              return { ...block, text: selectedCopyObj.short };
            }
          }
          if (block.type === 'columns' && block.columns) {
            const updatedCols = block.columns.map(col => {
              const updatedItems = (col.items || []).map(item => {
                if (item.type === 'text' && item.textStyle === 'paragraph') {
                  textParagraphCount++;
                  if (textParagraphCount === 1) {
                    return { ...item, text: selectedCopyObj.long };
                  } else if (textParagraphCount === 2) {
                    return { ...item, text: selectedCopyObj.short };
                  }
                }
                return item;
              });
              return { ...col, items: updatedItems };
            });
            return { ...block, columns: updatedCols };
          }
          return block;
        });

        return {
          ...prev,
          paragraph1: selectedCopyObj.long,
          paragraph2: selectedCopyObj.short,
          blocks: updatedBlocks
        };
      });
      setLoadSuccess(`¡Borradores de Copys aplicados con éxito al constructor! ✍️`);
      setTimeout(() => setLoadSuccess(null), 4000);
    }
  };

  const handleApplyCtaToEditor = () => {
    const selectedCta = activeMarketingOptions.ctaOptions[ctaSliderIdx];
    if (selectedCta) {
      setVariables(prev => {
        const updatedBlocks = (prev.blocks || []).map(block => {
          if (block.type === 'button-group' && block.buttons && block.buttons.length > 0) {
            const updatedButtons = block.buttons.map((btn, bIdx) => {
              if (bIdx === 0) {
                return { ...btn, text: selectedCta };
              }
              return btn;
            });
            return { ...block, buttons: updatedButtons };
          }
          if (block.type === 'columns' && block.columns) {
            const updatedCols = block.columns.map(col => {
              const updatedItems = (col.items || []).map(item => {
                if (item.type === 'button-group' && item.buttons && item.buttons.length > 0) {
                  const updatedButtons = item.buttons.map((btn, bIdx) => {
                    if (bIdx === 0) return { ...btn, text: selectedCta };
                    return btn;
                  });
                  return { ...item, buttons: updatedButtons };
                }
                return item;
              });
              return { ...col, items: updatedItems };
            });
            return { ...block, columns: updatedCols };
          }
          return block;
        });

        return {
          ...prev,
          buttonCasaText: selectedCta,
          blocks: updatedBlocks
        };
      });
      setLoadSuccess(`¡CTA del botón principal aplicado con éxito al constructor! ✍️`);
      setTimeout(() => setLoadSuccess(null), 4000);
    }
  };

  const handleApplyPreset = (idx: number) => {
    const preset = presets[idx];
    if (preset) {
      setVariables(preset.editorVariables);
      setLoadSuccess(`¡Plantilla "${preset.eventName}" cargada con éxito en el constructor!`);
      setTimeout(() => setLoadSuccess(null), 4000);
      
      // Auto-switch to edit view so that changes are visible instantly
      setLeftTab('edit');
      
      // Target root or editor block for smooth UX
      const el = document.getElementById('email-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleSaveToPreset = () => {
    const updatedPresets = [...presets];
    const currentPreset = { ...updatedPresets[selectedCalIndex] };
    if (currentPreset) {
      currentPreset.editorVariables = { ...variables };
      currentPreset.subject = variables.subject;
      currentPreset.suggestedCopy = (variables.paragraph1 || '') + " " + (variables.paragraph2 || '');
      updatedPresets[selectedCalIndex] = currentPreset;
      setPresets(updatedPresets);
      setLoadSuccess(`¡Se actualizó el hito "${currentPreset.eventName}" con los comentarios de tu cliente! ✅`);
      setTimeout(() => setLoadSuccess(null), 4500);
    }
  };

  const handleResetPreset = () => {
    const originalPreset = CALENDAR_PRESETS[selectedCalIndex];
    if (originalPreset) {
      const updatedPresets = [...presets];
      updatedPresets[selectedCalIndex] = {
        ...originalPreset,
        editorVariables: { ...originalPreset.editorVariables }
      };
      setPresets(updatedPresets);
      setVariables(originalPreset.editorVariables);
      setLoadSuccess(`¡Hito "${originalPreset.eventName}" restaurado a las configuraciones originales de Diageo! 🔄`);
      setTimeout(() => setLoadSuccess(null), 4500);
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-neutral-100 flex flex-col font-sans selection:bg-yellow-400 selection:text-black">
      
      {/* Upper Navigation / Decorative top border */}
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-700 via-emerald-500 to-yellow-400"></div>

      {/* Main App Bar Header */}
      <header className="bg-neutral-950 border-b border-neutral-900 py-4 px-6 sticky top-0 z-50 shadow-lg" id="app-header">
        <div className="w-full max-w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & SLogan */}
          <div className="flex items-center space-x-3.5">
            <div className="bg-[#015D2F] p-2.5 rounded-xl border border-emerald-600/30 shadow-md">
              <Crown className="w-6 h-6 text-[#fffd48] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-black text-white tracking-tight uppercase">
                  BUCHANAN'S
                </h1>
                <span className="text-[10px] bg-[#015D2F] text-[#fffd48] px-2 py-0.5 rounded-full font-bold">
                  Artifact Maestro
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-mono">
                Salesforce Marketing Cloud Email Workspace • FY26
              </p>
            </div>
          </div>

          {/* User profile / Agency context */}
          <div className="flex items-center space-x-4">
            <div className="text-right hidden md:block">
              <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-widest block font-bold">
                Agencia Asociada
              </span>
              <span className="text-xs font-semibold text-neutral-300">
                Sí Señor Agencia
              </span>
            </div>
            <div className="h-8 w-px bg-neutral-800 hidden md:block"></div>
            <div className="bg-neutral-900 px-4 py-2 rounded-xl border border-neutral-800 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span>
              <span className="text-xs font-bold text-neutral-200">
                Andrés González
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* Hero Welcome Area */}
      <section className="bg-neutral-950 py-8 px-6 border-b border-neutral-900" id="welcome-banner">
        <div className="w-full max-w-full grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center space-x-1.5 text-yellow-400 text-xs font-mono tracking-widest uppercase bg-[#015D2F]/20 px-2.5 py-1 rounded-full border border-[#015D2F]/40 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                <span>Campaña Integral • Copa Mundial FIFA 2026™</span>
              </span>
              {presets[selectedCalIndex] && (
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-mono uppercase font-bold tracking-wider ${
                  presets[selectedCalIndex].type === 'Matchday' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/40' :
                  presets[selectedCalIndex].type === 'A/B Test' ? 'bg-yellow-950 text-[#fffd48] border border-yellow-950/40' :
                  presets[selectedCalIndex].type === 'Engagement' ? 'bg-pink-950 text-pink-400 border border-pink-900/40' :
                  presets[selectedCalIndex].type === 'Ruta' ? 'bg-orange-950 text-orange-400 border border-orange-900/40' :
                  'bg-neutral-800 text-neutral-300'
                }`}>
                  {presets[selectedCalIndex].type}
                </span>
              )}
            </div>
            <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight leading-none uppercase">
              {presets[selectedCalIndex] ? presets[selectedCalIndex].eventName : "Workspace de Campaña Integral"}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
              Diseña, simula y adapta plantillas interactivas para cada hito de tu campaña de <strong className="text-white">Buchanan's</strong>. Sintoniza el cabezote ideal con el deslizador de tres opciones, calibra la longitud de tus borradores de copy (largo y corto) y optimiza los llamados a la acción (CTAs) para cada momento de la copa.
            </p>
          </div>
          <div className="bg-[#015D2F]/10 border border-[#015D2F]/30 p-4 rounded-xl flex items-start space-x-3 text-xs text-neutral-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#ca8a04]/10 rounded-full blur-xl"></div>
            <Info className="w-5 h-5 text-[#fffd48] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-white block uppercase text-[10px] tracking-wide">Workspace Multihito SFMC</span>
              <p className="text-neutral-300">
                La marca invita a reunirse responsablemente. Utiliza el Calendario al pie para cambiar de hito de campaña y personalizar las piezas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Selector de Constructor Principal (Mails vs Landings) */}
      <section className="bg-neutral-900 border-b border-neutral-800 py-3.5 px-6" id="builder-selector">
        <div className="w-full max-w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs text-neutral-400">
            <span className="font-bold text-neutral-300 block uppercase tracking-wider text-[10px]">HERRAMIENTA ACTIVA:</span>
            <span>Estás creando {contentType === 'email' ? 'un Email corporativo para CRM' : 'una Landing Page interactiva para CloudPages'}</span>
          </div>
          
          <div className="flex items-center space-x-3 bg-neutral-950 p-1.5 rounded-2xl border border-neutral-800 shadow-inner">
            <button
              onClick={() => setContentType('email')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                contentType === 'email'
                  ? 'bg-[#015D2F] text-[#fffd48] border border-emerald-600/30'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Constructor de Mails</span>
            </button>
            
            <button
              onClick={() => setContentType('landing')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                contentType === 'landing'
                  ? 'bg-[#015D2F] text-[#fffd48] border border-[#015D2F]/30'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Constructor de Landings</span>
            </button>
          </div>
        </div>
      </section>

      {/* Workstation layout container */}
      <main className="flex-1 w-full max-w-full p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 my-4">
        
        {/* Left Side: Forms, Options and Style Guidelines block */}
        <div className="space-y-6">
          
          {/* Section tab switch */}
          <div className="flex space-x-2 border-b border-neutral-800 pb-2">
            <button
              onClick={() => setLeftTab('edit')}
              className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                leftTab === 'edit'
                  ? 'bg-[#015D2F] text-[#fffd48] shadow-md border border-emerald-600/30'
                  : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Personalizar Contenido</span>
            </button>
            <button
              onClick={() => setLeftTab('brand')}
              className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                leftTab === 'brand'
                  ? 'bg-[#015D2F] text-[#fffd48] shadow-md border border-emerald-600/30'
                  : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Branding & Tono Colombia</span>
            </button>
          </div>

          <div className="transition-all duration-250">
            {leftTab === 'edit' ? (
              <EmailForm 
                variables={variables}
                onChange={setVariables}
                contentType={contentType}
              />
            ) : (
              <BrandGuide />
            )}
          </div>

        </div>

        {/* Right Side: Preview & Checklist */}
        <div className="space-y-6">
          
          {/* Responsive Sandbox Preview / Raw Code togglers */}
          <div className="lg:sticky lg:top-24 space-y-6">
            
            {/* The live iframe sandbox with tab controllers */}
            <EmailPreview 
              variables={variables}
              contentType={contentType}
            />

          </div>

        </div>

      </main>

      {/* Activation Timeline road (Sección 3: Calendario de activaciones) */}
      <section className="bg-neutral-955 border-b border-neutral-904 p-6 lg:p-8 mt-12 relative" id="activation-calendar">
        <div className="w-full max-w-full space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5">
              <Calendar className="text-yellow-400 w-6 h-6 shrink-0" />
              <div>
                <h3 className="text-base font-bold text-white uppercase tracking-tight flex items-center gap-2">
                  <span>Calendario de Activaciones — Connection Plan</span>
                  <span className="text-[9px] bg-yellow-400 text-black px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                    Interactiva
                  </span>
                </h3>
                <p className="text-xs text-neutral-400 font-mono">
                  Haz clic en cualquier hito para inspeccionar la estructura sugerida, canales en Salesforce y comunicación de marca.
                </p>
              </div>
            </div>

            {/* Notification Toast for load status */}
            {loadSuccess && (
              <div className="bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-xl text-xs font-bold animate-pulse flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{loadSuccess}</span>
              </div>
            )}
          </div>

          {/* Horizontally scrolling calendar metrics with precise navigation arrows */}
          <div className="relative flex items-center">
            {/* Left extreme navigation arrow */}
            <button
              type="button"
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollBy({ left: -240, behavior: 'smooth' });
                }
              }}
              className="absolute left-[-18px] z-15 bg-neutral-900/95 text-neutral-400 hover:text-yellow-400 border border-neutral-850 hover:border-yellow-400/40 hover:bg-[#015D2F]/20 p-2.5 rounded-full cursor-pointer transition-all duration-200 shadow-xl flex items-center justify-center pointer-events-auto"
              title="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Horizontally scrollable presets wrapper */}
            <div 
              ref={scrollContainerRef}
              className="flex space-x-4 overflow-x-auto pb-4 scrollbar-thin select-none scroll-smooth w-full px-4"
            >
              {presets.map((cal, idx) => {
                const isSelected = selectedCalIndex === idx;
                return (
                  <div 
                    key={cal.eventId}
                    onClick={() => handleSelectCalPreset(idx)}
                    className={`shrink-0 w-48 p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between relative ${
                      isSelected 
                        ? 'bg-[#015D2F]/20 border-yellow-400 shadow-[0_0_15px_rgba(255,253,72,0.15)] scale-[1.02] ring-1 ring-yellow-400/40 text-white' 
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-black block ${isSelected ? 'text-yellow-400' : 'text-white'}`}>
                          {cal.date}
                        </span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded leading-none uppercase font-bold ${
                          cal.type === 'Matchday' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/40' :
                          cal.type === 'A/B Test' ? 'bg-yellow-950 text-[#fffd48] border border-yellow-905-40' :
                          cal.type === 'Engagement' ? 'bg-pink-950 text-pink-400 border border-pink-900/40' :
                          cal.type === 'Ruta' ? 'bg-orange-950 text-orange-400 border border-orange-900/40' :
                          'bg-neutral-800 text-neutral-300'
                        }`}>
                          {cal.type}
                        </span>
                      </div>
                      <span className="text-[10px] text-neutral-500 block font-mono">{cal.day}</span>
                      <p className={`text-[11.5px] font-bold mt-2 line-clamp-1 ${isSelected ? 'text-white' : 'text-neutral-200'}`}>
                        {cal.eventName}
                      </p>
                    </div>

                    {/* Indicators */}
                    <div className="mt-3 pt-2 border-t border-neutral-800 flex items-center justify-between text-[9px] font-bold uppercase tracking-wider">
                      <span className={isSelected ? 'text-yellow-400' : 'text-neutral-500'}>
                        {isSelected ? 'Seleccionado' : 'Ver Estructura'}
                      </span>
                      <ChevronRight className={`w-3 h-3 transition-transform ${isSelected ? 'rotate-90 text-yellow-400' : 'text-neutral-500'}`} />
                    </div>
                  </div>
                );
              })}

              {/* Creator button card inside the scrollable view */}
              <div 
                onClick={() => setShowAddPresetModal(true)}
                className="shrink-0 w-48 p-4 bg-neutral-900/40 hover:bg-neutral-900/80 border border-dashed border-neutral-800 hover:border-yellow-400 text-neutral-400 hover:text-white rounded-xl transition-all duration-200 cursor-pointer flex flex-col justify-center items-center text-center space-y-2 group select-none shadow-md"
              >
                <PlusCircle className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-xs font-black uppercase tracking-wider block">Añadir Correo</span>
                <span className="text-[9px] text-neutral-500 font-mono block">Solicitado por Cliente</span>
              </div>
            </div>

            {/* Right extreme navigation arrow */}
            <button
              type="button"
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollBy({ left: 240, behavior: 'smooth' });
                }
              }}
              className="absolute right-[-18px] z-15 bg-neutral-900/95 text-neutral-400 hover:text-yellow-400 border border-neutral-850 hover:border-yellow-400/40 hover:bg-[#015D2F]/20 p-2.5 rounded-full cursor-pointer transition-all duration-200 shadow-xl flex items-center justify-center pointer-events-auto"
              title="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive Suggested Structure & Communication Blueprint Section */}
          {presets[selectedCalIndex] && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6 transition-all duration-300 animate-fadeIn">
              
              {/* Card Title & Top-level action */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-black text-yellow-400 font-mono tracking-widest uppercase">
                      Plan de Conexión • {presets[selectedCalIndex].date} ({presets[selectedCalIndex].day})
                    </span>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      presets[selectedCalIndex].type === 'Matchday' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/40' :
                      presets[selectedCalIndex].type === 'A/B Test' ? 'bg-yellow-950 text-[#fffd48] border border-yellow-905-40' :
                      presets[selectedCalIndex].type === 'Engagement' ? 'bg-pink-950 text-pink-400 border border-pink-900/40' :
                      presets[selectedCalIndex].type === 'Ruta' ? 'bg-orange-950 text-orange-400 border border-orange-900/40' :
                      'bg-neutral-800 text-neutral-300'
                    }`}>
                      {presets[selectedCalIndex].type}
                    </span>
                  </div>
                  <h4 className="text-base md:text-lg font-black text-white uppercase tracking-tight">
                    {presets[selectedCalIndex].eventName}
                  </h4>
                </div>

                {/* Combined Actions: Save client feedback, Reset default and Apply */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {/* Reset to brand original configuration */}
                  <button
                    type="button"
                    onClick={handleResetPreset}
                    title="Restaurar plantilla original de marca Diageo"
                    className="bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white px-3.5 py-3 rounded-xl transition-all flex items-center justify-center cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  {/* Save feedback to state */}
                  <button
                    type="button"
                    onClick={handleSaveToPreset}
                    className="bg-amber-950/20 hover:bg-amber-950/40 text-[#fffd48] border border-amber-500/20 px-4 py-3 rounded-xl transition-all focus:outline-none flex items-center space-x-2 cursor-pointer uppercase text-[10px] sm:text-xs font-bold tracking-wider"
                  >
                    <Save className="w-4 h-4 text-yellow-400" />
                    <span>Guardar Cambios Cliente</span>
                  </button>

                  {/* Instant Application to Workspace Action */}
                  <button
                    type="button"
                    onClick={() => handleApplyPreset(selectedCalIndex)}
                    className="bg-[#015D2F] hover:bg-[#015D2F]/80 text-[#fffd48] text-xs font-black px-4 py-3 rounded-xl border border-emerald-600/43 shadow-lg hover:shadow-[#015D2F]/20 transition-all flex items-center space-x-2 cursor-pointer uppercase tracking-wider"
                  >
                    <Sparkles className="w-4 h-4 text-[#fffd48]" />
                    <span>Cargar en el Constructor</span>
                  </button>
                </div>
              </div>

              {/* Grid content detailing everything */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Communication Strategy (Left & Middle Column) - Now the Copywriter Desk */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Header Suggestion Selector */}
                  <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-850 space-y-4">
                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-yellow-400 font-mono uppercase tracking-wider block font-bold">Estrategia Informativa • Recurso 1</span>
                        <h5 className="text-sm font-black text-white uppercase tracking-tight">Sugerencia de Header de Entrada</h5>
                      </div>
                      
                      {/* Action buttons to regenerate options and apply changes directly */}
                      <div className="flex flex-wrap items-center gap-2 self-start xl:self-auto">
                        <button
                          type="button"
                          onClick={() => handleGenerateNewOptions('header')}
                          disabled={isGeneratingHeader}
                          className="bg-neutral-900 hover:bg-neutral-850 text-neutral-300 disabled:text-neutral-500 border border-neutral-800 disabled:border-neutral-900 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer disabled:cursor-not-allowed select-none"
                        >
                          {isGeneratingHeader ? (
                            <>
                              <span className="w-3 h-3 border-2 border-dashed border-neutral-400 border-t-yellow-400 rounded-full animate-spin"></span>
                              <span>Generando...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                              <span>Nuevas Opciones con IA</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={handleApplyHeaderToEditor}
                          className="bg-[#015D2F]/25 hover:bg-[#015D2F]/45 text-[#fffd48] border border-emerald-500/30 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer select-none"
                        >
                          <Check className="w-3.5 h-3.5 text-yellow-400" />
                          <span>Aplicar al Constructor</span>
                        </button>
                      </div>
                    </div>

                    {/* Active Header content display */}
                    <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 relative group overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400"></div>
                      <p className="text-xs sm:text-sm font-black text-white leading-snug">
                        "{activeMarketingOptions.headerOptions[headerSliderIdx]}"
                      </p>
                    </div>

                    {/* Slider section */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[9px] text-neutral-500 font-mono uppercase">
                        <span>Llamativo / Directo</span>
                        <span className="text-yellow-400 font-semibold">Alternativa {headerSliderIdx + 1} de 3</span>
                        <span>Cercano / Social</span>
                      </div>
                      <div className="relative flex items-center">
                        <input
                          type="range"
                          min="0"
                          max="2"
                          value={headerSliderIdx}
                          onChange={(e) => setHeaderSliderIdx(Number(e.target.value))}
                          className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-yellow-400 focus:outline-none"
                        />
                      </div>
                      
                      {/* Segmented quick indicators */}
                      <div className="grid grid-cols-3 gap-2">
                        {["Opción 1: Directo", "Opción 2: Reencuentro", "Opción 3: Inspiracional"].map((lbl, sIdx) => {
                          const isActive = headerSliderIdx === sIdx;
                          return (
                            <button
                              key={sIdx}
                              type="button"
                              onClick={() => setHeaderSliderIdx(sIdx)}
                              className={`py-1 px-1 rounded-md text-[9px] font-bold text-center transition-all truncate cursor-pointer uppercase ${
                                isActive 
                                  ? 'bg-yellow-400 text-black font-black' 
                                  : 'bg-[#0e0e0e] border border-neutral-850 text-neutral-400 hover:text-white'
                              }`}
                            >
                              {lbl}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Dual Copy Draft Box (Long and Short) */}
                  <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-850 space-y-4">
                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] text-yellow-400 font-mono uppercase tracking-wider block font-bold">Estrategia de Contenido • Recurso 2</span>
                          <span className="text-[8px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-mono uppercase font-bold leading-none">
                            {activeMarketingOptions.copyOptions[copySliderIdx]?.label || 'Colombia'}
                          </span>
                        </div>
                        <h5 className="text-sm font-black text-white uppercase tracking-tight">Borradores de Copy sugeridos</h5>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 self-start xl:self-auto">
                        <button
                          type="button"
                          onClick={() => handleGenerateNewOptions('copy')}
                          disabled={isGeneratingCopy}
                          className="bg-neutral-900 hover:bg-neutral-850 text-neutral-300 disabled:text-neutral-500 border border-neutral-800 disabled:border-neutral-900 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer disabled:cursor-not-allowed select-none"
                        >
                          {isGeneratingCopy ? (
                            <>
                              <span className="w-3 h-3 border-2 border-dashed border-neutral-400 border-t-yellow-400 rounded-full animate-spin"></span>
                              <span>Generando...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                              <span>Nuevas Opciones con IA</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={handleApplyCopiesToEditor}
                          className="bg-[#015D2F]/25 hover:bg-[#015D2F]/45 text-[#fffd48] border border-emerald-500/30 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer select-none"
                        >
                          <Check className="w-3.5 h-3.5 text-yellow-400" />
                          <span>Aplicar al Constructor</span>
                        </button>
                      </div>
                    </div>

                    {/* Dual Boxes (Largo and Corto) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Long Copy box */}
                      <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-805 space-y-2 relative">
                        <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
                          <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider block">Borrador Copy Largo</span>
                          <span className="text-[8px] text-[#015D2F] bg-emerald-400/20 px-1.5 rounded font-mono uppercase font-bold leading-none">Cuerpo</span>
                        </div>
                        <p className="text-[11px] text-neutral-200 leading-relaxed italic select-all select-all">
                          "{activeMarketingOptions.copyOptions[copySliderIdx]?.long}"
                        </p>
                      </div>

                      {/* Short Copy box */}
                      <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-805 space-y-2 relative">
                        <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
                          <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider block">Borrador Copy Corto</span>
                          <span className="text-[8px] text-yellow-400 bg-yellow-400/10 px-1.5 rounded font-mono uppercase font-bold leading-none">Entregador</span>
                        </div>
                        <p className="text-[11px] text-neutral-200 leading-relaxed italic select-all select-all">
                          "{activeMarketingOptions.copyOptions[copySliderIdx]?.short}"
                        </p>
                      </div>
                    </div>

                    {/* Copy Slider Controls */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[9px] text-neutral-500 font-mono">
                        <span>FUTBOLERO & INMERSIVO</span>
                        <span className="text-emerald-400 font-semibold uppercase tracking-wider">Alineación de Tono {copySliderIdx + 1} de 3</span>
                        <span>DIGITAL / CORPORATIVO</span>
                      </div>
                      <div className="relative flex items-center">
                        <input
                          type="range"
                          min="0"
                          max="2"
                          value={copySliderIdx}
                          onChange={(e) => setCopySliderIdx(Number(e.target.value))}
                          className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
                        />
                      </div>

                      {/* Quick Segment buttons */}
                      <div className="grid grid-cols-3 gap-2">
                        {activeMarketingOptions.copyOptions.map((opt, sIdx) => {
                          const isActive = copySliderIdx === sIdx;
                          return (
                            <button
                              key={sIdx}
                              type="button"
                              onClick={() => setCopySliderIdx(sIdx)}
                              className={`py-1 px-1 rounded-md text-[9px] font-bold text-center transition-all truncate cursor-pointer uppercase ${
                                isActive 
                                  ? 'bg-[#015D2F] text-[#fffd48] border border-emerald-600/40 font-black font-black' 
                                  : 'bg-[#0e0e0e] border border-neutral-850 text-neutral-400 hover:text-white'
                              }`}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Button CTA Suggestions Box */}
                  <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-850 space-y-4">
                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-yellow-400 font-mono uppercase tracking-wider block font-bold">Estrategia de Conversión • Recurso 3</span>
                        <h5 className="text-sm font-black text-white uppercase tracking-tight">Acción sugerida para botones (CTAs)</h5>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 self-start xl:self-auto">
                        <button
                          type="button"
                          onClick={() => handleGenerateNewOptions('cta')}
                          disabled={isGeneratingCta}
                          className="bg-neutral-900 hover:bg-neutral-850 text-neutral-300 disabled:text-neutral-500 border border-neutral-800 disabled:border-neutral-900 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer disabled:cursor-not-allowed select-none"
                        >
                          {isGeneratingCta ? (
                            <>
                              <span className="w-3 h-3 border-2 border-dashed border-neutral-400 border-t-yellow-400 rounded-full animate-spin"></span>
                              <span>Generando...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                              <span>Nuevas Opciones con IA</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={handleApplyCtaToEditor}
                          className="bg-[#015D2F]/25 hover:bg-[#015D2F]/45 text-[#fffd48] border border-emerald-500/30 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer select-none"
                        >
                          <Check className="w-3.5 h-3.5 text-yellow-400" />
                          <span>Aplicar al Constructor</span>
                        </button>
                      </div>
                    </div>

                    {/* Active CTA Display */}
                    <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <span className="text-neutral-500 font-mono text-[9px] uppercase font-bold block">Botón Sugerido:</span>
                        <span className="bg-yellow-400 text-black px-3 py-1 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wider border border-yellow-500 shadow-sm block">
                          {activeMarketingOptions.ctaOptions[ctaSliderIdx]}
                        </span>
                      </div>
                      <span className="text-[8px] text-neutral-500 italic font-mono hidden sm:inline leading-none">Premium Layout Ready</span>
                    </div>

                    {/* CTA Slider Controls */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[9px] text-neutral-500 font-mono">
                        <span>Conversión en Casa</span>
                        <span className="text-yellow-400 font-semibold">Táctica CTA {ctaSliderIdx + 1} de 3</span>
                        <span>Lugar Físico / Ruta</span>
                      </div>
                      <div className="relative flex items-center">
                        <input
                          type="range"
                          min="0"
                          max="2"
                          value={ctaSliderIdx}
                          onChange={(e) => setCtaSliderIdx(Number(e.target.value))}
                          className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-yellow-400 focus:outline-none"
                        />
                      </div>

                      {/* Segment elements */}
                      <div className="grid grid-cols-3 gap-2">
                        {(contentType === 'landing' 
                          ? ["Opción 1: Acción Web", "Opción 2: Pasaporte", "Opción 3: Colección"] 
                          : ["Opción 1: Compra Rappi", "Opción 2: Recetario", "Opción 3: Registro Offline"]
                        ).map((lbl, sIdx) => {
                          const isActive = ctaSliderIdx === sIdx;
                          return (
                            <button
                              key={sIdx}
                              type="button"
                              onClick={() => setCtaSliderIdx(sIdx)}
                              className={`py-1 px-1 rounded-md text-[9px] font-bold text-center transition-all truncate cursor-pointer uppercase ${
                                isActive 
                                  ? 'bg-yellow-400 text-black font-black' 
                                  : 'bg-[#0e0e0e] border border-neutral-850 text-neutral-400 hover:text-white'
                              }`}
                            >
                              {lbl}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Suggested Block Order Wireframe (Right Column) */}
                <div className="space-y-4">
                  <h5 className="text-xs font-black text-neutral-400 uppercase tracking-widest flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                    <span>Estructura de Bloques Recomendada</span>
                  </h5>

                  <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-850 space-y-3">
                    <span className="text-[10px] text-neutral-500 font-bold uppercase block">Estructura del Artefato</span>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2.5 bg-neutral-900 px-3 py-2 rounded border border-neutral-800 text-[11px] text-neutral-400">
                        <span className="w-5 h-5 flex items-center justify-center rounded-full bg-neutral-950 text-neutral-500 font-mono text-[9px]">1</span>
                        <span>{contentType === 'landing' ? "Cabecera Web / Navbar (Fijo)" : "Cabecera Logo Buchanan's (Fijo)"}</span>
                      </div>

                      {presets[selectedCalIndex].editorVariables.blocks.map((block, bIdx) => (
                        <div 
                          key={block.id} 
                          className="flex items-center space-x-2.5 bg-[#0a0a0a] px-3 py-2 rounded border border-emerald-900/20 text-[11px]"
                        >
                          <span className="w-5 h-5 flex items-center justify-center rounded-full bg-[#015D2F]/30 text-yellow-400 font-mono font-bold text-[9px]">{bIdx + 2}</span>
                          <span className="text-neutral-100 font-semibold truncate capitalize">
                            {block.type === 'text' ? `Texto (${block.textStyle || 'paragraph'})` :
                             block.type === 'image' ? (contentType === 'landing' ? 'Banner Principal de Web' : 'Imagen Principal de Campaña') :
                             block.type === 'columns' ? (contentType === 'landing' ? 'Grilla Adaptativa (2 Cols)' : 'Dos Columnas (Format Tables)') :
                             block.type === 'button-group' ? (contentType === 'landing' ? 'Botones de Acción Web' : 'Grupo de Botones Call To Action') : block.type}
                          </span>
                        </div>
                      ))}

                      {/* Interactive form block is specific to Landing Page / CloudPage */}
                      {contentType === 'landing' && (
                        <div className="flex items-center space-x-2.5 bg-[#015D2F]/10 text-yellow-400 px-3 py-2 rounded border border-yellow-500/20 text-[11px]">
                          <span className="w-5 h-5 flex items-center justify-center rounded-full bg-neutral-950 text-yellow-400 font-mono font-bold text-[9px]">{presets[selectedCalIndex].editorVariables.blocks.length + 2}</span>
                          <span className="font-bold">Formulario Lead Capture (Mundial Checkin)</span>
                        </div>
                      )}

                      <div className="flex items-center space-x-2.5 bg-[#0a0a0a] px-3 py-2 rounded border border-neutral-900 text-[11px] text-neutral-400">
                        <span className="w-5 h-5 flex items-center justify-center rounded-full bg-neutral-950 text-neutral-500 font-mono text-[9px]">
                          {presets[selectedCalIndex].editorVariables.blocks.length + (contentType === 'landing' ? 3 : 2)}
                        </span>
                        <span>Pie de Página Diageo Legal 18+</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-850 flex items-center justify-between text-[10px] text-neutral-500">
                      <span>{contentType === 'landing' ? "Ancho sugerido: 680px Max" : "Ancho sugerido: 600px Max"}</span>
                      <span className="text-yellow-400 font-mono font-bold">
                        {contentType === 'landing' ? "Grid & Forms • 100% Web" : "Html Tables • 100% Mail"}
                      </span>
                    </div>
                  </div>
                </div>


              </div>

            </div>
          )}

        </div>
      </section>

      {/* Dynamic Client Milestone Creation Modal Overlay */}
      {showAddPresetModal && (
        <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl relative my-8 animate-fadeIn text-white">
            
            {/* Modal Header */}
            <div className="bg-neutral-950 px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center space-x-2.5 text-yellow-400">
                <Calendar className="w-5 h-5 text-yellow-450" />
                <h3 className="text-sm font-black uppercase tracking-wider">Nuevo correo solicitado por cliente</h3>
              </div>
              <button 
                type="button"
                onClick={() => setShowAddPresetModal(false)}
                className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleAddCustomPreset} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Event Name */}
                <div className="col-span-1 sm:col-span-2 space-y-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Nombre de la Activación / Hito *</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Ganar o Ganar: Partido Clave del Grupo"
                    value={newPresetForm.eventName}
                    onChange={e => setNewPresetForm({...newPresetForm, eventName: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-yellow-400 px-3.5 py-2 text-xs rounded-xl text-white outline-none"
                  />
                </div>

                {/* Date */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Fecha *</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Jun 18"
                    value={newPresetForm.date}
                    onChange={e => setNewPresetForm({...newPresetForm, date: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-yellow-400 px-3.5 py-2 text-xs rounded-xl text-white outline-none"
                  />
                </div>

                {/* Day */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Día de la semana</label>
                  <select 
                    value={newPresetForm.day}
                    onChange={e => setNewPresetForm({...newPresetForm, day: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-yellow-400 px-3.5 py-2 text-xs rounded-xl text-white outline-none cursor-pointer"
                  >
                    <option value="Lunes">Lunes</option>
                    <option value="Martes">Martes</option>
                    <option value="Miércoles">Miércoles</option>
                    <option value="Jueves">Jueves</option>
                    <option value="Viernes">Viernes</option>
                    <option value="Sábado">Sábado</option>
                    <option value="Domingo">Domingo</option>
                  </select>
                </div>

                {/* Type */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Tipo de Campaña</label>
                  <select 
                    value={newPresetForm.type}
                    onChange={e => setNewPresetForm({...newPresetForm, type: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-yellow-400 px-3.5 py-2 text-xs rounded-xl text-white outline-none cursor-pointer"
                  >
                    <option value="Matchday">Matchday (Partido)</option>
                    <option value="A/B Test">A/B Test</option>
                    <option value="Engagement">Engagement (Dinámicas)</option>
                    <option value="Ruta">Ruta Buchanita (Bares)</option>
                    <option value="Closing">Closing (Cierre)</option>
                    <option value="Especial">Especial Cliente</option>
                  </select>
                </div>

                {/* Channel */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Canal SFMC</label>
                  <input 
                    type="text"
                    required
                    placeholder="Journey Builder / Triggered Send"
                    value={newPresetForm.channel}
                    onChange={e => setNewPresetForm({...newPresetForm, channel: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-yellow-400 px-3.5 py-2 text-xs rounded-xl text-white outline-none"
                  />
                </div>

                {/* Subject Line */}
                <div className="col-span-1 sm:col-span-2 space-y-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Línea de Asunto (Subject) *</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. ¡Hoy juega la Selección! Celebremos el sabor en familia ⚽️🥃"
                    value={newPresetForm.subject}
                    onChange={e => setNewPresetForm({...newPresetForm, subject: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-yellow-400 px-3.5 py-2 text-xs rounded-xl text-white outline-none font-mono text-[11px]"
                  />
                </div>

                {/* Audience */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Audiencia en Salesforce</label>
                  <input 
                    type="text"
                    placeholder="Hinchas Registrados - Activos"
                    value={newPresetForm.audience}
                    onChange={e => setNewPresetForm({...newPresetForm, audience: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-yellow-400 px-3.5 py-2 text-xs rounded-xl text-white outline-none"
                  />
                </div>

                {/* Objective */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Objetivo Creativo</label>
                  <input 
                    type="text"
                    placeholder="Incentivar consumo en casa"
                    value={newPresetForm.objective}
                    onChange={e => setNewPresetForm({...newPresetForm, objective: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-yellow-400 px-3.5 py-2 text-xs rounded-xl text-white outline-none"
                  />
                </div>

                {/* Copy content body */}
                <div className="col-span-1 sm:col-span-2 space-y-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Borrador de Copy Sugerido</label>
                  <textarea 
                    rows={3}
                    value={newPresetForm.suggestedCopy}
                    onChange={e => setNewPresetForm({...newPresetForm, suggestedCopy: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-yellow-400 px-3.5 py-2 text-xs rounded-xl text-white outline-none resize-none font-mono text-[11px]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setShowAddPresetModal(false)}
                  className="px-4 py-2 bg-neutral-950 hover:bg-neutral-800 border border-neutral-805 hover:border-neutral-700 text-xs font-bold rounded-xl transition-colors shrink-0"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-yellow-400 hover:bg-yellow-350 text-black text-xs font-black rounded-xl uppercase tracking-wider shrink-0 transition-all shadow-md shadow-yellow-400/10 active:scale-95 cursor-pointer"
                >
                  Agregar a Calendario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer disclaimer */}
      <footer className="bg-[#040404] py-8 px-6 text-center text-xs text-neutral-500 border-t border-neutral-950 space-y-3">
        <div className="w-full max-w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-neutral-600" />
            <span className="font-mono text-neutral-600">BUCHANAN'S GALE BRAND WORLD 5.0 COMPLIANT PORTAL</span>
          </div>
          <p className="text-neutral-500">
            © 2026 Diageo Colombia S.A. Todos los derechos reservados. Diseñado por el Equipo de Marketing Digital.
          </p>
        </div>
        <p className="px-6 max-w-4xl mx-auto text-[10px] text-neutral-600 leading-normal">
          Uso estrictamente confidencial para equipos creativos de Sí Señor Agencia en Salesforce Marketing Cloud. Prohibida la utilización de recursos de imagen fuera del lineamiento del Diageo Code de Responsabilidad y Ley de Consumo 18+.
        </p>
      </footer>

    </div>
  );
}
