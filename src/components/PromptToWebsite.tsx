import { useState } from 'react';
import { Sliders, Wrench, Sparkles, MessageSquare, Briefcase, Phone, Mail, MapPin } from 'lucide-react';

interface PromptToWebsiteProps {
  businessName: string;
  setBusinessName: (val: string) => void;
  businessType: string;
  setBusinessType: (val: string) => void;
  targetObjective: string;
  setTargetObjective: (val: string) => void;
  prompt: string;
  setPrompt: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  whatsapp: string;
  setWhatsapp: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  address: string;
  setAddress: (val: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export default function PromptToWebsite({
  businessName,
  setBusinessName,
  businessType,
  setBusinessType,
  targetObjective,
  setTargetObjective,
  prompt,
  setPrompt,
  phone,
  setPhone,
  whatsapp,
  setWhatsapp,
  email,
  setEmail,
  address,
  setAddress,
  onGenerate,
  isGenerating,
}: PromptToWebsiteProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const businessPills = [
    { label: 'Restaurante de Autor', type: 'restaurante gourmet, carta de platos' },
    { label: 'Clínica Médica', type: 'clínica dental, fisioterapia y medicina estética' },
    { label: 'Barbería / Spa', type: 'rituales de afeitado, cortes clásicos y estética' },
    { label: 'Abogado de Negocios', type: 'abogado de empresa, consultoría legal' },
    { label: 'Fotografía Creativa', type: 'fotógrafo premium de bodas y moda' },
    { label: 'Coach / Fitness', type: 'entrenador personal de alto impacto' },
  ];

  const objectivePills = [
    'Conseguir leads por formulario',
    'Cerrar citas y reservas directas',
    'Mensajes inmediatos por WhatsApp',
    'Llamadas telefónicas de clientes',
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-6 text-slate-100" id="prompt-panel">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-blue-500/10 text-blue-400 rounded-lg">
          <Sliders size={18} />
        </div>
        <h3 className="text-md font-semibold tracking-tight">Valkyrie Prompt-to-Website</h3>
      </div>

      <div className="space-y-4">
        {/* Row 1: Nombre de negocio y Categoría */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">Nombre del Negocio</label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Ej: Nobu, Clínica Dental Almería, Barber Elite"
              className="bg-slate-950 border border-slate-850 focus:border-blue-500 rounded px-3.5 py-2 text-sm text-slate-100 focus:outline-none transition-colors"
              id="business-name-input"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">Tipo de Negocio o Sector</label>
            <input
              type="text"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              placeholder="Ej: restaurante, centro estético, fisioterapia"
              className="bg-slate-950 border border-slate-850 focus:border-blue-500 rounded px-3.5 py-2 text-sm text-slate-100 focus:outline-none transition-colors"
              id="business-type-input"
            />
          </div>
        </div>

        {/* Quick business suggestion pills */}
        <div className="flex flex-wrap gap-1.5">
          {businessPills.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => {
                setBusinessName(p.label);
                setBusinessType(p.type);
              }}
              className="text-[10px] font-medium bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-750 rounded px-2.5 py-1 transition-all"
            >
              + {p.label}
            </button>
          ))}
        </div>

        {/* Brand objective inputs */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-300">Objetivo Conversión Principal</label>
          <input
            type="text"
            value={targetObjective}
            onChange={(e) => setTargetObjective(e.target.value)}
            placeholder="Ej: Reservar mesa privada, solicitar llamada estratégica de 15 minutos"
            className="bg-slate-950 border border-slate-850 focus:border-blue-500 rounded px-3.5 py-2 text-sm text-slate-100 focus:outline-none transition-colors"
          />
          <div className="flex flex-wrap gap-1.5 mt-1">
            {objectivePills.map((pill) => (
              <button
                key={pill}
                type="button"
                onClick={() => setTargetObjective(pill)}
                className="text-[10px] font-medium bg-slate-950 hover:bg-slate-850 text-slate-400 border border-slate-850 px-2 py-0.5 rounded transition-all"
              >
                {pill}
              </button>
            ))}
          </div>
        </div>

        {/* Contact credentials section */}
        <div className="pt-2 border-t border-slate-800/45">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5"
          >
            <Wrench size={12} />
            {showAdvanced ? 'Ocultar Canales de Contacto' : 'Configurar Teléfono, WhatsApp y Dirección (Recomendado)'}
          </button>

          {showAdvanced && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 animate-fade-in">
              <div className="flex items-center gap-2 bg-slate-950/40 border border-slate-850 rounded px-3 py-1.5">
                <Phone size={14} className="text-slate-400" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Teléfono Fijo"
                  className="bg-transparent border-none text-xs text-slate-100 focus:outline-none w-full"
                />
              </div>

              <div className="flex items-center gap-2 bg-slate-950/40 border border-slate-850 rounded px-3 py-1.5">
                <MessageSquare size={14} className="text-green-400" />
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="Número WhatsApp (ej: +34600123456)"
                  className="bg-transparent border-none text-xs text-slate-100 focus:outline-none w-full"
                />
              </div>

              <div className="flex items-center gap-2 bg-slate-950/40 border border-slate-850 rounded px-3 py-1.5 block sm:col-span-1">
                <Mail size={14} className="text-slate-400" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email de reservas"
                  className="bg-transparent border-none text-xs text-slate-100 focus:outline-none w-full"
                />
              </div>

              <div className="flex items-center gap-2 bg-slate-950/40 border border-slate-850 rounded px-3 py-1.5 block sm:col-span-1">
                <MapPin size={14} className="text-slate-400" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Dirección Física (activará mapa)"
                  className="bg-transparent border-none text-xs text-slate-100 focus:outline-none w-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Master prompter text area */}
        <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-800/40">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Sparkles size={13} className="text-amber-400" />
              Especificaciones Adicionales y Colocación de Assets (Prompt)
            </label>
            <span className="text-[10px] text-slate-500">Ej: "Quiero el video como hero..."</span>
          </div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            placeholder="Escribe preferencias de copywriting, dónde quieres colocar cada imagen o vídeo subido, qué tono de marca usar (premium, jovial, corporativo sobrio), secciones que quieres eliminar..."
            className="w-full bg-slate-950 border border-slate-850 focus:border-blue-500 rounded px-3.5 py-2 text-xs text-slate-100 focus:outline-none leading-relaxed transition-colors resize-y font-sans"
            id="prompt-textarea"
          />
        </div>

        {/* Main Generate Button */}
        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating || !businessName}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
            isGenerating || !businessName
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-400 text-slate-950 shadow-md shadow-blue-500/10'
          }`}
          id="generate-website-btn"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>Redactando Textos, Generando Estilos y Analizando Assets...</span>
            </>
          ) : (
            <>
              <Sparkles size={16} />
              <span>FORJAR SITIO WEB DE ALTA CONVERSIÓN</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
