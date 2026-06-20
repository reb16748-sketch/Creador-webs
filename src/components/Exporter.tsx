import { useState } from 'react';
import { Download, FileText, Check, Copy, ExternalLink, Code2, Globe, Sparkles } from 'lucide-react';
import { GeneratedWebsite, Asset } from '../types';

interface ExporterProps {
  website: GeneratedWebsite;
  assets: Asset[];
}

export default function Exporter({ website, assets }: ExporterProps) {
  const [exportType, setExportType] = useState<'html' | 'react'>('html');
  const [copied, setCopied] = useState(false);

  const preset = website.preset;

  const generateSingleHTML = (): string => {
    // Compile single self-contained ready production HTML
    const fontImport = preset.typography.importUrl;
    
    // Distribute Logo
    const logoAsset = assets.find(a => a.role === 'logo');
    const heroAsset = assets.find(a => a.role === 'hero');
    const galleryAssets = assets.filter(a => a.role === 'gallery');

    const sectionsHTML = website.sections.map((sec) => {
      let content = '';

      if (sec.type === 'hero') {
        content = `
        <section id="sec-hero" class="${preset.spacing.sectionPadding} px-6 border-b" style="border-color: ${preset.colors.border}">
          <div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <div class="flex-1 space-y-4">
              <span class="text-xs uppercase tracking-widest font-bold" style="color: ${preset.colors.primary}">
                ${website.businessName} • ÉLITE WEB
              </span>
              <h1 class="text-3xl md:text-5xl font-extrabold tracking-tight" style="font-family: '${preset.typography.heading}', sans-serif; color: ${preset.colors.textPrimary}">
                ${sec.title}
              </h1>
              <p class="text-sm md:text-md leading-relaxed" style="color: ${preset.colors.textSecondary}">
                ${sec.subtitle}
              </p>
              ${sec.description ? `<p class="text-xs font-mono" style="color: ${preset.colors.accent}">${sec.description}</p>` : ''}
              <div class="flex flex-wrap gap-3 pt-2">
                ${sec.primaryCta ? `
                <a href="${sec.primaryCta.link}" class="text-xs font-bold px-6 py-3 shadow transition-all ${preset.borderRadius}" style="background-color: ${preset.colors.primary}; color: #ffffff">
                  ${sec.primaryCta.text}
                </a>` : ''}
                ${sec.secondaryCta ? `
                <a href="${sec.secondaryCta.link}" class="text-xs font-bold px-6 py-3 border transition-all ${preset.borderRadius}" style="border-color: ${preset.colors.border}; color: ${preset.colors.textPrimary}">
                  ${sec.secondaryCta.text}
                </a>` : ''}
              </div>
            </div>
            <div class="flex-1 w-full bg-slate-100 rounded-xl overflow-hidden border" style="border-color: ${preset.colors.border}">
              ${heroAsset ? `<img src="${heroAsset.url}" alt="Hero Banner" class="w-full h-48 sm:h-64 object-cover" />` : '<div class="h-48 sm:h-64 flex items-center justify-center text-slate-400 text-xs">Añadir imagen para Hero</div>'}
            </div>
          </div>
        </section>
        `;
      } else if (sec.type === 'about') {
        content = `
        <section id="sec-about" class="${preset.spacing.sectionPadding} px-6 border-b" style="border-color: ${preset.colors.border}; background-color: ${preset.colors.cardBg}">
          <div class="max-w-3xl mx-auto text-center space-y-4">
            <span class="text-[10px] uppercase tracking-widest font-bold" style="color: ${preset.colors.primary}">SOBRE NOSOTROS</span>
            <h2 class="text-2xl md:text-3xl font-extrabold tracking-tight" style="font-family: '${preset.typography.heading}', sans-serif; color: ${preset.colors.textPrimary}">${sec.title}</h2>
            <p class="text-sm leading-relaxed max-w-2xl mx-auto" style="color: ${preset.colors.textSecondary}">${sec.description}</p>
          </div>
        </section>
        `;
      } else if (sec.type === 'services') {
        const itemsList = sec.items?.map((item) => `
          <div class="p-5 border transition-all ${preset.borderRadius}" style="border-color: ${preset.colors.border}; background-color: ${preset.colors.cardBg}">
            <h3 class="text-sm font-extrabold" style="color: ${preset.colors.textPrimary}">${item.title}</h3>
            <p class="text-xs leading-relaxed mt-2" style="color: ${preset.colors.textSecondary}">${item.description}</p>
          </div>
        `).join('') || '';

        content = `
        <section id="sec-services" class="${preset.spacing.sectionPadding} px-6 border-b" style="border-color: ${preset.colors.border}">
          <div class="max-w-5xl mx-auto space-y-8">
            <div class="text-center space-y-2">
              <h2 class="text-2xl md:text-3xl font-bold tracking-tight" style="font-family: '${preset.typography.heading}', sans-serif; color: ${preset.colors.textPrimary}">${sec.title}</h2>
              <p class="text-xs" style="color: ${preset.colors.textSecondary}">${sec.subtitle || ''}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">${itemsList}</div>
          </div>
        </section>
        `;
      } else if (sec.type === 'benefits') {
        const bList = sec.items?.map((b) => `
          <div class="flex gap-3">
            <div class="p-1.5 h-max rounded-full text-white" style="background-color: ${preset.colors.primary}">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <div>
              <h4 class="text-xs font-bold" style="color: ${preset.colors.textPrimary}">${b.title}</h4>
              <p class="text-[11px] leading-relaxed mt-1" style="color: ${preset.colors.textSecondary}">${b.description}</p>
            </div>
          </div>
        `).join('') || '';

        content = `
        <section id="sec-benefits" class="${preset.spacing.sectionPadding} px-6 border-b" style="border-color: ${preset.colors.border}; background-color: ${preset.colors.cardBg}">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-xl md:text-2xl font-bold tracking-tight text-center mb-8" style="font-family: '${preset.typography.heading}', sans-serif">${sec.title}</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">${bList}</div>
          </div>
        </section>
        `;
      } else if (sec.type === 'gallery') {
        const gList = sec.items?.map((g) => `
          <div class="group relative aspect-square bg-slate-100 overflow-hidden border ${preset.borderRadius}" style="border-color: ${preset.colors.border}">
            <img src="${g.image}" alt="${g.title}" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
            <div class="absolute inset-x-0 bottom-0 bg-black/70 text-white p-3">
              <h4 class="text-xs font-bold truncate">${g.title}</h4>
              <p class="text-[9px] text-slate-300 truncate">${g.description}</p>
            </div>
          </div>
        `).join('') || '';

        content = `
        <section id="sec-gallery" class="${preset.spacing.sectionPadding} px-6 border-b" style="border-color: ${preset.colors.border}">
          <div class="max-w-5xl mx-auto space-y-6">
            <div class="text-center space-y-2">
              <h2 class="text-2xl font-bold" style="font-family: '${preset.typography.heading}', sans-serif">${sec.title}</h2>
              <p class="text-xs" style="color: ${preset.colors.textSecondary}">${sec.subtitle || ''}</p>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">${gList}</div>
          </div>
        </section>
        `;
      } else if (sec.type === 'testimonials') {
        const testimonialsList = sec.items?.map((t) => `
          <div class="p-5 border flex flex-col justify-between ${preset.borderRadius}" style="border-color: ${preset.colors.border}; background-color: ${preset.colors.background}">
            <p class="text-xs italic" style="color: ${preset.colors.textSecondary}">"${t.description}"</p>
            <div class="mt-4 pt-3 border-t flex items-center justify-between" style="border-color: ${preset.colors.border}">
              <span class="text-xs font-bold" style="color: ${preset.colors.textPrimary}">${t.title}</span>
              <span class="text-[10px] uppercase font-mono px-2 py-0.5" style="background-color: ${preset.colors.primary}15; color: ${preset.colors.primary}">${t.badge || ''}</span>
            </div>
          </div>
        `).join('') || '';

        content = `
        <section id="sec-testimonials" class="${preset.spacing.sectionPadding} px-6 border-b" style="border-color: ${preset.colors.border}; background-color: ${preset.colors.cardBg}">
          <div class="max-w-4xl mx-auto space-y-6">
            <div class="text-center">
              <h2 class="text-xl md:text-2xl font-bold" style="font-family: '${preset.typography.heading}', sans-serif">${sec.title}</h2>
              <p class="text-xs" style="color: ${preset.colors.textSecondary}">${sec.subtitle || ''}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">${testimonialsList}</div>
          </div>
        </section>
        `;
      } else if (sec.type === 'faqs') {
        const faqList = sec.items?.map((f) => `
          <div class="p-4 border ${preset.borderRadius}" style="border-color: ${preset.colors.border}; background-color: ${preset.colors.cardBg}">
            <h4 class="text-xs font-bold" style="color: ${preset.colors.textPrimary}">${f.title}</h4>
            <p class="text-xs leading-relaxed mt-1.5" style="color: ${preset.colors.textSecondary}">${f.description}</p>
          </div>
        `).join('') || '';

        content = `
        <section id="sec-faqs" class="${preset.spacing.sectionPadding} px-6 border-b" style="border-color: ${preset.colors.border}">
          <div class="max-w-2xl mx-auto space-y-6">
            <h2 class="text-xl md:text-2xl font-bold text-center" style="font-family: '${preset.typography.heading}', sans-serif">${sec.title}</h2>
            <div class="space-y-3.5">${faqList}</div>
          </div>
        </section>
        `;
      } else if (sec.type === 'contact') {
        content = `
        <section id="sec-contact" class="${preset.spacing.sectionPadding} px-6 border-b" style="border-color: ${preset.colors.border}; background-color: ${preset.colors.cardBg}">
          <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-4">
              <h2 class="text-2xl font-black tracking-tight" style="font-family: '${preset.typography.heading}', sans-serif; color: ${preset.colors.textPrimary}">
                ${sec.title}
              </h2>
              <p class="text-xs leading-relaxed" style="color: ${preset.colors.textSecondary}">
                ${sec.subtitle || sec.description || 'Contáctanos para agendar tu consulta de forma gratuita.'}
              </p>
              <div class="p-5 border bg-white rounded-lg text-slate-800" style="border-color: ${preset.colors.border}">
                <p class="text-xs font-bold">Dirección Oficial</p>
                <p class="text-xs text-slate-500 mt-1">${website.address || 'Calle Central de Negocio, 40'}</p>
              </div>
            </div>

            <div class="bg-white p-5 border shadow-sm rounded-xl" style="border-color: ${preset.colors.border}; background-color: ${preset.colors.background}">
              <form onsubmit="event.preventDefault(); document.getElementById('success-msg').style.display='block'; this.style.display='none';" class="space-y-3">
                <div>
                  <label class="text-[10px] font-bold uppercase tracking-wide block" style="color: ${preset.colors.textSecondary}">Nombre Completo</label>
                  <input type="text" required placeholder="Ej: Juan Pérez" class="w-full bg-slate-50 border text-xs px-3 py-2 rounded focus:outline-none focus:border-blue-500 mt-1" style="border-color: ${preset.colors.border}" />
                </div>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="text-[10px] font-bold uppercase tracking-wide block" style="color: ${preset.colors.textSecondary}">Teléfono</label>
                    <input type="text" required placeholder="Móvil" class="w-full bg-slate-50 border text-xs px-3 py-2 rounded focus:outline-none focus:border-blue-500 mt-1" style="border-color: ${preset.colors.border}" />
                  </div>
                  <div>
                    <label class="text-[10px] font-bold uppercase tracking-wide block" style="color: ${preset.colors.textSecondary}">Email</label>
                    <input type="email" required placeholder="correo@ejemplo.com" class="w-full bg-slate-50 border text-xs px-3 py-2 rounded focus:outline-none focus:border-blue-500 mt-1" style="border-color: ${preset.colors.border}" />
                  </div>
                </div>
                <div>
                  <label class="text-[10px] font-bold uppercase tracking-wide block" style="color: ${preset.colors.textSecondary}">Mensaje</label>
                  <textarea rows="3" placeholder="Mensaje..." class="w-full bg-slate-50 border text-xs px-3 py-2 rounded focus:outline-none" style="border-color: ${preset.colors.border}"></textarea>
                </div>
                <button type="submit" class="w-full py-2.5 px-4 font-bold text-xs rounded transition-all mt-4 text-white" style="background-color: ${preset.colors.primary}">
                  Solicitar Cita de Inmediato
                </button>
              </form>
              <div id="success-msg" class="hidden text-center py-8 space-y-3">
                <p class="text-sm font-bold" style="color: ${preset.colors.primary}">¡Formulario enviado correctamente!</p>
                <p class="text-xs" style="color: ${preset.colors.textSecondary}">Te responderemos en menos de 24 horas laborables.</p>
              </div>
            </div>
          </div>
        </section>
        `;
      } else if (sec.type === 'footer') {
        content = `
        <footer class="px-6 py-10 text-center border-t text-xs font-mono" style="border-color: ${preset.colors.border}; background-color: ${preset.colors.cardBg}; color: ${preset.colors.textSecondary}">
          <p>${sec.description || `© ${new Date().getFullYear()} ${website.businessName}. Todos los derechos reservados.`}</p>
        </footer>
        `;
      } else if (sec.type === 'legal') {
        content = `
        <section class="px-6 py-6 border-t text-[10px] leading-relaxed font-mono" style="border-color: ${preset.colors.border}; background-color: ${preset.colors.background}; color: ${preset.colors.textSecondary}">
          <div class="max-w-4xl mx-auto">
            <p class="font-bold uppercase">${sec.title}</p>
            <p class="mt-1">${sec.description}</p>
          </div>
        </section>
        `;
      }

      return content;
    }).join('');

    // Floating WhatsApp Button Template
    const whatsappBtn = website.whatsapp ? `
    <a href="https://wa.me/${website.whatsapp.replaceAll(' ', '')}" target="_blank" class="fixed bottom-6 right-6 z-50 p-3 shadow-lg hover:scale-105 transition-all text-white flex items-center justify-center bg-[#25D366]" style="border-radius: ${preset.borderRadius === 'rounded-none' ? '0px' : '9999px'}">
      <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12.012 2C6.48 2 2 6.48 2 12c0 1.76.46 3.42 1.27 4.88L2 22l5.3-1.23c1.4.77 2.97 1.23 4.7 1.23 5.52 0 10-4.48 10-10S17.532 2 12.012 2zm5.78 14.12c-.25.7-1.46 1.34-2 1.4-1.28.16-3.23-.46-5.83-3.07C7.362 11.83 6.74 9.87 6.9 8.6c.14-.54.78-1.75 1.48-2 .32-.1.65-.1.8-.1h.5c.14 0 .34.05.5.4l1.2 2.9c.1.25.04.54-.1.7l-.65.8c-.14.15-.3.33-.14.6.45.74 1 1.37 1.63 1.93.63.56 1.26.96 1.55 1.1.28.15.45.1.6-.1l1-1.32c.16-.2.37-.2.6-.1l3 1.4c.24.1.34.2.4.52z"/></svg>
    </a>
    ` : '';

    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${website.title}</title>
  <meta name="description" content="${website.description}" />
  <meta name="keywords" content="${website.keywords}" />
  <!-- Script de carga rápida de Tailwind CSS v4 CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('${fontImport}');
    body {
      font-family: '${preset.typography.body}', sans-serif;
      background-color: ${preset.colors.background};
      color: ${preset.colors.textPrimary};
    }
    h1, h2, h3, h4 {
      font-family: '${preset.typography.heading}', sans-serif;
    }
  </style>
  <script type="application/ld+json">
${website.schemaMarkup}
  </script>
</head>
<body class="antialiased">

  <!-- BARRA DE NAVEGACIÓN -->
  <header class="border-b sticky top-0 backdrop-blur-md z-40 px-6 py-4 flex items-center justify-between" style="border-color: ${preset.colors.border}; background-color: ${preset.colors.cardBg}">
    <div class="flex items-center gap-2">
      ${logoAsset ? `<img src="${logoAsset.url}" alt="Logo" class="h-8 max-w-[120px] object-contain" />` : `<span class="font-bold text-sm tracking-tight text-slate-900" style="color: ${preset.colors.primary}">${website.businessName}</span>`}
    </div>
    <nav class="hidden md:flex items-center gap-5 text-xs font-semibold uppercase tracking-wider" style="color: ${preset.colors.textSecondary}">
      <a href="#sec-services" class="hover:opacity-80">Servicios</a>
      <a href="#sec-about" class="hover:opacity-80">Nosotros</a>
      <a href="#sec-testimonials" class="hover:opacity-80">Opiniones</a>
      <a href="#sec-contact" class="hover:opacity-80">Contacto</a>
    </nav>
    <a href="#sec-contact" class="text-xs font-bold px-4 py-2 border transition-all ${preset.borderRadius}" style="background-color: ${preset.colors.primary}; color: #ffffff; border-color: ${preset.colors.primary}">
      Reservar
    </a>
  </header>

  <!-- CONTENIDOS -->
  <main>
    ${sectionsHTML}
  </main>

  <!-- BOTÓN FLOANTE WHATSAPP -->
  ${whatsappBtn}

</body>
</html>`;
  };

  const generateReactComponent = (): string => {
    return `import React, { useState } from 'react';

// Preset de Diseño: ${preset.name}
export default function ExportedLanding() {
  const [submitted, setSubmitted] = useState(false);
  
  return (
    <div className="min-h-screen antialiased bg-[${preset.colors.background}] text-[${preset.colors.textPrimary}] font-sans selection:bg-[${preset.colors.primary}]/20">
      
      {/* HEADER */}
      <header className="sticky top-0 z-40 px-6 py-4 border-b border-[${preset.colors.border}] bg-[${preset.colors.cardBg}]/90 backdrop-blur flex justify-between items-center">
        <span className="text-sm font-extrabold tracking-tight text-[${preset.colors.primary}]">${website.businessName}</span>
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-semibold text-[${preset.colors.textSecondary}]">
          <a href="#services" className="hover:text-[${preset.colors.primary}]">Servicios</a>
          <a href="#about" className="hover:text-[${preset.colors.primary}]">Nosotros</a>
          <a href="#contact" className="hover:text-[${preset.colors.primary}]">Contacto</a>
        </nav>
        <a href="#contact" className="text-xs font-bold px-4 py-2 bg-[${preset.colors.primary}] text-white ${preset.borderRadius} transition-opacity hover:opacity-90">
          Reservar Cita
        </a>
      </header>

      {/* HERO SECTION */}
      <section className="${preset.spacing.sectionPadding} px-6 border-b border-[${preset.colors.border}]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl md:text-5xl font-extrabold text-[${preset.colors.textPrimary}] leading-tight">
              ${website.sections.find(s=>s.type==='hero')?.title || ''}
            </h1>
            <p className="text-sm leading-relaxed text-[${preset.colors.textSecondary}]">
              ${website.sections.find(s=>s.type==='hero')?.subtitle || ''}
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#contact" className="text-xs font-semibold px-6 py-3 bg-[${preset.colors.primary}] text-white ${preset.borderRadius} ${preset.shadow}">
                Empezar Cita
              </a>
            </div>
          </div>
          <div className="flex-1 w-full bg-slate-50 border rounded-xl overflow-hidden h-48 md:h-64" />
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" id="sec-contact" class="${preset.spacing.sectionPadding} px-6">
        <div className="max-w-xl mx-auto p-6 bg-white border border-[${preset.colors.border}] ${preset.borderRadius} ${preset.shadow}">
          <h2 className="text-xl font-bold mb-4">Agenda Con Nosotros</h2>
          {submitted ? (
            <p className="text-xs text-green-600 font-semibold text-center">¡Formulario de Reservas Enviado!</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-3">
              <input type="text" required placeholder="Tu nombre" className="w-full p-2 text-xs border rounded bg-slate-50 focus:outline-none" />
              <input type="email" required placeholder="Tu correo" className="w-full p-2 text-xs border rounded bg-slate-50 focus:outline-none" />
              <button type="submit" className="w-full py-2 bg-[${preset.colors.primary}] text-white text-xs font-bold ${preset.borderRadius}">
                Completar Reserva
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
`;
  };

  const handleCopyCode = () => {
    const code = exportType === 'html' ? generateSingleHTML() : generateReactComponent();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    const code = exportType === 'html' ? generateSingleHTML() : generateReactComponent();
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = exportType === 'html' ? 'index.html' : 'LandingComponent.tsx';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-6 text-slate-100" id="exporter-layout">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-green-500/10 text-green-400 rounded-lg">
            <Download size={18} />
          </div>
          <h3 className="text-md font-semibold tracking-tight">Valkyrie Proyecto Exporter</h3>
        </div>
        <span className="text-xs text-emerald-400 font-bold">Producción Listo</span>
      </div>

      <div className="flex bg-slate-950 border border-slate-850 p-1 rounded-lg text-xs mb-4">
        <button
          onClick={() => setExportType('html')}
          className={`flex-1 py-2 rounded transition-all font-bold ${exportType === 'html' ? 'bg-slate-800 text-slate-100' : 'text-slate-400 hover:text-slate-200'}`}
          id="export-html-btn"
        >
          <div className="flex items-center justify-center gap-1.5">
            <Globe size={13} />
            <span>Fichero HTML Puro</span>
          </div>
        </button>
        <button
          onClick={() => setExportType('react')}
          className={`flex-1 py-2 rounded transition-all font-bold ${exportType === 'react' ? 'bg-slate-800 text-slate-100' : 'text-slate-400 hover:text-slate-200'}`}
          id="export-react-btn"
        >
          <div className="flex items-center justify-center gap-1.5">
            <Code2 size={13} />
            <span>Componente React / Next</span>
          </div>
        </button>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed mb-4">
        {exportType === 'html' 
          ? 'Genera un único archivo HTML ultra optimizado con CDN Tailwind, soporte para metas SEO, schema markup estructurado y el botón de WhatsApp nativo con scroll fluido. Ideal para subidas rápidas.'
          : 'Código en React modularizado usando Tailwind CSS, tipografía configurable y simulación local de llamadas a la acción, ideal para copiar a tu proyecto existente de Vite o Next.js.'}
      </p>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={handleCopyCode}
          className="py-2.5 bg-slate-800 hover:bg-slate-700 rounded transition-colors text-xs font-semibold flex items-center justify-center gap-1.5"
          id="copy-code-btn"
        >
          <Copy size={13} />
          {copied ? 'Copiado' : 'Copiar Código'}
        </button>
        <button
          onClick={downloadFile}
          className="py-2.5 bg-blue-500 hover:bg-blue-400 text-slate-950 rounded transition-colors text-xs font-bold flex items-center justify-center gap-1.5"
          id="download-file-btn"
        >
          <Download size={13} />
          <span>Descargar Código</span>
        </button>
      </div>

      <div className="p-3 bg-slate-950 rounded-lg text-[10px] font-mono text-slate-400 leading-relaxed space-y-1 border border-slate-800">
        <span className="font-bold text-slate-200 flex items-center gap-1">
          <FileText size={10} /> INSTRUCCIONES DE DESPLIEGUE:
        </span>
        <ol className="list-decimal pl-4.5 space-y-0.5 mt-1.5">
          <li>Descarga el fichero pulsando el botón superior.</li>
          <li>Ubícalo en la raíz de tu hosting o arrástralo a <span className="text-blue-400">Netlify Drop / Vercel</span>.</li>
          <li>Sube tus recursos enlazados (los logos y hero images) a la misma carpeta.</li>
          <li>¡Listo! Tu web de alta conversión estará online de forma 100% gratuita.</li>
        </ol>
      </div>
    </div>
  );
}
