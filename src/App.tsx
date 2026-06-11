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
import { ActivationCalendar } from './components/ActivationCalendar';
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
  Check,
  Trash2
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
  
  // Active Brand state
  const [brand, setBrand] = useState<'buchanans' | 'smirnoff' | 'donjulio' | 'johnniewalker'>(() => {
    try {
      const saved = localStorage.getItem('buchanans_brand');
      if (saved === 'buchanans' || saved === 'smirnoff' || saved === 'donjulio' || saved === 'johnniewalker') {
        return saved as 'buchanans' | 'smirnoff' | 'donjulio' | 'johnniewalker';
      }
    } catch (e) {}
    return 'buchanans';
  });

  // Distinct storage state buckets for CRM Emails vs CloudPage Landings for each brand
  const [emailPresetsByBrand, setEmailPresetsByBrand] = useState<Record<string, CalendarPreset[]>>(() => {
    const brands = ['buchanans', 'smirnoff', 'donjulio', 'johnniewalker'];
    const result: Record<string, CalendarPreset[]> = {};
    
    let savedAll: Record<string, CalendarPreset[]> | null = null;
    try {
      const saved = localStorage.getItem('grand_presets_email_by_brand');
      if (saved) {
        savedAll = JSON.parse(saved);
      }
    } catch (e) {}

    for (const b of brands) {
      if (savedAll && savedAll[b]) {
        result[b] = savedAll[b];
        continue;
      }
      
      // Fallback for Buchanan's old key
      if (b === 'buchanans') {
        try {
          const savedLegacy = localStorage.getItem('buchanans_presets_email');
          if (savedLegacy) {
            const parsed = JSON.parse(savedLegacy);
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
            result[b] = migrated;
            continue;
          }
        } catch (e) {}
      }

      // Default presets filtered for Email (Cooling Break, Cierre)
      result[b] = JSON.parse(JSON.stringify(CALENDAR_PRESETS.filter(p => p.eventName.includes("Cooling Break") || p.eventName.includes("Cierre"))));
    }
    return result;
  });

  const [landingPresetsByBrand, setLandingPresetsByBrand] = useState<Record<string, CalendarPreset[]>>(() => {
    const brands = ['buchanans', 'smirnoff', 'donjulio', 'johnniewalker'];
    const result: Record<string, CalendarPreset[]> = {};
    
    let savedAll: Record<string, CalendarPreset[]> | null = null;
    try {
      const saved = localStorage.getItem('grand_presets_landing_by_brand');
      if (saved) {
        savedAll = JSON.parse(saved);
      }
    } catch (e) {}

    for (const b of brands) {
      if (savedAll && savedAll[b]) {
        result[b] = savedAll[b];
        continue;
      }
      
      // Fallback for Buchanan's old key
      if (b === 'buchanans') {
        try {
          const savedLegacy = localStorage.getItem('buchanans_presets_landing');
          if (savedLegacy) {
            const parsed = JSON.parse(savedLegacy);
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
            result[b] = migrated;
            continue;
          }
        } catch (e) {}
      }

      // Default presets filtered for Landing (Ruta, Sorteo, A/B Test)
      result[b] = JSON.parse(JSON.stringify(CALENDAR_PRESETS.filter(p => p.eventName.includes("Ruta") || p.eventName.includes("Sorteo") || p.eventName.includes("A/B Test"))));
    }
    return result;
  });

  const [emailVariablesByBrand, setEmailVariablesByBrand] = useState<Record<string, EmailVariables>>(() => {
    const brands = ['buchanans', 'smirnoff', 'donjulio', 'johnniewalker'];
    const result: Record<string, EmailVariables> = {};
    
    let savedAll: Record<string, EmailVariables> | null = null;
    try {
      const saved = localStorage.getItem('grand_variables_email_by_brand');
      if (saved) {
        savedAll = JSON.parse(saved);
      }
    } catch (e) {}

    for (const b of brands) {
      if (savedAll && savedAll[b]) {
        result[b] = savedAll[b];
        continue;
      }
      
      if (b === 'buchanans') {
        try {
          const savedLegacy = localStorage.getItem('buchanans_variables_email') || localStorage.getItem('buchanans_variables');
          if (savedLegacy) {
            const parsed = JSON.parse(savedLegacy);
            if (parsed.logoUrl === "https://lh3.googleusercontent.com/sitesv/AA5AbUDAMWKl4CQDj3m1YdX1HotdzforjPuQW28TyPrLlQaVBk7WiLdvcFlghgpmSnpFlNJDWWvFM7a8aPBi1hFbgLjcYISEBuw8Cx2HGnFKD0aI64cETjxyEpZm1_S5ooXQmnNPpBh_5KVoma96Lbk_pEquomgWEhSLm9xoJ_63phSXbJKDijJzsukz1PNZ3Dt1pdx63PuvrXdO8mmRWE87MMinJ6wDk040uD14DLZ0vWg=w1280") {
              parsed.logoUrl = "https://lh3.googleusercontent.com/d/1ZtNqBvS6qL-g9-7Lz1eZ_T0J3_TjW69i=w360";
            }
            result[b] = parsed;
            continue;
          }
        } catch (e) {}
      }

      // Default fallback from CALENDAR_PRESETS
      const defaults = CALENDAR_PRESETS.filter(p => p.eventName.includes("Cooling Break") || p.eventName.includes("Cierre"));
      result[b] = defaults[0] ? JSON.parse(JSON.stringify(defaults[0].editorVariables)) : JSON.parse(JSON.stringify(DEFAULT_EMAIL_VARIABLES));
    }
    return result;
  });

  const [landingVariablesByBrand, setLandingVariablesByBrand] = useState<Record<string, EmailVariables>>(() => {
    const brands = ['buchanans', 'smirnoff', 'donjulio', 'johnniewalker'];
    const result: Record<string, EmailVariables> = {};
    
    let savedAll: Record<string, EmailVariables> | null = null;
    try {
      const saved = localStorage.getItem('grand_variables_landing_by_brand');
      if (saved) {
        savedAll = JSON.parse(saved);
      }
    } catch (e) {}

    for (const b of brands) {
      if (savedAll && savedAll[b]) {
        result[b] = savedAll[b];
        continue;
      }
      
      if (b === 'buchanans') {
        try {
          const savedLegacy = localStorage.getItem('buchanans_variables_landing');
          if (savedLegacy) {
            const parsed = JSON.parse(savedLegacy);
            if (parsed.logoUrl === "https://lh3.googleusercontent.com/sitesv/AA5AbUDAMWKl4CQDj3m1YdX1HotdzforjPuQW28TyPrLlQaVBk7WiLdvcFlghgpmSnpFlNJDWWvFM7a8aPBi1hFbgLjcYISEBuw8Cx2HGnFKD0aI64cETjxyEpZm1_S5ooXQmnNPpBh_5KVoma96Lbk_pEquomgWEhSLm9xoJ_63phSXbJKDijJzsukz1PNZ3Dt1pdx63PuvrXdO8mmRWE87MMinJ6wDk040uD14DLZ0vWg=w1280") {
              parsed.logoUrl = "https://lh3.googleusercontent.com/d/1ZtNqBvS6qL-g9-7Lz1eZ_T0J3_TjW69i=w360";
            }
            result[b] = parsed;
            continue;
          }
        } catch (e) {}
      }

      const defaults = CALENDAR_PRESETS.filter(p => p.eventName.includes("Ruta") || p.eventName.includes("Sorteo") || p.eventName.includes("A/B Test"));
      result[b] = defaults[0] ? JSON.parse(JSON.stringify(defaults[0].editorVariables)) : JSON.parse(JSON.stringify(DEFAULT_EMAIL_VARIABLES));
    }
    return result;
  });

  const [selectedCalIndexEmailByBrand, setSelectedCalIndexEmailByBrand] = useState<Record<string, number>>(() => {
    const brands = ['buchanans', 'smirnoff', 'donjulio', 'johnniewalker'];
    const result: Record<string, number> = {};
    
    let savedAll: Record<string, number> | null = null;
    try {
      const saved = localStorage.getItem('grand_selected_email_by_brand');
      if (saved) {
        savedAll = JSON.parse(saved);
      }
    } catch (e) {}

    for (const b of brands) {
      if (savedAll && savedAll[b] !== undefined) {
        result[b] = savedAll[b];
        continue;
      }
      
      if (b === 'buchanans') {
        const legacy = localStorage.getItem('buchanans_selectedCalIndex_email');
        if (legacy !== null) {
          result[b] = Number(legacy);
          continue;
        }
      }
      result[b] = 0;
    }
    return result;
  });

  const [selectedCalIndexLandingByBrand, setSelectedCalIndexLandingByBrand] = useState<Record<string, number>>(() => {
    const brands = ['buchanans', 'smirnoff', 'donjulio', 'johnniewalker'];
    const result: Record<string, number> = {};
    
    let savedAll: Record<string, number> | null = null;
    try {
      const saved = localStorage.getItem('grand_selected_landing_by_brand');
      if (saved) {
        savedAll = JSON.parse(saved);
      }
    } catch (e) {}

    for (const b of brands) {
      if (savedAll && savedAll[b] !== undefined) {
        result[b] = savedAll[b];
        continue;
      }
      
      if (b === 'buchanans') {
        const legacy = localStorage.getItem('buchanans_selectedCalIndex_landing');
        if (legacy !== null) {
          result[b] = Number(legacy);
          continue;
        }
      }
      result[b] = 0;
    }
    return result;
  });

  // Getters/proxies that preserve original API surfaces down-the-tree
  const emailPresets = emailPresetsByBrand[brand] || [];
  const setEmailPresets = (newPresets: CalendarPreset[] | ((prev: CalendarPreset[]) => CalendarPreset[])) => {
    setEmailPresetsByBrand(prevDict => {
      const currentVal = prevDict[brand] || [];
      const nextVal = typeof newPresets === 'function' ? (newPresets as Function)(currentVal) : newPresets;
      return {
        ...prevDict,
        [brand]: nextVal
      };
    });
  };

  const landingPresets = landingPresetsByBrand[brand] || [];
  const setLandingPresets = (newPresets: CalendarPreset[] | ((prev: CalendarPreset[]) => CalendarPreset[])) => {
    setLandingPresetsByBrand(prevDict => {
      const currentVal = prevDict[brand] || [];
      const nextVal = typeof newPresets === 'function' ? (newPresets as Function)(currentVal) : newPresets;
      return {
        ...prevDict,
        [brand]: nextVal
      };
    });
  };

  const emailVariables = emailVariablesByBrand[brand] || DEFAULT_EMAIL_VARIABLES;
  const setEmailVariables = (newVars: EmailVariables | ((prev: EmailVariables) => EmailVariables)) => {
    setEmailVariablesByBrand(prevDict => {
      const currentVal = prevDict[brand] || DEFAULT_EMAIL_VARIABLES;
      const nextVal = typeof newVars === 'function' ? (newVars as Function)(currentVal) : newVars;
      return {
        ...prevDict,
        [brand]: nextVal
      };
    });
  };

  const landingVariables = landingVariablesByBrand[brand] || DEFAULT_EMAIL_VARIABLES;
  const setLandingVariables = (newVars: EmailVariables | ((prev: EmailVariables) => EmailVariables)) => {
    setLandingVariablesByBrand(prevDict => {
      const currentVal = prevDict[brand] || DEFAULT_EMAIL_VARIABLES;
      const nextVal = typeof newVars === 'function' ? (newVars as Function)(currentVal) : newVars;
      return {
        ...prevDict,
        [brand]: nextVal
      };
    });
  };

  const selectedCalIndexEmail = selectedCalIndexEmailByBrand[brand] ?? 0;
  const setSelectedCalIndexEmail = (idx: number | ((prev: number) => number)) => {
    setSelectedCalIndexEmailByBrand(prevDict => {
      const currentVal = prevDict[brand] ?? 0;
      const nextVal = typeof idx === 'function' ? (idx as Function)(currentVal) : idx;
      return {
        ...prevDict,
        [brand]: nextVal
      };
    });
  };

  const selectedCalIndexLanding = selectedCalIndexLandingByBrand[brand] ?? 0;
  const setSelectedCalIndexLanding = (idx: number | ((prev: number) => number)) => {
    setSelectedCalIndexLandingByBrand(prevDict => {
      const currentVal = prevDict[brand] ?? 0;
      const nextVal = typeof idx === 'function' ? (idx as Function)(currentVal) : idx;
      return {
        ...prevDict,
        [brand]: nextVal
      };
    });
  };

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

  // Dynamic proxies to allow unchanged down-the-tree integration for 'presets', 'variables' and indexes
  const presets = contentType === 'email' ? emailPresets : landingPresets;
  const setPresets = (newPresets: CalendarPreset[] | ((prev: CalendarPreset[]) => CalendarPreset[])) => {
    if (contentType === 'email') {
      setEmailPresets(prev => typeof newPresets === 'function' ? (newPresets as Function)(prev) : newPresets);
    } else {
      setLandingPresets(prev => typeof newPresets === 'function' ? (newPresets as Function)(prev) : newPresets);
    }
  };

  const variables = contentType === 'email' ? emailVariables : landingVariables;
  const setVariables = (newVars: EmailVariables | ((prev: EmailVariables) => EmailVariables)) => {
    if (contentType === 'email') {
      setEmailVariables(prev => typeof newVars === 'function' ? (newVars as Function)(prev) : newVars);
    } else {
      setLandingVariables(prev => typeof newVars === 'function' ? (newVars as Function)(prev) : newVars);
    }
  };

  const rawSelectedCalIndex = contentType === 'email' ? selectedCalIndexEmail : selectedCalIndexLanding;
  const selectedCalIndex = rawSelectedCalIndex < presets.length ? rawSelectedCalIndex : 0;
  const setSelectedCalIndex = (idx: number | ((prev: number) => number)) => {
    if (contentType === 'email') {
      setSelectedCalIndexEmail(prev => {
        const next = typeof idx === 'function' ? (idx as Function)(prev) : idx;
        return next < emailPresets.length ? next : 0;
      });
    } else {
      setSelectedCalIndexLanding(prev => {
        const next = typeof idx === 'function' ? (idx as Function)(prev) : idx;
        return next < landingPresets.length ? next : 0;
      });
    }
  };

  const [headerSliderIdx, setHeaderSliderIdx] = useState<number>(0);
  const [copySliderIdx, setCopySliderIdx] = useState<number>(0);
  const [ctaSliderIdx, setCtaSliderIdx] = useState<number>(0);
  const [loadSuccess, setLoadSuccess] = useState<string | null>(null);

  const [customMarketingOptions, setCustomMarketingOptions] = useState<any>(null);
  const [isGeneratingHeader, setIsGeneratingHeader] = useState(false);
  const [isGeneratingCopy, setIsGeneratingCopy] = useState(false);
  const [isGeneratingCta, setIsGeneratingCta] = useState(false);

  const [showAddPresetModal, setShowAddPresetModal] = useState<boolean>(false);
  const [deleteConfirmIdx, setDeleteConfirmIdx] = useState<number | null>(null);
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

  // Sync states to localStorage brand-by-brand to prevent data loss on refresh and mixing
  React.useEffect(() => {
    try {
      localStorage.setItem('grand_presets_email_by_brand', JSON.stringify(emailPresetsByBrand));
    } catch (e) {
      console.error(e);
    }
  }, [JSON.stringify(emailPresetsByBrand)]);

  React.useEffect(() => {
    try {
      localStorage.setItem('grand_presets_landing_by_brand', JSON.stringify(landingPresetsByBrand));
    } catch (e) {
      console.error(e);
    }
  }, [JSON.stringify(landingPresetsByBrand)]);

  React.useEffect(() => {
    try {
      localStorage.setItem('grand_variables_email_by_brand', JSON.stringify(emailVariablesByBrand));
    } catch (e) {
      console.error(e);
    }
  }, [JSON.stringify(emailVariablesByBrand)]);

  React.useEffect(() => {
    try {
      localStorage.setItem('grand_variables_landing_by_brand', JSON.stringify(landingVariablesByBrand));
    } catch (e) {
      console.error(e);
    }
  }, [JSON.stringify(landingVariablesByBrand)]);

  React.useEffect(() => {
    try {
      localStorage.setItem('grand_selected_email_by_brand', JSON.stringify(selectedCalIndexEmailByBrand));
    } catch (e) {}
  }, [JSON.stringify(selectedCalIndexEmailByBrand)]);

  React.useEffect(() => {
    try {
      localStorage.setItem('grand_selected_landing_by_brand', JSON.stringify(selectedCalIndexLandingByBrand));
    } catch (e) {}
  }, [JSON.stringify(selectedCalIndexLandingByBrand)]);

  React.useEffect(() => {
    try {
      localStorage.setItem('buchanans_brand', brand);
    } catch (e) {}
  }, [brand]);

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

  // Reset custom Gemini generated options when campaign context changes
  React.useEffect(() => {
    setCustomMarketingOptions(null);
    setDeleteConfirmIdx(null);
  }, [selectedCalIndex, contentType]);

  const handleDeletePresetClick = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirmIdx(idx);
  };

  const confirmDeletePreset = (idx: number) => {
    if (presets.length <= 1) {
      setLoadSuccess("No puedes eliminar la última activación restante de esta categoría. ⚠️");
      setTimeout(() => setLoadSuccess(null), 4500);
      setDeleteConfirmIdx(null);
      return;
    }

    const itemToDelete = presets[idx];
    const updatedPresets = presets.filter((_, i) => i !== idx);

    if (contentType === 'email') {
      setEmailPresets(updatedPresets);
      if (selectedCalIndexEmail === idx) {
        setSelectedCalIndexEmail(0);
      } else if (selectedCalIndexEmail > idx) {
        setSelectedCalIndexEmail(selectedCalIndexEmail - 1);
      }
    } else {
      setLandingPresets(updatedPresets);
      if (selectedCalIndexLanding === idx) {
        setSelectedCalIndexLanding(0);
      } else if (selectedCalIndexLanding > idx) {
        setSelectedCalIndexLanding(selectedCalIndexLanding - 1);
      }
    }

    setDeleteConfirmIdx(null);
    setLoadSuccess(`Hito "${itemToDelete.eventName}" descartado correctamente. ✅`);
    setTimeout(() => setLoadSuccess(null), 4500);
  };

  const handleSelectCalPreset = (idx: number) => {
    setSelectedCalIndex(idx);
    setHeaderSliderIdx(0);
    setCopySliderIdx(0);
    setCtaSliderIdx(0);
  };

  const defaultMarketingOptions = getMarketingOptions(
    presets[selectedCalIndex]?.eventName || '',
    presets[selectedCalIndex]?.date || '',
    contentType,
    brand
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
    const currentPreset = presets[selectedCalIndex];
    if (!currentPreset) return;
    const originalPreset = CALENDAR_PRESETS.find(p => p.eventId === currentPreset.eventId);
    if (originalPreset) {
      const updatedPresets = [...presets];
      updatedPresets[selectedCalIndex] = {
        ...originalPreset,
        editorVariables: JSON.parse(JSON.stringify(originalPreset.editorVariables))
      };
      setPresets(updatedPresets);
      setVariables(JSON.parse(JSON.stringify(originalPreset.editorVariables)));
      setLoadSuccess(`¡Hito "${originalPreset.eventName}" restaurado a las configuraciones originales de Diageo! 🔄`);
      setTimeout(() => setLoadSuccess(null), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-neutral-100 flex flex-col font-sans selection:bg-yellow-400 selection:text-black">
      {/* Upper Navigation / Decorative top border */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${brand === 'donjulio' ? 'from-blue-700 via-blue-500 to-blue-400' : brand === 'smirnoff' ? 'from-red-800 via-red-600 to-red-500' : brand === 'johnniewalker' ? 'from-[#000040] via-[#0033A0] to-[#C5A059]' : 'from-emerald-700 via-emerald-500 to-yellow-400'}`}></div>

      {/* Main App Bar Header */}
      <header className="bg-neutral-950 border-b border-neutral-900 py-4 px-6 sticky top-0 z-50 shadow-lg" id="app-header">
        <div className="w-full max-w-full flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & SLogan */}
          <div className="flex items-center space-x-3.5">
            <div className={`${brand === 'donjulio' ? 'bg-[#D6D3C9]' : brand === 'smirnoff' ? 'bg-[#DA0022]' : brand === 'johnniewalker' ? 'bg-[#000040]' : 'bg-[#015D2F]'} p-2.5 rounded-xl border ${brand === 'donjulio' ? 'border-neutral-400' : brand === 'smirnoff' ? 'border-red-550/30' : brand === 'johnniewalker' ? 'border-amber-600/30' : 'border-emerald-600/30'} shadow-md transition-all duration-350`}>
              {brand === 'donjulio' ? (
                <Sparkles className="w-6 h-6 text-[#0055C8]" />
              ) : brand === 'smirnoff' ? (
                <Flame className="w-6 h-6 text-white animate-pulse" />
              ) : brand === 'johnniewalker' ? (
                <Crown className="w-6 h-6 text-[#C5A059] animate-pulse" />
              ) : (
                <Crown className="w-6 h-6 text-[#fffd48] animate-pulse" />
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-black text-white tracking-tight uppercase">
                  {brand === 'donjulio' ? 'DON JULIO' : brand === 'smirnoff' ? 'SMIRNOFF' : brand === 'johnniewalker' ? 'JOHNNIE WALKER' : "BUCHANAN'S"}
                </h1>
                <span className={`text-[10px] ${brand === 'donjulio' ? 'bg-blue-950 text-blue-400 border border-blue-900/40' : brand === 'smirnoff' ? 'bg-red-950 text-red-500 border border-red-900/40' : brand === 'johnniewalker' ? 'bg-neutral-900 text-[#C5A059] border border-amber-900/40' : 'bg-[#015D2F] text-[#fffd48]'} px-2 py-0.5 rounded-full font-bold transition-all duration-350`}>
                  Artifact Maestro
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-mono">
                Salesforce Marketing Cloud Email Workspace • FY26
              </p>
            </div>
          </div>

          {/* INTERCAMBIADOR DE MARCAS (Petición de Andrés González) */}
          <div className="flex items-center bg-neutral-900 p-1.5 rounded-2xl border border-neutral-850 shadow-inner" id="brand-selector">
            <button
              id="btn-brand-buchanans"
              type="button"
              onClick={() => setBrand('buchanans')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black tracking-wider uppercase transition-all duration-200 flex items-center space-x-2 cursor-pointer ${
                brand === 'buchanans'
                  ? 'bg-[#015D2F] text-[#fffd48] shadow-md border border-emerald-600/30 scale-[1.02]'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-950'
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Buchanan's 12</span>
            </button>
            <button
              id="btn-brand-smirnoff"
              type="button"
              onClick={() => setBrand('smirnoff')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black tracking-wider uppercase transition-all duration-200 flex items-center space-x-2 cursor-pointer ${
                brand === 'smirnoff'
                  ? 'bg-[#DA0022] text-white shadow-md border border-red-500/25 shadow-red-900/40 scale-[1.02]'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-950'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Smirnoff Spicy</span>
            </button>
            <button
              id="btn-brand-donjulio"
              type="button"
              onClick={() => setBrand('donjulio')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black tracking-wider uppercase transition-all duration-200 flex items-center space-x-2 cursor-pointer ${
                brand === 'donjulio'
                  ? 'bg-[#0055C8] text-white shadow-md border border-blue-500/25 shadow-blue-900/40 scale-[1.02]'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-950'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Don Julio</span>
            </button>
            <button
              id="btn-brand-johnniewalker"
              type="button"
              onClick={() => setBrand('johnniewalker')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black tracking-wider uppercase transition-all duration-200 flex items-center space-x-2 cursor-pointer ${
                brand === 'johnniewalker'
                  ? 'bg-[#000040] text-[#C5A059] shadow-md border border-amber-600/35 shadow-amber-900/40 scale-[1.02]'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-950'
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Johnnie Walker Blue</span>
            </button>
          </div>

          {/* User profile / Agency context */}
          <div className="flex items-center space-x-4">
            <div className="text-right hidden md:block">
              <span className={`text-[10px] ${brand === 'donjulio' ? 'text-blue-400' : brand === 'smirnoff' ? 'text-red-400' : brand === 'johnniewalker' ? 'text-amber-500' : 'text-emerald-400'} font-mono uppercase tracking-widest block font-bold transition-all`}>
                Agencia Asociada
              </span>
              <span className="text-xs font-semibold text-neutral-300">
                Sí Señor Agencia
              </span>
            </div>
            <div className="h-8 w-px bg-neutral-800 hidden md:block"></div>
            <div className="bg-neutral-900 px-4 py-2 rounded-xl border border-neutral-800 flex items-center space-x-2">
              <span className={`w-2 h-2 rounded-full ${brand === 'donjulio' ? 'bg-blue-500' : brand === 'smirnoff' ? 'bg-red-500' : brand === 'johnniewalker' ? 'bg-amber-400' : 'bg-yellow-400'} animate-ping`}></span>
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
              <span className={`flex items-center space-x-1.5 ${brand === 'donjulio' ? 'text-blue-400 bg-blue-950/20 border-blue-900/40' : brand === 'smirnoff' ? 'text-red-400 bg-red-950/20 border-red-900/40' : brand === 'johnniewalker' ? 'text-amber-400 bg-amber-950/15 border-amber-900/25' : 'text-yellow-400 bg-[#015D2F]/20 border-[#015D2F]/40'} text-xs font-mono tracking-widest uppercase px-2.5 py-1 rounded-full border font-bold`}>
                <Sparkles className={`w-3.5 h-3.5 ${brand === 'donjulio' ? 'text-blue-400' : brand === 'smirnoff' ? 'text-red-500' : brand === 'johnniewalker' ? 'text-amber-400' : 'text-yellow-400'} animate-pulse`} />
                <span>Campaña Integral • Copa Mundial FIFA 2026™</span>
              </span>
              {presets[selectedCalIndex] && (
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-mono uppercase font-bold tracking-wider ${
                  presets[selectedCalIndex].type === 'Matchday' ? (brand === 'donjulio' ? 'bg-blue-950 text-blue-400 border border-blue-950/40' : brand === 'smirnoff' ? 'bg-red-950 text-red-400 border border-red-950/40' : brand === 'johnniewalker' ? 'bg-amber-950/20 text-[#C5A059] border border-amber-900/25' : 'bg-emerald-950 text-emerald-400 border border-emerald-900/40') :
                  presets[selectedCalIndex].type === 'A/B Test' ? (brand === 'donjulio' ? 'bg-orange-950 text-orange-400 border border border-orange-950/40' : brand === 'smirnoff' ? 'bg-red-950 text-red-400 border border border-red-950/40' : brand === 'johnniewalker' ? 'bg-amber-950/20 text-[#C5A059] border border-amber-900/25' : 'bg-yellow-950 text-[#fffd48] border border-yellow-950/40') :
                  presets[selectedCalIndex].type === 'Engagement' ? 'bg-pink-950 text-pink-400 border border-pink-900/40' :
                  presets[selectedCalIndex].type === 'Ruta' ? 'bg-orange-950 text-orange-400 border border-orange-900/40' :
                  'bg-neutral-800 text-neutral-300'
                }`}>
                  {contentType === 'email' ? 'MAIL' : 'LANDING'} • {presets[selectedCalIndex].type}
                </span>
              )}
            </div>
            <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight leading-none uppercase">
              {presets[selectedCalIndex] ? presets[selectedCalIndex].eventName : "Workspace de Campaña Integral"}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
              Diseña, simula y adapta plantillas interactivas para cada hito de tu campaña de <strong className="text-white">{brand === 'donjulio' ? 'Don Julio' : brand === 'smirnoff' ? 'Smirnoff' : brand === 'johnniewalker' ? 'Johnnie Walker Blue' : "Buchanan's"}</strong>. Sintoniza el cabezote ideal con el deslizador de tres opciones, calibra la longitud de tus borradores de copy (largo y corto) y optimiza los llamados a la acción (CTAs) para cada momento de la copa.
            </p>
          </div>
          <div className={`${brand === 'donjulio' ? 'bg-blue-950/10 border-blue-900/30' : brand === 'smirnoff' ? 'bg-red-950/10 border-red-900/30' : 'bg-[#015D2F]/10 border-[#015D2F]/30'} border p-4 rounded-xl flex items-start space-x-3 text-xs text-neutral-300 relative overflow-hidden`}>
            <div className={`absolute top-0 right-0 w-16 h-16 ${brand === 'donjulio' ? 'bg-blue-650/10' : brand === 'smirnoff' ? 'bg-red-650/10' : 'bg-[#ca8a04]/10'} rounded-full blur-xl`}></div>
            <Info className={`w-5 h-5 ${brand === 'donjulio' ? 'text-blue-400' : brand === 'smirnoff' ? 'text-red-400' : 'text-[#fffd48]'} shrink-0 mt-0.5`} />
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
                  ? (brand === 'donjulio' ? 'bg-[#0055C8] text-white border border-blue-500/20 shadow-md' : brand === 'smirnoff' ? 'bg-[#DA0022] text-white border border-red-500/20 shadow-md' : brand === 'johnniewalker' ? 'bg-[#000040] text-[#C5A059] border border-amber-900/35 shadow-md' : 'bg-[#015D2F] text-[#fffd48] border border-emerald-600/30 shadow-md')
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
                  ? (brand === 'donjulio' ? 'bg-[#0055C8] text-white border border-blue-500/20 shadow-md' : brand === 'smirnoff' ? 'bg-[#DA0022] text-white border border-red-500/20 shadow-md' : brand === 'johnniewalker' ? 'bg-[#000040] text-[#C5A059] border border-amber-900/35 shadow-md' : 'bg-[#015D2F] text-[#fffd48] border border-[#015D2F]/30 shadow-md')
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Constructor de Landings</span>
            </button>
          </div>
        </div>
      </section>

      <ActivationCalendar
        presets={presets}
        selectedCalIndex={selectedCalIndex}
        setSelectedCalIndex={handleSelectCalPreset}
        contentType={contentType}
        loadSuccess={loadSuccess}
        scrollContainerRef={scrollContainerRef}
        deleteConfirmIdx={deleteConfirmIdx}
        handleDeletePresetClick={handleDeletePresetClick}
        confirmDeletePreset={confirmDeletePreset}
        setDeleteConfirmIdx={setDeleteConfirmIdx}
        setShowAddPresetModal={setShowAddPresetModal}
        activeMarketingOptions={activeMarketingOptions}
        headerSliderIdx={headerSliderIdx}
        setHeaderSliderIdx={setHeaderSliderIdx}
        copySliderIdx={copySliderIdx}
        setCopySliderIdx={setCopySliderIdx}
        ctaSliderIdx={ctaSliderIdx}
        setCtaSliderIdx={setCtaSliderIdx}
        isGeneratingHeader={isGeneratingHeader}
        isGeneratingCopy={isGeneratingCopy}
        isGeneratingCta={isGeneratingCta}
        handleGenerateNewOptions={handleGenerateNewOptions}
        handleApplyHeaderToEditor={handleApplyHeaderToEditor}
        handleApplyCopiesToEditor={handleApplyCopiesToEditor}
        handleApplyCtaToEditor={handleApplyCtaToEditor}
        handleResetPreset={handleResetPreset}
        handleSaveToPreset={handleSaveToPreset}
        handleApplyPreset={handleApplyPreset}
        brand={brand}
      />

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
                  ? (brand === 'donjulio' ? 'bg-[#0055C8] text-white shadow-md border border-blue-500/20 shadow-blue-950/30' : brand === 'smirnoff' ? 'bg-[#DA0022] text-white shadow-md border border-red-500/20 shadow-red-950/30' : brand === 'johnniewalker' ? 'bg-[#000040] text-[#C5A059] border border-amber-900/30 shadow-md' : 'bg-[#015D2F] text-[#fffd48] shadow-md border border-emerald-600/30')
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
                  ? (brand === 'donjulio' ? 'bg-[#0055C8] text-white shadow-md border border-blue-500/20 shadow-blue-950/30' : brand === 'smirnoff' ? 'bg-[#DA0022] text-white shadow-md border border-red-500/20 shadow-red-950/30' : brand === 'johnniewalker' ? 'bg-[#000040] text-[#C5A059] border border-amber-900/30 shadow-md' : 'bg-[#015D2F] text-[#fffd48] shadow-md border border-emerald-600/30')
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
                brand={brand}
              />
            ) : (
              <BrandGuide brand={brand} />
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
              brand={brand}
            />

          </div>

        </div>

      </main>

      {/* Dynamic Client Milestone Creation Modal Overlay */}
      {showAddPresetModal && (
        <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl relative my-8 animate-fadeIn text-white">
            
            {/* Modal Header */}
            <div className="bg-neutral-950 px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center space-x-2.5 text-yellow-400">
                <Calendar className="w-5 h-5 text-yellow-450" />
                <h3 className="text-sm font-black uppercase tracking-wider">{contentType === 'email' ? 'Nuevo correo solicitado por cliente' : 'Nueva landing solicitada por cliente'}</h3>
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
            <span className="font-mono text-neutral-600">
              {brand === 'donjulio' ? 'DON JULIO MAESTRO COPA BRAND PORTAL' : brand === 'smirnoff' ? 'SMIRNOFF SPICY COMPLIANT PORTAL' : brand === 'johnniewalker' ? 'JOHNNIE WALKER BLUE LABEL SOCIETY BRAND PORTAL' : "BUCHANAN'S GALE BRAND WORLD 5.0 COMPLIANT PORTAL"}
            </span>
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
