import { Palette, Check, Sparkles, Compass } from 'lucide-react';
import { StylePreset } from '../types';
import { STYLE_PRESETS } from '../presets';

interface StyleEngineProps {
  selectedPresetId: string;
  onSelectPreset: (id: string) => void;
}

export default function StyleEngine({ selectedPresetId, onSelectPreset }: StyleEngineProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-6 text-slate-100" id="style-engine-panel">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-purple-500/10 text-purple-400 rounded-lg">
            <Palette size={18} />
          </div>
          <h3 className="text-md font-semibold tracking-tight">Valkyrie Style Engine</h3>
        </div>
        <span className="text-xs text-purple-400 font-medium">Presets Premium</span>
      </div>

      <p className="text-xs text-slate-400 mb-4 leading-relaxed">
        Cada preset de diseño recalcula automáticamente la tipografía, los pesos de cabecera, la paleta cromática de fondo y CTA, la curvatura de los botones (border-radius) y las velocidades del scroll inmersivo.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
        {STYLE_PRESETS.map((preset) => {
          const isSelected = preset.id === selectedPresetId;
          return (
            <div
              key={preset.id}
              onClick={() => onSelectPreset(preset.id)}
              className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all duration-200 group relative ${
                isSelected
                  ? 'border-purple-500 bg-purple-500/5 ring-1 ring-purple-500/30'
                  : 'border-slate-800 bg-slate-950/20 hover:border-slate-700 hover:bg-slate-950/40'
              }`}
              id={`preset-card-${preset.id}`}
            >
              {isSelected && (
                <div className="absolute top-2.5 right-2.5 bg-purple-500 text-slate-950 p-0.5 rounded-full">
                  <Check size={12} strokeWidth={3} />
                </div>
              )}

              <div className="flex flex-col h-full justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    {preset.name}
                    {preset.usesDarkTheme && (
                      <span className="text-[9px] bg-slate-800 px-1 py-0.5 rounded text-zinc-400 font-mono">
                        Dark
                      </span>
                    )}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-1 lines-clamp-2 leading-relaxed">
                    {preset.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-slate-500 truncate" style={{ fontFamily: preset.typography.heading }}>
                    {preset.typography.heading} & {preset.typography.body}
                  </span>
                  
                  {/* Visual Color Balls Preview */}
                  <div className="flex items-center -space-x-1.5 shrink-0">
                    <span 
                      className="w-3.5 h-3.5 rounded-full border border-slate-950/40" 
                      style={{ backgroundColor: preset.colors.primary }}
                      title="Primario"
                    />
                    <span 
                      className="w-3.5 h-3.5 rounded-full border border-slate-950/40" 
                      style={{ backgroundColor: preset.colors.accent }}
                      title="Acento"
                    />
                    <span 
                      className="w-3.5 h-3.5 rounded-full border border-slate-950/40" 
                      style={{ backgroundColor: preset.colors.background }}
                      title="Fondo"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-2.5 bg-purple-500/5 border border-purple-500/10 rounded-lg flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Compass className="text-purple-400" size={14} />
          <span className="text-slate-300 font-medium text-[11px]">¿No sabes qué elegir?</span>
        </div>
        <button 
          onClick={() => {
            const index = Math.floor(Math.random() * STYLE_PRESETS.length);
            onSelectPreset(STYLE_PRESETS[index].id);
          }}
          className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
        >
          Mezcla Aleatoria
        </button>
      </div>
    </div>
  );
}
