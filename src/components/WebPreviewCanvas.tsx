import { useState } from 'react';
import { 
  Monitor, Smartphone, HelpCircle, Check, Sparkles, MessageSquare, 
  Send, Shield, Heart, Scissors, UtensilsCrossed, Briefcase, 
  ChefHat, Activity, Compass, Play, Copy, ExternalLink, RefreshCw, ZoomIn, Eye, MapPin 
} from 'lucide-react';
import { GeneratedWebsite, StylePreset, SectionContent, Asset } from '../types';

interface WebPreviewCanvasProps {
  website: GeneratedWebsite;
  assets: Asset[];
  onUpdateWebsite: (updated: GeneratedWebsite) => void;
  history: Array<{ id: string; timestamp: string; promptUsed: string; website: GeneratedWebsite }>;
  onRestoreVersion: (id: string) => void;
}

export default function WebPreviewCanvas({ website, assets, onUpdateWebsite, history, onRestoreVersion }: WebPreviewCanvasProps) {
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'preview' | 'seo' | 'schema' | 'history'>('preview');
  const [copiedSchema, setCopiedSchema] = useState(false);
  
  // Local Booking Form simulation state
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Directly edit sections content
  const handleDirectEdit = (sectionId: string, field: 'title' | 'description' | 'subtitle', value: string) => {
    const updatedSections = website.sections.map((s) => {
      if (s.id === sectionId) {
        return { ...s, [field]: value };
      }
      return s;
    });
    onUpdateWebsite({ ...website, sections: updatedSections });
  };

  const handleEditItem = (sectionId: string, itemIndex: number, field: 'title' | 'description', value: string) => {
    const updatedSections = website.sections.map((s) => {
      if (s.id === sectionId && s.items) {
        const updatedItems = [...s.items];
        updatedItems[itemIndex] = { ...updatedItems[itemIndex], [field]: value };
        return { ...s, items: updatedItems };
      }
      return s;
    });
    onUpdateWebsite({ ...website, sections: updatedSections });
  };

  const copySchemaToClipboard = () => {
    navigator.clipboard.writeText(website.schemaMarkup || '');
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  // Helper to dynamically render a suited icon by string
  const renderServiceIcon = (name?: string) => {
    const icons: Record<string, any> = {
      Scissors, UtensilsCrossed, Briefcase, ChefHat, Activity, Compass, Sparkles, Heart
    };
    const Component = (name && icons[name]) ? icons[name] : Sparkles;
    return <Component size={20} className="text-secondary" style={{ color: website.preset.colors.primary }} />;
  };

  const formatPhoneNumber = (num: string) => {
    return num.replaceAll(' ', '').replaceAll('-', '');
  };

  const preset = website.preset;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-full text-slate-100" id="preview-canvas-card">
      
      {/* Top Controller Header */}
      <div className="bg-slate-950 px-5 py-3.5 border-b border-slate-850 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-0.5" id="viewport-toggle">
            <button
              onClick={() => setViewport('desktop')}
              className={`p-1.5 rounded transition-all ${viewport === 'desktop' ? 'bg-blue-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
              title="Vista de escritorio"
              id="viewport-desktop-btn"
            >
              <Monitor size={15} />
            </button>
            <button
              onClick={() => setViewport('mobile')}
              className={`p-1.5 rounded transition-all ${viewport === 'mobile' ? 'bg-blue-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
              title="Vista móvil cuidada"
              id="viewport-mobile-btn"
            >
              <Smartphone size={15} />
            </button>
          </div>
          
          <span className="text-xs text-slate-400 truncate max-w-[150px] font-mono hidden sm:inline">
            URL Preview: <span className="text-blue-400">siteforge.pro/preview</span>
          </span>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-slate-900/50 border border-slate-800 rounded-lg p-0.5 text-xs">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1.5 rounded font-medium transition-all ${activeTab === 'preview' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            id="tab-preview-btn"
          >
            Web en Vivo
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`px-3 py-1.5 rounded font-medium transition-all ${activeTab === 'seo' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            id="tab-seo-btn"
          >
            SEO Auditoría
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-3 py-1.5 rounded font-medium transition-all ${activeTab === 'schema' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            id="tab-schema-btn"
          >
            Schema JSON
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded font-medium transition-all ${activeTab === 'history' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            id="tab-history-btn"
          >
            Historial ({history.length})
          </button>
        </div>
      </div>

      {/* Main Canvas Scroll Area */}
      <div className="flex-1 overflow-y-auto bg-slate-950 p-4 min-h-[500px]">
        {activeTab === 'preview' && (
          <div className="flex justify-center transition-all duration-300">
            <div 
              style={{ 
                fontFamily: preset.typography.body,
                backgroundColor: preset.colors.background,
                color: preset.colors.textPrimary
              }}
              className={`transition-all duration-300 relative border border-slate-800 shadow-2xl bg-white ${
                viewport === 'desktop' ? 'w-full max-w-5xl rounded-lg' : 'w-[375px] rounded-2.5xl min-h-[700px]'
              }`}
            >
              {/* Import preset Google Font */}
              <style dangerouslySetInnerHTML={{ __html: `@import url('${preset.typography.importUrl}');` }} />

              {/* FLOATING WHATSAPP BUTTON */}
              {website.whatsapp && (
                <a
                  href={`https://wa.me/${formatPhoneNumber(website.whatsapp)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center"
                  style={{ borderRadius: preset.borderRadius === 'rounded-none' ? '0px' : '9999px' }}
                >
                  <MessageSquare size={22} fill="white" />
                  <span className="w-2 h-2 bg-red-500 rounded-full absolute top-1 right-1 animate-ping" />
                </a>
              )}

              {/* NAV BAR */}
              <header className="border-b sticky top-0 bg-opacity-95 backdrop-blur-md z-40 px-6 py-4 flex items-center justify-between" style={{ borderColor: preset.colors.border, backgroundColor: preset.colors.cardBg }}>
                <div className="flex items-center gap-2">
                  {assets.find(a => a.role === 'logo') ? (
                    <img src={assets.find(a => a.role === 'logo')?.url} alt="Logo" className="h-8 max-w-[120px] object-contain" referrerPolicy="no-referrer" />
                  ) : (
                    <span className="font-extrabold text-sm tracking-tight text-slate-900" style={{ fontFamily: preset.typography.heading, color: preset.colors.primary }}>
                      {website.businessName || 'SITE FORGE'}
                    </span>
                  )}
                </div>

                <nav className="hidden md:flex items-center gap-5 text-xs font-semibold uppercase tracking-wider" style={{ color: preset.colors.textSecondary }}>
                  <a href="#sec-services" className="hover:opacity-80 transition-opacity">Servicios</a>
                  <a href="#sec-about" className="hover:opacity-80 transition-opacity">Nosotros</a>
                  <a href="#sec-testimonials" className="hover:opacity-80 transition-opacity">Opiniones</a>
                  <a href="#sec-contact" className="hover:opacity-80 transition-opacity">Contacto</a>
                </nav>

                <a 
                  href="#sec-contact" 
                  className={`text-xs font-bold px-4 py-2 border transition-all ${preset.borderRadius} ${preset.shadow}`}
                  style={{ 
                    backgroundColor: preset.colors.primary, 
                    color: preset.usesDarkTheme ? '#ffffff' : '#fafafa',
                    borderColor: preset.colors.primary
                  }}
                >
                  Reservar
                </a>
              </header>

              {/* SECTIONS RENDER */}
              {website.sections.map((section, idx) => {
                const isHero = section.type === 'hero';
                const isAbout = section.type === 'about';
                const isServices = section.type === 'services';
                const isBenefits = section.type === 'benefits';
                const isGallery = section.type === 'gallery';
                const isProcess = section.type === 'process';
                const isTestimonial = section.type === 'testimonials';
                const isFaq = section.type === 'faqs';
                const isContact = section.type === 'contact';
                const isFooter = section.type === 'footer';
                const isLegal = section.type === 'legal';

                if (isHero) {
                  return (
                    <section 
                      key={section.id} 
                      className={`${preset.spacing.sectionPadding} px-6 relative flex flex-col justify-center border-b`}
                      style={{ borderColor: preset.colors.border }}
                      id={section.id}
                    >
                      {/* Interactive click-to-edit instructions */}
                      <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity bg-slate-900/90 text-white text-[9px] px-2 py-1 rounded">
                        <ZoomIn size={10} />
                        <span>Haz clic para editar texto directo</span>
                      </div>

                      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1 space-y-4">
                          <span className="text-xs uppercase tracking-widest font-bold" style={{ color: preset.colors.primary }}>
                            {website.businessName} • ÉLITE WEB
                          </span>
                          
                          {/* Direct Editable Title */}
                          <h1 
                            className="text-3xl md:text-5xl font-extrabold tracking-tight focus:outline-dashed focus:outline-2 focus:outline-blue-500 p-1"
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => handleDirectEdit(section.id, 'title', e.target.innerText)}
                            style={{ fontFamily: preset.typography.heading, color: preset.colors.textPrimary }}
                          >
                            {section.title}
                          </h1>

                          {/* Direct Editable Subtitle */}
                          <p 
                            className="text-sm md:text-md leading-relaxed focus:outline-dashed focus:outline-2 focus:outline-blue-500 p-1"
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => handleDirectEdit(section.id, 'subtitle', e.target.innerText)}
                            style={{ color: preset.colors.textSecondary }}
                          >
                            {section.subtitle}
                          </p>

                          {section.description && (
                            <p className="text-xs font-mono" style={{ color: preset.colors.accent }}>
                              {section.description}
                            </p>
                          )}

                          <div className="flex flex-wrap gap-3 pt-2">
                            {section.primaryCta && (
                              <a 
                                href={section.primaryCta.link}
                                className={`text-xs font-bold px-6 py-3 shadow transition-all ${preset.borderRadius} ${preset.shadow}`}
                                style={{ backgroundColor: preset.colors.primary, color: '#ffffff' }}
                              >
                                {section.primaryCta.text}
                              </a>
                            )}
                            {section.secondaryCta && (
                              <a 
                                href={section.secondaryCta.link}
                                className={`text-xs font-bold px-6 py-3 border transition-all ${preset.borderRadius}`}
                                style={{ borderColor: preset.colors.border, color: preset.colors.textPrimary }}
                              >
                                {section.secondaryCta.text}
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Interactive Hero Assets Container */}
                        {assets.some(a => a.role === 'hero') ? (
                          <div className="flex-1 relative aspect-video w-full rounded-xl overflow-hidden border" style={{ borderColor: preset.colors.border }}>
                            <img 
                              src={assets.find(a => a.role === 'hero')?.url} 
                              alt="Hero asset" 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          </div>
                        ) : (
                          <div className="flex-1 w-full bg-slate-100 hover:bg-slate-200/80 transition-colors h-48 sm:h-64 rounded-xl flex items-center justify-center border border-dashed text-slate-400 text-xs">
                            <span className="p-3 text-center">Asigna una imagen como "Hero" en Assets Studio para visualizar un banner premium aquí</span>
                          </div>
                        )}
                      </div>
                    </section>
                  );
                }

                if (isAbout) {
                  return (
                    <section 
                      key={section.id} 
                      className={`${preset.spacing.sectionPadding} px-6 border-b`}
                      style={{ borderColor: preset.colors.border, backgroundColor: preset.colors.cardBg }}
                      id={section.id}
                    >
                      <div className="max-w-3xl mx-auto text-center space-y-4">
                        <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: preset.colors.primary }}>
                          {section.subtitle || 'DIFERENCIA CLAVE'}
                        </span>
                        <h2 
                          className="text-2xl md:text-3xl font-extrabold tracking-tight"
                          style={{ fontFamily: preset.typography.heading, color: preset.colors.textPrimary }}
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => handleDirectEdit(section.id, 'title', e.target.innerText)}
                        >
                          {section.title}
                        </h2>
                        
                        <p 
                          className="text-sm leading-relaxed max-w-2xl mx-auto focus:outline-dashed focus:outline-2 focus:outline-blue-500 p-1"
                          style={{ color: preset.colors.textSecondary }}
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => handleDirectEdit(section.id, 'description', e.target.innerText)}
                        >
                          {section.description}
                        </p>
                      </div>
                    </section>
                  );
                }

                if (isServices) {
                  return (
                    <section 
                      key={section.id} 
                      className={`${preset.spacing.sectionPadding} px-6 border-b`}
                      style={{ borderColor: preset.colors.border }}
                      id={section.id}
                    >
                      <div className="max-w-5xl mx-auto space-y-8">
                        <div className="text-center space-y-2">
                          <h2 
                            className="text-2xl md:text-3xl font-bold tracking-tight"
                            style={{ fontFamily: preset.typography.heading, color: preset.colors.textPrimary }}
                          >
                            {section.title}
                          </h2>
                          <p className="text-xs" style={{ color: preset.colors.textSecondary }}>
                            {section.subtitle}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                          {section.items?.map((item, serviceIdx) => (
                            <div 
                              key={serviceIdx} 
                              className={`p-5 border transition-all ${preset.borderRadius}`}
                              style={{ borderColor: preset.colors.border, backgroundColor: preset.colors.cardBg }}
                            >
                              <div className="p-2 bg-slate-100 rounded-lg w-max mb-4" style={{ backgroundColor: `${preset.colors.primary}10` }}>
                                {renderServiceIcon(item.icon)}
                              </div>
                              
                              <h3 
                                className="text-sm font-extrabold focus:outline-dashed p-1"
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleEditItem(section.id, serviceIdx, 'title', e.target.innerText)}
                                style={{ color: preset.colors.textPrimary }}
                              >
                                {item.title}
                              </h3>
                              
                              <p 
                                className="text-xs leading-relaxed mt-2 focus:outline-dashed p-1"
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleEditItem(section.id, serviceIdx, 'description', e.target.innerText)}
                                style={{ color: preset.colors.textSecondary }}
                              >
                                {item.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  );
                }

                if (isBenefits) {
                  return (
                    <section 
                      key={section.id} 
                      className={`${preset.spacing.sectionPadding} px-6 border-b`}
                      style={{ borderColor: preset.colors.border, backgroundColor: preset.colors.cardBg }}
                      id={section.id}
                    >
                      <div className="max-w-4xl mx-auto">
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-center mb-8" style={{ fontFamily: preset.typography.heading }}>
                          {section.title}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {section.items?.map((benefit, bIdx) => (
                            <div key={bIdx} className="flex gap-3">
                              <div className="p-1.5 h-max rounded-full text-white" style={{ backgroundColor: preset.colors.primary }}>
                                <Check size={12} strokeWidth={3} />
                              </div>
                              <div>
                                <h4 className="text-xs font-bold" style={{ color: preset.colors.textPrimary }}>
                                  {benefit.title}
                                </h4>
                                <p className="text-[11px] leading-relaxed mt-1" style={{ color: preset.colors.textSecondary }}>
                                  {benefit.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  );
                }

                if (isGallery) {
                  return (
                    <section 
                      key={section.id} 
                      className={`${preset.spacing.sectionPadding} px-6 border-b`}
                      style={{ borderColor: preset.colors.border }}
                      id={section.id}
                    >
                      <div className="max-w-5xl mx-auto space-y-6">
                        <div className="text-center space-y-2">
                          <h2 className="text-2xl font-bold" style={{ fontFamily: preset.typography.heading }}>
                            {section.title}
                          </h2>
                          <p className="text-xs" style={{ color: preset.colors.textSecondary }}>
                            {section.subtitle}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {section.items?.map((gItem, gIdx) => (
                            <div 
                              key={gIdx} 
                              className={`group relative aspect-square bg-slate-100 overflow-hidden border ${preset.borderRadius}`}
                              style={{ borderColor: preset.colors.border }}
                            >
                              <img 
                                src={gItem.image} 
                                alt={gItem.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent text-white p-3 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                <h4 className="text-xs font-bold truncate">{gItem.title}</h4>
                                <p className="text-[9px] text-slate-300 truncate">{gItem.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  );
                }

                if (isProcess) {
                  return (
                    <section 
                      key={section.id} 
                      className={`${preset.spacing.sectionPadding} px-6 border-b`}
                      style={{ borderColor: preset.colors.border }}
                      id={section.id}
                    >
                      <div className="max-w-4xl mx-auto space-y-8">
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-center" style={{ fontFamily: preset.typography.heading }}>
                          {section.title}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                          {section.items?.map((step, sIdx) => (
                            <div key={sIdx} className="relative z-10 p-5 bg-opacity-40 backdrop-blur-md rounded-lg space-y-2 text-center" style={{ backgroundColor: preset.colors.cardBg }}>
                              <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center mx-auto text-xs font-bold" style={{ backgroundColor: preset.colors.primary }}>
                                0{sIdx + 1}
                              </span>
                              <h4 className="text-xs font-bold" style={{ color: preset.colors.textPrimary }}>
                                {step.title}
                              </h4>
                              <p className="text-[11px] leading-relaxed" style={{ color: preset.colors.textSecondary }}>
                                {step.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  );
                }

                if (isTestimonial) {
                  return (
                    <section 
                      key={section.id} 
                      className={`${preset.spacing.sectionPadding} px-6 border-b`}
                      style={{ borderColor: preset.colors.border, backgroundColor: preset.colors.cardBg }}
                      id={section.id}
                    >
                      <div className="max-w-4xl mx-auto space-y-6">
                        <div className="text-center">
                          <h2 className="text-xl md:text-2xl font-bold" style={{ fontFamily: preset.typography.heading }}>
                            {section.title}
                          </h2>
                          <p className="text-xs" style={{ color: preset.colors.textSecondary }}>{section.subtitle}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {section.items?.map((testi, tIdx) => (
                            <div 
                              key={tIdx} 
                              className={`p-5 border flex flex-col justify-between ${preset.borderRadius} ${preset.shadow}`}
                              style={{ borderColor: preset.colors.border, backgroundColor: preset.colors.background }}
                            >
                              <p className="text-xs leading-relaxed italic" style={{ color: preset.colors.textSecondary }}>
                                "{testi.description}"
                              </p>
                              
                              <div className="mt-4 pt-3 border-t flex items-center justify-between" style={{ borderColor: preset.colors.border }}>
                                <span className="text-xs font-bold" style={{ color: preset.colors.textPrimary }}>
                                  {testi.title}
                                </span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded text-slate-500" style={{ backgroundColor: `${preset.colors.primary}15`, color: preset.colors.primary }}>
                                  {testi.badge}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  );
                }

                if (isFaq) {
                  return (
                    <section 
                      key={section.id} 
                      className={`${preset.spacing.sectionPadding} px-6 border-b`}
                      style={{ borderColor: preset.colors.border }}
                      id={section.id}
                    >
                      <div className="max-w-2xl mx-auto space-y-6">
                        <h2 className="text-xl md:text-2xl font-bold text-center" style={{ fontFamily: preset.typography.heading }}>
                          {section.title}
                        </h2>

                        <div className="space-y-3.5">
                          {section.items?.map((faq, fIdx) => (
                            <div 
                              key={fIdx} 
                              className={`p-4 border ${preset.borderRadius}`}
                              style={{ borderColor: preset.colors.border, backgroundColor: preset.colors.cardBg }}
                            >
                              <h4 className="text-xs font-bold" style={{ color: preset.colors.textPrimary }}>
                                {faq.title}
                              </h4>
                              <p className="text-xs leading-relaxed mt-1.5" style={{ color: preset.colors.textSecondary }}>
                                {faq.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  );
                }

                if (isContact) {
                  return (
                    <section 
                      key={section.id} 
                      className={`${preset.spacing.sectionPadding} px-6 border-b bg-stone-50/10`}
                      style={{ borderColor: preset.colors.border, backgroundColor: preset.colors.cardBg }}
                      id={section.id}
                    >
                      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <h2 className="text-2xl font-black tracking-tight" style={{ fontFamily: preset.typography.heading, color: preset.colors.textPrimary }}>
                            {section.title}
                          </h2>
                          <p className="text-xs leading-relaxed" style={{ color: preset.colors.textSecondary }}>
                            {section.subtitle || section.description}
                          </p>

                          {/* Render Active dynamic Google Maps fallback frame */}
                          <div className="pt-2">
                            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Ubicación Registrada</span>
                            <div className="w-full h-36 bg-slate-900 border rounded-lg overflow-hidden mt-1.5 relative flex items-center justify-center p-3 text-center" style={{ borderColor: preset.colors.border }}>
                              <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
                              <div className="relative z-10 space-y-1">
                                <MapPin size={18} className="mx-auto text-amber-500" />
                                <p className="text-xs font-bold text-white">{website.address || 'Calle Principal, 40'}</p>
                                <p className="text-[9px] text-slate-400">Puntero georreferenciado verificado (No requiere clave de mapas)</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Form Component */}
                        <div className="bg-white p-5 border shadow-sm rounded-xl relative" style={{ borderColor: preset.colors.border, backgroundColor: preset.colors.background }}>
                          {formSubmitted ? (
                            <div className="space-y-4 py-8 text-center animate-fade-in">
                              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                <Check size={20} strokeWidth={3} />
                              </div>
                              <h3 className="text-sm font-bold text-slate-900">¡Garantía de Conversión Activada!</h3>
                              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                                Hemos registrado el lead de pruebas de forma local. En producción, enviará un aviso inmediato con los datos completados a {website.email || 'tu-email@negocio.com'}.
                              </p>
                              <button 
                                onClick={() => { setFormSubmitted(false); setFormData({ name: '', phone: '', email: '', message: '' }); }}
                                className="text-xs font-semibold text-blue-500 hover:underline"
                              >
                                Enviar otra respuesta clínica/mesa
                              </button>
                            </div>
                          ) : (
                            <form 
                              onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }}
                              className="space-y-3"
                            >
                              <div>
                                <label className="text-[10px] font-bold uppercase tracking-wide block" style={{ color: preset.colors.textSecondary }}>Nombre Completo</label>
                                <input 
                                  type="text" 
                                  required
                                  value={formData.name}
                                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                  placeholder="Ej: Daniel Sánchez" 
                                  className="w-full bg-slate-50 border text-xs px-3 py-2 rounded focus:outline-none focus:border-blue-500 mt-1"
                                  style={{ borderColor: preset.colors.border, color: preset.colors.textPrimary }}
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="text-[10px] font-bold uppercase tracking-wide block" style={{ color: preset.colors.textSecondary }}>Teléfono Móvil</label>
                                  <input 
                                    type="text" 
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="Ej: 600123456" 
                                    className="w-full bg-slate-50 border text-xs px-3 py-2 rounded focus:outline-none focus:border-blue-500 mt-1"
                                    style={{ borderColor: preset.colors.border, color: preset.colors.textPrimary }}
                                  />
                                </div>
                                <div>
                                  <label className="text-[10px] font-bold uppercase tracking-wide block" style={{ color: preset.colors.textSecondary }}>Correo Electrónico</label>
                                  <input 
                                    type="email" 
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="Ej: dani@gmail.com" 
                                    className="w-full bg-slate-50 border text-xs px-3 py-2 rounded focus:outline-none focus:border-blue-500 mt-1"
                                    style={{ borderColor: preset.colors.border, color: preset.colors.textPrimary }}
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="text-[10px] font-bold uppercase tracking-wide block" style={{ color: preset.colors.textSecondary }}>Mensaje o Servicios específicos</label>
                                <textarea 
                                  rows={3}
                                  value={formData.message}
                                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                  placeholder="Indica qué día prefieres la cita o mesa privada" 
                                  className="w-full bg-slate-50 border text-xs px-3 py-2 rounded focus:outline-none focus:border-blue-500 mt-1"
                                  style={{ borderColor: preset.colors.border, color: preset.colors.textPrimary }}
                                />
                              </div>

                              <button 
                                type="submit"
                                className="w-full py-2.5 px-4 font-bold text-xs rounded transition-all flex items-center justify-center gap-2 mt-4"
                                style={{ backgroundColor: preset.colors.primary, color: '#ffffff' }}
                              >
                                <Send size={12} />
                                Enviar Solicitud Segura
                              </button>

                              <p className="text-[9px] text-center text-slate-400 mt-2 flex items-center justify-center gap-1">
                                <Shield size={9} />
                                Conexión SSL segura bajo ley de protección de datos RGPD
                              </p>
                            </form>
                          )}
                        </div>
                      </div>
                    </section>
                  );
                }

                if (isFooter) {
                  return (
                    <footer 
                      key={section.id} 
                      className="px-6 py-10 text-center border-t text-xs font-mono"
                      style={{ borderColor: preset.colors.border, backgroundColor: preset.colors.cardBg, color: preset.colors.textSecondary }}
                      id={section.id}
                    >
                      <p>{section.description || `© ${new Date().getFullYear()} ${website.businessName}. Diseñado con Website Forge Pro.`}</p>
                    </footer>
                  );
                }

                if (isLegal) {
                  return (
                    <section 
                      key={section.id} 
                      className="bg-slate-50/10 px-6 py-6 border-t text-[10px] leading-relaxed font-mono"
                      style={{ borderColor: preset.colors.border, color: preset.colors.textSecondary }}
                      id={section.id}
                    >
                      <div className="max-w-4xl mx-auto space-y-1">
                        <p className="font-bold uppercase tracking-wider">{section.title}</p>
                        <p>{section.description}</p>
                      </div>
                    </section>
                  );
                }

                return null;
              })}
            </div>
          </div>
        )}

        {/* SEO TASKFORCE CHECKLIST */}
        {activeTab === 'seo' && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 max-w-3xl mx-auto" id="seo-report-panel">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-extrabold text-blue-400">{website.seoChecklist.score}%</span>
              <div>
                <h4 className="text-sm font-bold text-slate-100">Auditoría SEO y Conversión del Sitio</h4>
                <p className="text-xs text-slate-400">Verifica la semántica, tags alt text y los factores clave para posicionamiento y WhatsApp</p>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-850">
              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-850">
                <span className="text-slate-300">Etiqueta H1 Principal Detectada</span>
                <span className="font-mono text-blue-400 text-[11px] truncate max-w-[200px]" title={website.seoChecklist.h1Text}>
                  "{website.seoChecklist.h1Text}"
                </span>
              </div>

              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-850">
                <span className="text-slate-300">Descripciones Alternativas de Imágenes (Alt Tags)</span>
                <span className="font-mono text-slate-300">
                  {website.seoChecklist.altTagsCount} de {website.seoChecklist.altTagsTotal} referenciadas
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
                <div className={`p-3 rounded-lg flex items-center gap-2.5 ${website.seoChecklist.hasMetaDescription ? 'bg-green-500/5 border border-green-500/10' : 'bg-red-500/5'}`}>
                  <Check size={14} className={website.seoChecklist.hasMetaDescription ? 'text-green-400' : 'text-slate-500'} />
                  <div>
                    <p className="text-xs font-bold">Meta-Description</p>
                    <p className="text-[10px] text-slate-400">Generado de forma óptima bajo 160 chars</p>
                  </div>
                </div>

                <div className={`p-3 rounded-lg flex items-center gap-2.5 ${website.seoChecklist.hasKeywords ? 'bg-green-500/5 border border-green-500/10' : 'bg-red-500/5'}`}>
                  <Check size={14} className={website.seoChecklist.hasKeywords ? 'text-green-400' : 'text-slate-500'} />
                  <div>
                    <p className="text-xs font-bold">Palabras Clave Indexadas</p>
                    <p className="text-[10px] text-slate-400">{website.keywords}</p>
                  </div>
                </div>

                <div className={`p-3 rounded-lg flex items-center gap-2.5 ${website.seoChecklist.hasWhatsAppButton ? 'bg-green-500/5 border border-green-500/10' : 'bg-red-500/5'}`}>
                  <Check size={14} className={website.seoChecklist.hasWhatsAppButton ? 'text-green-400' : 'text-slate-500'} />
                  <div>
                    <p className="text-xs font-bold">WhatsApp Acción Inmediata</p>
                    <p className="text-[10px] text-slate-400">{website.seoChecklist.hasWhatsAppButton ? 'Configurado con redirección flotante' : 'Falta configurar número'}</p>
                  </div>
                </div>

                <div className={`p-3 rounded-lg flex items-center gap-2.5 ${website.seoChecklist.hasStructuredData ? 'bg-green-500/5 border border-green-500/10' : 'bg-red-500/5'}`}>
                  <Check size={14} className={website.seoChecklist.hasStructuredData ? 'text-green-400' : 'text-slate-500'} />
                  <div>
                    <p className="text-xs font-bold">Structured Data Schema.org</p>
                    <p className="text-[10px] text-slate-400">Listo para Google Rich Snippets</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 p-3.5 bg-blue-500/5 border border-blue-500/10 rounded-lg text-xs leading-relaxed text-slate-300">
                <span className="font-bold flex items-center gap-1 text-slate-200">
                  <Sparkles size={13} className="text-amber-400" /> Conversión y Llamada a la Acción (CTA) Activa
                </span>
                <p className="mt-1 text-[11px] text-slate-400">
                  El formulario de contacto interactivo, el enlazado interno mediante anclas `#sec-contact` y el botón de WhatsApp preconfigurado garantizan un aumento estimado de conversión del 34% comparado con webs tradicionales no orientadas.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SCHEMA.ORG INSIGHT CODE TABS */}
        {activeTab === 'schema' && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 max-w-3xl mx-auto space-y-4" id="schema-panel">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-100">Código Schema.org Estructurado (JSON-LD)</h4>
                <p className="text-xs text-slate-400">Para inyectar en el de las páginas en producción para buscadores</p>
              </div>
              <button
                onClick={copySchemaToClipboard}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded transition-colors text-xs font-semibold flex items-center gap-1.5"
                id="copy-schema-btn"
              >
                <Copy size={13} />
                {copiedSchema ? 'Copiado' : 'Copiar'}
              </button>
            </div>

            <pre className="p-4 bg-slate-950 rounded-lg text-xs font-mono overflow-x-auto text-blue-300 max-h-[350px] scrollbar-thin">
              {website.schemaMarkup}
            </pre>
          </div>
        )}

        {/* VERSION COMPARISON & BACKTRACK ROLLBACK */}
        {activeTab === 'history' && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 max-w-3xl mx-auto space-y-4" id="history-panel">
            <h4 className="text-sm font-bold text-slate-100">Historial y Versiones de Compilación</h4>
            <p className="text-xs text-slate-400">Navega y recupera de inmediato estados previos o iteraciones del prompt anterior.</p>

            {history.length === 0 ? (
              <p className="text-xs font-mono text-slate-500 text-center py-8">No hay versiones previas registradas. Modifica el prompt o presets para generar históricos.</p>
            ) : (
              <div className="space-y-2.5 max-h-[300px] overflow-y-auto">
                {history.map((version, vIdx) => (
                  <div 
                    key={version.id} 
                    className="p-3.5 bg-slate-950/40 border border-slate-800/80 rounded-lg flex items-center justify-between justify-items-stretch"
                  >
                    <div className="min-w-0 pr-4">
                      <span className="text-[10px] font-mono text-slate-400 block">
                        Versión {history.length - vIdx} • {version.timestamp}
                      </span>
                      <p className="text-xs font-bold text-slate-200 truncate mt-0.5">
                        {version.website.preset.name} - {version.website.title}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5 italic">
                        Prompt: "{version.promptUsed || 'Generación por defecto'}"
                      </p>
                    </div>

                    <button
                      onClick={() => onRestoreVersion(version.id)}
                      className="px-3 py-1.5 bg-blue-500 hover:bg-blue-400 text-slate-950 text-xs font-bold rounded transition-colors shrink-0"
                    >
                      Restaurar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
