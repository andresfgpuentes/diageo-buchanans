import React from 'react';
import { CalendarPreset } from '../utils/calendarPresets';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Trash2, 
  RotateCcw, 
  Save, 
  Sparkles, 
  Check, 
  PlusCircle, 
  ShieldCheck 
} from 'lucide-react';

interface ActivationCalendarProps {
  presets: CalendarPreset[];
  selectedCalIndex: number;
  setSelectedCalIndex: (idx: number) => void;
  contentType: 'email' | 'landing';
  loadSuccess: string | null;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  deleteConfirmIdx: number | null;
  handleDeletePresetClick: (idx: number, e: React.MouseEvent) => void;
  confirmDeletePreset: (idx: number) => void;
  setDeleteConfirmIdx: (idx: number | null) => void;
  setShowAddPresetModal: (show: boolean) => void;
  activeMarketingOptions: {
    headerOptions: string[];
    copyOptions: { label: string; long: string; short: string }[];
    ctaOptions: string[];
  };
  headerSliderIdx: number;
  setHeaderSliderIdx: (idx: number) => void;
  copySliderIdx: number;
  setCopySliderIdx: (idx: number) => void;
  ctaSliderIdx: number;
  setCtaSliderIdx: (idx: number) => void;
  isGeneratingHeader: boolean;
  isGeneratingCopy: boolean;
  isGeneratingCta: boolean;
  handleGenerateNewOptions: (type: 'header' | 'copy' | 'cta') => void;
  handleApplyHeaderToEditor: () => void;
  handleApplyCopiesToEditor: () => void;
  handleApplyCtaToEditor: () => void;
  handleResetPreset: () => void;
  handleSaveToPreset: () => void;
  handleApplyPreset: (idx: number) => void;
  brand?: 'buchanans' | 'smirnoff' | 'donjulio' | 'johnniewalker';
}

export const ActivationCalendar: React.FC<ActivationCalendarProps> = ({
  presets,
  selectedCalIndex,
  setSelectedCalIndex,
  contentType,
  loadSuccess,
  scrollContainerRef,
  deleteConfirmIdx,
  handleDeletePresetClick,
  confirmDeletePreset,
  setDeleteConfirmIdx,
  setShowAddPresetModal,
  activeMarketingOptions,
  headerSliderIdx,
  setHeaderSliderIdx,
  copySliderIdx,
  setCopySliderIdx,
  ctaSliderIdx,
  setCtaSliderIdx,
  isGeneratingHeader,
  isGeneratingCopy,
  isGeneratingCta,
  handleGenerateNewOptions,
  handleApplyHeaderToEditor,
  handleApplyCopiesToEditor,
  handleApplyCtaToEditor,
  handleResetPreset,
  handleSaveToPreset,
  handleApplyPreset,
  brand = 'buchanans'
}) => {
  const isDonJulio = brand === 'donjulio';
  const isSmirnoff = brand === 'smirnoff';
  const isJW = brand === 'johnniewalker';
  const textClr = isJW ? 'text-[#C5A059]' : (isDonJulio ? 'text-blue-400' : isSmirnoff ? 'text-red-500' : 'text-yellow-400');
  const textHoverClr = isJW
    ? 'hover:text-[#C5A059] hover:border-[#C5A059]/40 hover:bg-[#C5A059]/10'
    : (isDonJulio
        ? 'hover:text-blue-400 hover:border-blue-400/40 hover:bg-blue-500/10'
        : isSmirnoff
          ? 'hover:text-red-500 hover:border-red-500/40 hover:bg-red-500/10'
          : 'hover:text-yellow-400 hover:border-yellow-400/40 hover:bg-[#015D2F]/20');
  const bgClr = isJW ? 'bg-[#C5A059]' : (isDonJulio ? 'bg-blue-500' : isSmirnoff ? 'bg-red-500' : 'bg-yellow-400');
  const bgOutlineClr = isJW
    ? 'bg-amber-950/20 border-amber-500/20 text-[#C5A059]'
    : (isDonJulio
        ? 'bg-blue-950/20 border-blue-500/20 text-blue-400'
        : isSmirnoff
          ? 'bg-red-500/10 border-red-500/20 text-red-400'
          : 'bg-[#015D2F]/10 border-yellow-500/20 text-yellow-400');
  const accentBorderClr = isJW ? 'border-[#C5A059]' : (isDonJulio ? 'border-blue-500' : isSmirnoff ? 'border-red-500' : 'border-yellow-400');
  const accentBgBadge = isJW ? 'bg-[#C5A059] text-[#000040]' : (isDonJulio ? 'bg-[#0055C8] text-white' : isSmirnoff ? 'bg-red-500 text-white' : 'bg-yellow-400 text-black');
  const customCalItemStyle = isSelected => isSelected 
    ? (isJW
        ? 'bg-amber-950/20 border-[#C5A059] shadow-[0_0_15px_rgba(197,160,89,0.15)] scale-[1.02] ring-1 ring-[#C5A059]/40 text-white'
        : (isDonJulio
            ? 'bg-blue-950/20 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.15)] scale-[1.02] ring-1 ring-blue-500/40 text-white'
            : isSmirnoff 
              ? 'bg-red-950/20 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)] scale-[1.02] ring-1 ring-red-500/40 text-white' 
              : 'bg-[#015D2F]/20 border-yellow-400 shadow-[0_0_15px_rgba(255,253,72,0.15)] scale-[1.02] ring-1 ring-yellow-400/40 text-white'))
    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200';
  return (
    <section className="bg-neutral-955 border-b border-neutral-904 p-6 lg:p-8 relative" id="activation-calendar">
      <div className="w-full max-w-full space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <Calendar className={`${textClr} w-6 h-6 shrink-0`} />
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-tight flex items-center gap-2">
                <span>Calendario de Activaciones — Connection Plan</span>
                <span className={`text-[9px] ${accentBgBadge} px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider`}>
                  {contentType === 'email' ? 'Mails' : 'Landings'}
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
            className={`absolute left-[-18px] z-15 bg-neutral-900/95 text-neutral-400 border border-neutral-850 p-2.5 rounded-full cursor-pointer transition-all duration-200 shadow-xl flex items-center justify-center pointer-events-auto ${textHoverClr}`}
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
                  onClick={() => setSelectedCalIndex(idx)}
                  className={`shrink-0 w-48 p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden ${customCalItemStyle(isSelected)}`}
                >
                  {/* Confirmation Overlay for deleting */}
                  {deleteConfirmIdx === idx && (
                    <div 
                      className="absolute inset-0 bg-neutral-950/95 z-20 flex flex-col items-center justify-center p-3 text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 className="w-6 h-6 text-red-500 mb-1.5 animate-bounce" />
                      <p className="text-[10px] text-red-400 font-bold uppercase tracking-wider mb-2">¿Descartar hito?</p>
                      <div className="flex items-center space-x-1.5 w-full">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            confirmDeletePreset(idx);
                          }}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white text-[9px] font-black uppercase tracking-wider py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          Sí
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirmIdx(null);
                          }}
                          className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[9px] font-bold uppercase tracking-wider py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          No
                        </button>
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-black block ${isSelected ? textClr : 'text-white'}`}>
                        {cal.date}
                      </span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded leading-none uppercase font-bold ${
                        cal.type === 'Matchday' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/40' :
                        cal.type === 'A/B Test' ? 'bg-yellow-950 text-[#fffd48] border border-yellow-905-40' :
                        cal.type === 'Engagement' ? 'bg-pink-950 text-pink-400 border border-pink-900/40' :
                        cal.type === 'Ruta' ? 'bg-orange-950 text-orange-400 border border-orange-900/40' :
                        'bg-neutral-800 text-neutral-300'
                      }`}>
                        {contentType === 'email' ? 'MAIL' : 'LANDING'} • {cal.type}
                      </span>
                    </div>
                    <span className="text-[10px] text-neutral-500 block font-mono">{cal.day}</span>
                    <p className={`text-[11.5px] font-bold mt-2 line-clamp-1 ${isSelected ? 'text-white' : 'text-neutral-200'}`}>
                      {cal.eventName}
                    </p>
                  </div>

                  {/* Indicators & Discard Button */}
                  <div className="mt-3 pt-2 border-t border-neutral-800 flex items-center justify-between text-[9px] font-bold uppercase tracking-wider">
                    <span className={isSelected ? textClr : 'text-neutral-500'}>
                      {isSelected ? 'Seleccionado' : 'Ver Estructura'}
                    </span>
                    <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={(e) => handleDeletePresetClick(idx, e)}
                        className="p-1 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-all duration-150"
                        title="Descartar activación"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <ChevronRight className={`w-3 h-3 transition-transform ${isSelected ? `rotate-90 ${textClr}` : 'text-neutral-500'}`} />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Creator button card inside the scrollable view */}
            <div 
              onClick={() => setShowAddPresetModal(true)}
              className={`shrink-0 w-48 p-4 bg-neutral-900/40 hover:bg-neutral-900/80 border border-dashed border-neutral-800 text-neutral-400 hover:text-white rounded-xl transition-all duration-200 cursor-pointer flex flex-col justify-center items-center text-center space-y-2 group select-none shadow-md hover:${accentBorderClr}`}
            >
              <PlusCircle className={`w-8 h-8 ${textClr} group-hover:scale-110 transition-transform duration-200`} />
              <span className="text-xs font-black uppercase tracking-wider block">{contentType === 'email' ? 'Añadir Correo' : 'Añadir Landing'}</span>
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
            className={`absolute right-[-18px] z-15 bg-neutral-900/95 text-neutral-400 border border-neutral-850 p-2.5 rounded-full cursor-pointer transition-all duration-200 shadow-xl flex items-center justify-center pointer-events-auto ${textHoverClr}`}
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
                  <span className={`text-xs font-black ${textClr} font-mono tracking-widest uppercase`}>
                    Plan de Conexión • {presets[selectedCalIndex].date} ({presets[selectedCalIndex].day})
                  </span>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    presets[selectedCalIndex].type === 'Matchday' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/40' :
                    presets[selectedCalIndex].type === 'A/B Test' ? `${bgOutlineClr} border border-neutral-800` :
                    presets[selectedCalIndex].type === 'Engagement' ? 'bg-pink-950 text-pink-400 border border-pink-900/40' :
                    presets[selectedCalIndex].type === 'Ruta' ? 'bg-orange-950 text-orange-400 border border-orange-900/40' :
                    'bg-neutral-800 text-neutral-300'
                  }`}>
                    {contentType === 'email' ? 'MAIL' : 'LANDING'} • {presets[selectedCalIndex].type}
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
                  className={`${isJW ? 'bg-amber-950/20 hover:bg-amber-950/40 text-amber-500 border border-amber-500/20' : (isSmirnoff ? 'bg-red-950/20 hover:bg-red-950/40 text-red-400 border border-red-500/20' : 'bg-amber-950/20 hover:bg-amber-950/40 text-[#fffd48] border border-amber-500/20')} px-4 py-3 rounded-xl transition-all focus:outline-none flex items-center space-x-2 cursor-pointer uppercase text-[10px] sm:text-xs font-bold tracking-wider`}
                >
                  <Save className={`w-4 h-4 ${textClr}`} />
                  <span>Guardar Cambios Cliente</span>
                </button>

                {/* Instant Application to Workspace Action */}
                <button
                  type="button"
                  onClick={() => handleApplyPreset(selectedCalIndex)}
                  className={`${isJW ? 'bg-[#0033A0] hover:bg-[#0033A0]/80 text-[#C5A059] border border-amber-600/40' : (isSmirnoff ? 'bg-red-650 hover:bg-red-600 text-white border-red-750' : 'bg-[#015D2F] hover:bg-[#015D2F]/80 text-[#fffd48] border border-emerald-600/43')} text-xs font-black px-4 py-3 rounded-xl shadow-lg hover:shadow-neutral-900/45 transition-all flex items-center space-x-2 cursor-pointer uppercase tracking-wider`}
                >
                  <Sparkles className="w-4 h-4" />
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
                      <span className={`text-[10px] ${textClr} font-mono uppercase tracking-wider block font-bold`}>Estrategia Informativa • Recurso 1</span>
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
                            <span className={`w-3 h-3 border-2 border-dashed border-neutral-400 border-t-${isJW ? '[#C5A059]' : (isSmirnoff ? 'red-500' : 'yellow-400')} rounded-full animate-spin`}></span>
                            <span>Generando...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className={`w-3.5 h-3.5 ${textClr} animate-pulse`} />
                            <span>Nuevas Opciones con IA</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleApplyHeaderToEditor}
                        className={`${isJW ? 'bg-amber-950/25 hover:bg-amber-950/45 text-amber-450 border border-amber-500/35' : (isSmirnoff ? 'bg-red-950/25 hover:bg-red-950/45 text-red-400 border border-red-500/30' : 'bg-[#015D2F]/25 hover:bg-[#015D2F]/45 text-[#fffd48] border border-emerald-500/30')} px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer select-none`}
                      >
                        <Check className={`w-3.5 h-3.5 ${textClr}`} />
                        <span>Aplicar al Constructor</span>
                      </button>
                    </div>
                  </div>

                  {/* Active Header content display */}
                  <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 relative group overflow-hidden">
                    <div className={`absolute top-0 left-0 w-1 h-full ${bgClr}`}></div>
                    <p className="text-xs sm:text-sm font-black text-white leading-snug">
                      "{activeMarketingOptions.headerOptions[headerSliderIdx]}"
                    </p>
                  </div>

                  {/* Slider section */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[9px] text-neutral-500 font-mono uppercase">
                      <span>Llamativo / Directo</span>
                      <span className={`${textClr} font-semibold`}>Alternativa {headerSliderIdx + 1} de 3</span>
                      <span>Cercano / Social</span>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        type="range"
                        min="0"
                        max="2"
                        value={headerSliderIdx}
                        onChange={(e) => setHeaderSliderIdx(Number(e.target.value))}
                        className={`w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer focus:outline-none ${isJW ? 'accent-amber-500' : (isSmirnoff ? 'accent-red-500' : 'accent-yellow-400')}`}
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
                                ? `${bgClr} text-black font-black` 
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
                        <span className={`text-[10px] ${textClr} font-mono uppercase tracking-wider block font-bold`}>Estrategia de Contenido • Recurso 2</span>
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
                            <span className={`w-3 h-3 border-2 border-dashed border-neutral-400 border-t-${isJW ? '[#C5A059]' : (isSmirnoff ? 'red-500' : 'yellow-400')} rounded-full animate-spin`}></span>
                            <span>Generando...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className={`w-3.5 h-3.5 ${textClr} animate-pulse`} />
                            <span>Nuevas Opciones con IA</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleApplyCopiesToEditor}
                        className={`${isJW ? 'bg-amber-950/25 hover:bg-amber-950/45 text-amber-450 border border-amber-500/35' : (isSmirnoff ? 'bg-red-950/25 hover:bg-red-950/45 text-red-400 border border-red-500/30' : 'bg-[#015D2F]/25 hover:bg-[#015D2F]/45 text-[#fffd48] border border-emerald-500/30')} px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer select-none`}
                      >
                        <Check className={`w-3.5 h-3.5 ${textClr}`} />
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
                        <span className={`text-[8px] ${isSmirnoff ? 'text-red-400 bg-red-950/20' : 'text-[#015D2F] bg-emerald-400/20'} px-1.5 rounded font-mono uppercase font-bold leading-none`}>Cuerpo</span>
                      </div>
                      <p className="text-[11px] text-neutral-200 leading-relaxed italic select-all select-all">
                        "{activeMarketingOptions.copyOptions[copySliderIdx]?.long}"
                      </p>
                    </div>

                    {/* Short Copy box */}
                    <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-805 space-y-2 relative">
                      <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
                        <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider block">Borrador Copy Corto</span>
                        <span className={`text-[8px] ${textClr} ${bgOutlineClr} px-1.5 rounded font-mono uppercase font-bold leading-none`}>Entregador</span>
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
                      <span className={`${isSmirnoff ? 'text-red-400' : 'text-emerald-400'} font-semibold uppercase tracking-wider`}>Alineación de Tono {copySliderIdx + 1} de 3</span>
                      <span>DIGITAL / CORPORATIVO</span>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        type="range"
                        min="0"
                        max="2"
                        value={copySliderIdx}
                        onChange={(e) => setCopySliderIdx(Number(e.target.value))}
                        className={`w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer ${isJW ? 'accent-amber-500 focus:outline-[#C5A059]' : (isSmirnoff ? 'accent-red-500 focus:outline-red-550' : 'accent-emerald-500 focus:outline-[#015D2F]')}`}
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
                                ? (isJW ? 'bg-[#C5A059] text-[#000040] font-black' : (isSmirnoff ? 'bg-red-500 text-white font-black' : 'bg-[#015D2F] text-[#fffd48] border border-emerald-600/40 font-black'))
                                : 'bg-[#0e0e0e] border border-neutral-850 text-neutral-400 hover:text-white'
                            }`}
                          >
                            {opt?.label || ''}
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
                      <span className={`text-[10px] ${textClr} font-mono uppercase tracking-wider block font-bold`}>Estrategia de Conversión • Recurso 3</span>
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
                            <span className={`w-3 h-3 border-2 border-dashed border-neutral-400 border-t-${isJW ? '[#C5A059]' : (isSmirnoff ? 'red-500' : 'yellow-400')} rounded-full animate-spin`}></span>
                            <span>Generando...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className={`w-3.5 h-3.5 ${textClr} animate-pulse`} />
                            <span>Nuevas Opciones con IA</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleApplyCtaToEditor}
                        className={`${isJW ? 'bg-amber-950/25 hover:bg-amber-950/45 text-amber-450 border border-amber-500/35' : (isSmirnoff ? 'bg-red-950/25 hover:bg-red-950/45 text-red-400 border border-red-500/30' : 'bg-[#015D2F]/25 hover:bg-[#015D2F]/45 text-[#fffd48] border border-emerald-500/30')} px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer select-none`}
                      >
                        <Check className={`w-3.5 h-3.5 ${textClr}`} />
                        <span>Aplicar al Constructor</span>
                      </button>
                    </div>
                  </div>

                  {/* Active CTA Display */}
                  <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="text-neutral-500 font-mono text-[9px] uppercase font-bold block">Botón Sugerido:</span>
                      <span className={`${accentBgBadge} px-3 py-1 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wider border ${isSmirnoff ? 'border-red-600 shadow-sm' : 'border-yellow-500 shadow-sm'} block`}>
                        {activeMarketingOptions.ctaOptions[ctaSliderIdx]}
                      </span>
                    </div>
                    <span className="text-[8px] text-neutral-500 italic font-mono hidden sm:inline leading-none">Premium Layout Ready</span>
                  </div>

                  {/* CTA Slider Controls */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[9px] text-neutral-500 font-mono">
                      <span>Conversión en Casa</span>
                      <span className={`${textClr} font-semibold`}>Táctica CTA {ctaSliderIdx + 1} de 3</span>
                      <span>Lugar Físico / Ruta</span>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        type="range"
                        min="0"
                        max="2"
                        value={ctaSliderIdx}
                        onChange={(e) => setCtaSliderIdx(Number(e.target.value))}
                        className={`w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer focus:outline-none ${isSmirnoff ? 'accent-red-500' : 'accent-yellow-400'}`}
                      />
                    </div>

                    {/* Quick Segment buttons */}
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
                                ? `${bgClr} ${isSmirnoff ? 'text-white' : 'text-black'} font-black` 
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
                  <span className={`w-1.5 h-1.5 rounded-full ${bgClr}`}></span>
                  <span>Estructura de Bloques Recomendada</span>
                </h5>

                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-850 space-y-3">
                  <span className="text-[10px] text-neutral-500 font-bold uppercase block">Estructura del Artefato</span>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2.5 bg-neutral-900 px-3 py-2 rounded border border-neutral-800 text-[11px] text-neutral-400">
                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-neutral-950 text-neutral-500 font-mono text-[9px]">1</span>
                      <span>{contentType === 'landing' ? "Cabecera Web / Navbar (Fijo)" : `Cabecera Logo ${isJW ? "Johnnie Walker Blue" : isSmirnoff ? "Smirnoff" : "Buchanan's"} (Fijo)`}</span>
                    </div>

                    {presets[selectedCalIndex].editorVariables.blocks.map((block, bIdx) => (
                      <div 
                        key={block.id} 
                        className={`flex items-center space-x-2.5 bg-[#0a0a0a] px-3 py-2 rounded border ${isJW ? 'border-amber-900/20' : (isSmirnoff ? 'border-red-900/10' : 'border-emerald-900/20')} text-[11px]`}
                      >
                        <span className={`w-5 h-5 flex items-center justify-center rounded-full ${isJW ? 'bg-amber-500/20' : (isSmirnoff ? 'bg-red-500/20' : 'bg-[#015D2F]/30')} ${textClr} font-mono font-bold text-[9px]`}>{bIdx + 2}</span>
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
                      <div className={`flex items-center space-x-2.5 bg-neutral-950/20 border-yellow-500/20 px-3 py-2 rounded border text-[11px]`}>
                        <span className={`w-5 h-5 flex items-center justify-center rounded-full bg-neutral-950 ${textClr} font-mono font-bold text-[9px]`}>{presets[selectedCalIndex].editorVariables.blocks.length + 2}</span>
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
                    <span className={`${textClr} font-mono font-bold`}>
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
  );
};
