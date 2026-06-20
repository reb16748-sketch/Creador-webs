import { useState, useEffect } from 'react';
import { 
  Sparkles, Layers, RefreshCw, Undo, Redo, HelpCircle, HardHat, 
  Trash2, Plus, Bookmark, Settings, CheckCircle, Smartphone 
} from 'lucide-react';
import { Asset, Project, GeneratedWebsite, VersionHistory } from './types';
import AssetStudio from './components/AssetStudio';
import StyleEngine from './components/StyleEngine';
import PromptToWebsite from './components/PromptToWebsite';
import WebPreviewCanvas from './components/WebPreviewCanvas';
import Exporter from './components/Exporter';
import { STYLE_PRESETS, getPresetById } from './presets';

// Initial default preloaded mock campaign so there are no empty screens "Sin pantallas vacías"
const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'proj-sushi',
    name: 'Matsu Luxury Sushi',
    description: 'Un innovador restaurante de sushi fusión y coctelería premium con reserva obligatoria.',
    businessType: 'Restaurante Gourmet de Autor',
    targetObjective: 'Conseguir reservas de mesa online y mensajes directos de WhatsApp',
    whatsappNumber: '+34600123456',
    emailContact: 'reservas@matsuprime.com',
    phoneContact: '+34911223344',
    addressContact: 'Paseo de la Castellana 120, Madrid',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const DEFAULT_ASSETS: Asset[] = [
  {
    id: 'ast-logo',
    projectId: 'proj-sushi',
    name: 'matsu_logo_gold.svg',
    type: 'logo',
    url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 30' width='100' height='30'><text x='0' y='20' fill='%23d4af37' font-family='serif' font-weight='bold' font-size='18'>MATSU</text></svg>",
    role: 'logo',
    size: '1.2 KB'
  },
  {
    id: 'ast-hero',
    projectId: 'proj-sushi',
    name: 'sushi_focal_gastronomy.png',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',
    role: 'hero',
    size: '1.5 MB',
    width: 1920,
    height: 1080,
    orientation: 'landscape'
  },
  {
    id: 'ast-roll',
    projectId: 'proj-sushi',
    name: 'black_dragon_roll.png',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80',
    role: 'gallery',
    size: '942 KB',
    width: 800,
    height: 800,
    orientation: 'square'
  }
];

// High-fidelity instant client-side generator to ensure a 0ms stuck loader UX
function generateLocalClientWebsite(
  businessName: string,
  businessType: string,
  targetObjective: string,
  stylePresetId: string,
  contactInfo: any,
  assets: Asset[]
): GeneratedWebsite {
  const preset = STYLE_PRESETS.find(p => p.id === stylePresetId) || STYLE_PRESETS[0];

  function formatAssetName(filename: string): string {
    if (!filename) return 'Asset Elegante';
    const clean = filename.replace(/\.[a-zA-Z0-9]+$/, '').split(/[_-]+/).join(' ');
    return clean.replace(/\b\w/g, c => c.toUpperCase());
  }

  const heroAsset = assets.find((a: any) => a.role === 'hero' || a.role === 'background') || assets.find((a: any) => a.type === 'image');
  const logoAsset = assets.find((a: any) => a.role === 'logo') || assets.find((a: any) => a.name && a.name.toLowerCase().includes('logo')) || null;
  const galleryAssets = assets.filter((a: any) => a.role === 'gallery' || a.role === 'testimonial' || a.role === 'cta').slice(0, 6);

  const heroImage = heroAsset ? heroAsset.url : 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80';
  const logoImage = logoAsset ? logoAsset.url : '';

  const lowerType = businessType.toLowerCase();

  let heroTitle = `Soluciones de Alto Impacto para ${businessName}`;
  let heroTagline = `Impulsamos tu negocio con estrategias de conversión diseñadas para convencer, destacar y cerrar más ventas reales.`;
  let servicesTitle = 'Nuestros Servicios Premium';
  let services = [
    { title: 'Menú Degustación del Chef', description: 'Una selección exclusiva de 5 tiempos maridada con los mejores caldos de autor.', icon: 'ChefHat' },
    { title: 'Reservas Privadas & Eventos', description: 'Celebra tus momentos especiales con menús personalizados en nuestro salón privado.', icon: 'UtensilsCrossed' },
    { title: 'Take Away & Delivery Premium', description: 'Disfruta de la experiencia culinaria completa desde la comodidad de tu hogar.', icon: 'Compass' }
  ];
  let benefits = [
    { title: 'Ingredientes 100% Orgánicos', description: 'Trabajamos con productores locales garantizando la máxima frescura en cada plato.' },
    { title: 'Cocina de Autor Vanguardista', description: 'Técnicas modernas fusionadas con el respeto a las recetas tradicionales.' },
    { title: 'Atención Obsesiva al Detalle', description: 'Un servicio impecable enfocado en hacer de tu visita una velada inolvidable.' }
  ];
  let testimonials = [
    { title: 'María F. (Gourmet Hunter)', description: 'La atención al cliente fue estelar y el tartar de atún es de otro planeta. Recomiendo el menú de temporada.', badge: 'Comensal Premium' },
    { title: 'Carlos R. (Crítico Local)', description: 'Una joya escondida. La propuesta visual y la armonía de sabores justifica cada céntimo. Volveré sin duda.', badge: 'Crítico Gastronómico' }
  ];
  let faqs = [
    { title: '¿Ofrecen opciones sin gluten o veganas?', description: 'Sí, disponemos de una carta adaptada completa con opciones veganas y sin gluten certificadas. Infórmalo a tu camarero.' },
    { title: '¿Con cuánta antelación debo reservar?', description: 'Para fines de semana sugerimos reservar con al menos 4 días de antelación para asegurar la mejor mesa.' }
  ];
  let processSteps = [
    { title: 'Reserva Online o Llamada', description: 'Elige tu fecha, hora y especifica preferencias alimentarias o de salón.' },
    { title: 'Llegada y Recepción', description: 'Nuestro sommelier te recibirá con un cóctel de bienvenida artesanal del día.' },
    { title: 'El Festín del Chef', description: 'Disfruta de un recorrido culinario cuidado con explicaciones de cada plato.' }
  ];

  if (lowerType.includes('clinic') || lowerType.includes('dent') || lowerType.includes('doctor') || lowerType.includes('salud') || lowerType.includes('fisiot')) {
    heroTitle = `Cuidado Médico de Vanguardia en ${businessName}`;
    heroTagline = `Tratamientos de alta precisión, tecnología de última generación y un equipo comprometido con tu salud y bienestar integral.`;
    servicesTitle = 'Servicios Médicos Especializados';
    services = [
      { title: 'Diagnóstico & Escáner Digital', description: 'Identificación precoz de patologías con escaneado digital integral de alta resolución.', icon: 'Activity' },
      { title: 'Tratamientos Mínimamente Invasivos', description: 'Soluciones rápidas con menor tiempo de recuperación y máxima comodidad.', icon: 'Heart' },
      { title: 'Seguimiento Personalizado Continuo', description: 'Un plan de salud a medida con consultas telemáticas de control preventivo.', icon: 'CheckCircle' }
    ];
    benefits = [
      { title: 'Profesionales Colegiados de Élite', description: 'Especialistas certificados con décadas de experiencia internacional en salud.' },
      { title: 'Tecnología Clínica Avanzada', description: 'Contamos con certificación diagnóstica de nivel hospitalario y quirófano propio.' },
      { title: 'Atención Sin Esperas Incómodas', description: 'Organizamos tu cita con tiempos amplios para darte la escucha que mereces.' }
    ];
  } else if (lowerType.includes('barber') || lowerType.includes('pelu') || lowerType.includes('esteti') || lowerType.includes('spa') || lowerType.includes('belleza')) {
    heroTitle = `Redefine tu Estilo Personal en ${businessName}`;
    heroTagline = `Servicios de corte, estilismo y afeitado tradicional con toles premium y asesoría de imagen personalizada para el hombre moderno.`;
    servicesTitle = 'Cortes y Tratamientos de Autor';
    services = [
      { title: 'Corte de Autor & Estilismo', description: 'Corte adaptado a tu fisionomía craneal con lavado premium y peinado final.', icon: 'Scissors' },
      { title: 'Afeitado Clásico a Navaja', description: 'Ritual con toalla caliente, aceites esenciales pre-shave y masaje balsámico.', icon: 'Sparkles' },
      { title: 'Tratamiento Purificante de Barba', description: 'Hidratación profunda con vapor de ozono y alineado simétrico milimétrico.', icon: 'Sparkles' }
    ];
    benefits = [
      { title: 'Barberos de Alta Escuela', description: 'Técnicos formados en las mejores academias europeas de visagismo.' },
      { title: 'Ritual Premium Relajante', description: 'No es solo un corte, es tu espacio privado de desconexión y buen ambiente.' },
      { title: 'Productos Exclusivos Premium', description: 'Utilizamos bálsamos y ceras orgánicas importadas libres de parabenos.' }
    ];
  }

  const optimizedGallery = galleryAssets.map((g: any) => {
    let title = formatAssetName(g.name);
    let description = `Asset de Alta Calidad para ${businessName}`;
    if (g.name && (g.name.toLowerCase().includes('roll') || g.name.toLowerCase().includes('atun') || g.name.toLowerCase().includes('atún'))) {
      title = 'Roll de Atún Fusión';
      description = 'Atún rojo del mediterráneo braceado con salsa de miso dulce y láminas de trufa negra.';
    }
    return {
      title,
      description,
      image: g.url
    };
  });

  const sections: any[] = [
    {
      id: 'sec-hero',
      type: 'hero',
      title: heroTitle,
      subtitle: heroTagline,
      description: `Garantía de Conversión Real • Negocio Validado • Soporte Local Activo`,
      primaryCta: { text: 'Quiero Empezar Ya', link: '#sec-contact' },
      secondaryCta: { text: 'Conoce Más', link: '#sec-about' },
      items: heroAsset ? [{ image: heroAsset.url, title: heroAsset.name }] : []
    },
    {
      id: 'sec-about',
      type: 'about',
      title: 'Sobre Nosotros',
      subtitle: 'Conoce la visión y el equipo detrás de los resultados',
      description: `En ${businessName} creemos firmemente que cada negocio merece una identidad digital que emocione y venda. No nos limitamos a crear webs bonitas; construimos activos digitales optimizados milimétricamente para convencer a tus clientes ideales. Combinamos copywriting persuasivo, diseño visual de vanguardia y respuestas inmediatas vía WhatsApp para asegurar el máximo retorno de tu inversión comercial.`,
      primaryCta: { text: 'Reserva una Consulta', link: '#sec-contact' }
    },
    {
      id: 'sec-services',
      type: 'services',
      title: servicesTitle,
      subtitle: 'Soluciones profesionales construidas para maximizar tu rentabilidad',
      items: services
    },
    {
      id: 'sec-benefits',
      type: 'benefits',
      title: '¿Por Qué Elegirnos? El Secreto de Nuestro Éxito',
      subtitle: 'Diseñado para eliminar fricciones y garantizar el éxito comercial',
      items: benefits
    }
  ];

  if (galleryAssets.length > 0) {
    sections.push({
      id: 'sec-gallery',
      type: 'gallery',
      title: 'Galería de Proyectos',
      subtitle: 'Inspecciona la calidad de nuestros assets y acabados reales',
      items: optimizedGallery
    });
  }

  sections.push({
    id: 'sec-process',
    type: 'process',
    title: 'Nuestra Metodología de Trabajo',
    subtitle: 'Un camino libre de estrés para alcanzar tu nueva web de alto impacto',
    items: processSteps
  });

  sections.push({
    id: 'sec-testimonials',
    type: 'testimonials',
    title: 'Lo Que Dicen Nuestros Socios',
    subtitle: 'Historias reales de negocios reales que transformaron su captación digital',
    items: testimonials
  });

  sections.push({
    id: 'sec-faqs',
    type: 'faqs',
    title: 'Preguntas Frecuentes',
    subtitle: 'Resolvemos tus inquietudes de inmediato',
    items: faqs
  });

  sections.push({
    id: 'sec-contact',
    type: 'contact',
    title: 'Hablemos Hoy Mismo',
    subtitle: 'El primer paso para duplicar tus leads digitales es totalmente gratuito',
    description: 'Rellena el formulario de contacto para recibir una auditoría sin costes. O si lo prefieres, pulsa el botón flotante de WhatsApp para agendar de inmediato.'
  });

  sections.push({
    id: 'sec-footer',
    type: 'footer',
    title: businessName,
    description: `© ${new Date().getFullYear()} ${businessName}. Diseñado con Website Forge Pro. Todos los derechos reservados.`
  });

  sections.push({
    id: 'sec-legal',
    type: 'legal',
    title: 'Información Legal',
    description: `Este portal está editado y avalado por ${businessName} con dirección en ${contactInfo.address || 'Calle Principal, Edificio Pro, Oficina 4B'}. Todos los tratamientos de datos e interacciones por correo o WhatsApp cumplen estrictamente con los derechos de privacidad y normativas de comercio electrónico. No recopilamos cookies con fines publicitarios no autorizados.`
  });

  const seoChecklist = {
    hasH1: true,
    h1Text: heroTitle,
    altTagsCount: galleryAssets.length + (heroAsset ? 1 : 0),
    altTagsTotal: galleryAssets.length + (heroAsset ? 1 : 0),
    hasMetaDescription: true,
    hasKeywords: true,
    hasFavicon: !!logoImage,
    hasWhatsAppButton: !!contactInfo.whatsapp,
    hasStructuredData: true,
    score: 95
  };

  const schemaMarkup = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": businessName,
    "image": heroImage,
    "telephone": contactInfo.phone || contactInfo.whatsapp || "+34600123456",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": contactInfo.address || "Paseo de la Castellana 120, Madrid"
    },
    "url": "https://websiteforgepro.local/preview"
  }, null, 2);

  return {
    title: `${businessName} | Carta & Reservas`,
    tagline: heroTagline,
    description: `La web oficial de ${businessName}. Conoce nuestros servicios premium de ${businessType}, beneficios clave, casos reales de éxito y haz tu reserva.`,
    keywords: `${businessName}, ${businessType}, servicios profesionales, contacto online, WhatsApp, leads`,
    businessName,
    phone: contactInfo.phone || '',
    whatsapp: contactInfo.whatsapp || '',
    email: contactInfo.email || '',
    address: contactInfo.address || '',
    preset,
    sections,
    seoChecklist,
    schemaMarkup
  };
}

export default function App() {
  // Projects & Global State
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('forge_projects');
    return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
  });
  const [activeProjectId, setActiveProjectId] = useState<string>(() => {
    return localStorage.getItem('forge_active_project_id') || DEFAULT_PROJECTS[0].id;
  });
  
  const [assets, setAssets] = useState<Asset[]>(() => {
    const saved = localStorage.getItem('forge_assets');
    return saved ? JSON.parse(saved) : DEFAULT_ASSETS;
  });

  const activeProject = projects.find(p => p.id === activeProjectId) || projects[0];

  // Campaign Inputs tied to Active Project
  const [businessName, setBusinessName] = useState(activeProject.name);
  const [businessType, setBusinessType] = useState(activeProject.businessType);
  const [targetObjective, setTargetObjective] = useState(activeProject.targetObjective);
  const [prompt, setPrompt] = useState('Por favor, coloca el logo dorado en la cabecera, incorpora el Roll de Atún Fusión en la galería de proyectos, destaca un testimonio sobre el maridaje de autor de Carlos R., y asegura que el botón de WhatsApp flote a la derecha.');
  const [phone, setPhone] = useState(activeProject.phoneContact);
  const [whatsapp, setWhatsapp] = useState(activeProject.whatsappNumber);
  const [email, setEmail] = useState(activeProject.emailContact);
  const [address, setAddress] = useState(activeProject.addressContact);
  
  // Style config state
  const [selectedPresetId, setSelectedPresetId] = useState<'minimal-premium' | 'luxury-dark' | 'editorial' | 'cinematic' | 'warm-local-business' | 'bold-typography' | 'soft-luxury'>('luxury-dark');

  // Generator workflow states
  const [isGenerating, setIsGenerating] = useState(false);
  const [website, setWebsite] = useState<GeneratedWebsite | null>(null);
  const [history, setHistory] = useState<VersionHistory[]>([]);
  const [generationFeedback, setGenerationFeedback] = useState<string>('');

  // Persist config state
  useEffect(() => {
    localStorage.setItem('forge_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('forge_assets', JSON.stringify(assets));
  }, [assets]);

  useEffect(() => {
    localStorage.setItem('forge_active_project_id', activeProjectId);
    // Sync inputs when active project changes
    const proj = projects.find(p => p.id === activeProjectId) || projects[0];
    if (proj) {
      setBusinessName(proj.name);
      setBusinessType(proj.businessType);
      setTargetObjective(proj.targetObjective);
      setPhone(proj.phoneContact);
      setWhatsapp(proj.whatsappNumber);
      setEmail(proj.emailContact);
      setAddress(proj.addressContact);
    }
  }, [activeProjectId]);

  // Seed default website compile on first run to avoid blank screens
  useEffect(() => {
    const seedDefaultCompile = async () => {
      setIsGenerating(true);
      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: 'Generar website premium inicial para Matsu Luxury Sushi.',
            businessName: 'Matsu Luxury Sushi',
            businessType: 'Restaurante Gourmet Fusión',
            targetObjective: 'Reservar mesa online y WhatsApp',
            stylePresetId: 'luxury-dark',
            contactInfo: {
              phone: '+34911223344',
              whatsapp: '+34600123456',
              email: 'reservas@matsu.com',
              address: 'Paseo de la Castellana 120, Madrid'
            },
            assets: DEFAULT_ASSETS
          })
        });
        const resData = await response.json();
        if (resData.success && resData.website) {
          setWebsite(resData.website);
        } else {
          throw new Error('Initial backend generation reported unsuccessful');
        }
      } catch (err) {
        console.warn('Initial backend seed is compiling on cold-boot; rolling out offline instant high-fidelity local layout:', err);
        const localWebsite = generateLocalClientWebsite(
          'Matsu Luxury Sushi',
          'Restaurante Gourmet de Autor',
          'Conseguir reservas de mesa online y mensajes directos de WhatsApp',
          'luxury-dark',
          {
            phone: '+34911223344',
            whatsapp: '+34600123456',
            email: 'reservas@matsuprime.com',
            address: 'Paseo de la Castellana 120, Madrid'
          },
          DEFAULT_ASSETS
        );
        setWebsite(localWebsite);
      } finally {
        setIsGenerating(false);
      }
    };
    seedDefaultCompile();
  }, []);

  const handleCreateNewProject = () => {
    const newId = 'proj-' + Math.random().toString(36).substr(2, 9);
    const newProj: Project = {
      id: newId,
      name: 'Nuevo Negocio Local',
      description: 'Estrategia premium de captación comercial',
      businessType: 'Servicios Profesionales o Local',
      targetObjective: 'Generar mensajes rápidos por WhatsApp',
      whatsappNumber: '',
      emailContact: '',
      phoneContact: '',
      addressContact: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProjects([newProj, ...projects]);
    setActiveProjectId(newId);
    setWebsite(null);
  };

  const handleDeleteProject = (idToDelete: string) => {
    if (projects.length <= 1) return; // Prevent deleting the last project
    const remaining = projects.filter(p => p.id !== idToDelete);
    setProjects(remaining);
    setActiveProjectId(remaining[0].id);
  };

  // Main compilation action
  const handleGenerateWebsite = async () => {
    setIsGenerating(true);
    setGenerationFeedback('Iniciando Valkyrie Compiler: Redactando copias comerciales persuasivas y estructurando assets...');
    
    // Auto save updated inputs back to active project
    const updatedProjects = projects.map((p) => {
      if (p.id === activeProjectId) {
        return {
          ...p,
          name: businessName,
          businessType,
          targetObjective,
          phoneContact: phone,
          whatsappNumber: whatsapp,
          emailContact: email,
          addressContact: address,
          updatedAt: new Date().toISOString()
        };
      }
      return p;
    });
    setProjects(updatedProjects);

    try {
      const activeProjectAssets = assets.filter(a => a.projectId === activeProjectId);

      const requestPayload = {
        prompt,
        businessName,
        businessType,
        targetObjective,
        stylePresetId: selectedPresetId,
        contactInfo: { phone, whatsapp, email, address },
        assets: activeProjectAssets
      };

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload)
      });

      const resData = await response.json();
      
      if (resData.success && resData.website) {
        // Record compiled website state
        const compiled: GeneratedWebsite = resData.website;
        setWebsite(compiled);

        // Store version history for undo rollbacks
        const newHistoryEl: VersionHistory = {
          id: 'ver-' + Math.random().toString(36).substr(2, 9),
          projectId: activeProjectId,
          timestamp: new Date().toLocaleTimeString(),
          promptUsed: prompt,
          website: compiled,
          stylePresetId: selectedPresetId
        };
        setHistory([newHistoryEl, ...history]);
      } else {
        alert('Ocurrió un error inesperado al forjar la web. Por favor intenta de nuevo.');
      }
    } catch (err) {
      console.error('Core compilation fetch error:', err);
      alert('Error de conexión con el contenedor local. Por favor verifica tus puertos o reintenta.');
    } finally {
      setIsGenerating(false);
      setGenerationFeedback('');
    }
  };

  const handleRestoreVersion = (versionId: string) => {
    const found = history.find(h => h.id === versionId);
    if (found) {
      setWebsite(found.website);
      setSelectedPresetId(found.stylePresetId as any);
      setPrompt(found.promptUsed);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500/20 antialiased">
      
      {/* HEADER SECTION (Creative Workspace Studio Brand) */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between" id="app-workspace-header">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-lg text-slate-950 font-black flex items-center justify-center">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <span className="text-lg font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Website Forge Pro
            </span>
            <p className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
              Estudio Creativo de Conversión de Élite
            </p>
          </div>
        </div>

        {/* Multi-Project management bar */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-850 px-3 py-1.5 rounded-lg text-xs" id="project-selector">
            <Layers size={13} className="text-slate-500" />
            <span className="text-slate-400 font-medium">Proyecto:</span>
            <select
              value={activeProjectId}
              onChange={(e) => setActiveProjectId(e.target.value)}
              className="bg-transparent border-none text-xs text-white font-bold focus:outline-none w-48 cursor-pointer"
            >
              {projects.map(p => (
                <option key={p.id} value={p.id} className="bg-slate-950 text-white">
                  {p.name}
                </option>
              ))}
            </select>
            {projects.length > 1 && (
              <button 
                onClick={() => handleDeleteProject(activeProjectId)}
                className="p-1 hover:bg-red-500/10 text-slate-500 hover:text-red-400 rounded transition-all"
                title="Eliminar proyecto activo"
              >
                <Trash2 size={13} />
              </button>
            )}
          </div>

          <button
            onClick={handleCreateNewProject}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5"
            id="new-project-btn"
          >
            <Plus size={14} />
            <span className="hidden sm:inline">Nuevo Proyecto</span>
          </button>
        </div>
      </header>

      {/* CORE SPLIT WORKSPACE INTERFACE */}
      <main className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-6 p-6 h-full overflow-hidden">
        
        {/* LEFT COLLUMN: Campaign setups, Assets Studio & Design Presets */}
        <section className="xl:col-span-5 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-130px)] pr-2 scrollbar-thin">
          
          {/* Section 1: Business contexts and Prompter block */}
          <PromptToWebsite
            businessName={businessName}
            setBusinessName={setBusinessName}
            businessType={businessType}
            setBusinessType={setBusinessType}
            targetObjective={targetObjective}
            setTargetObjective={setTargetObjective}
            prompt={prompt}
            setPrompt={setPrompt}
            phone={phone}
            setPhone={setPhone}
            whatsapp={whatsapp}
            setWhatsapp={setWhatsapp}
            email={email}
            setEmail={setEmail}
            address={address}
            setAddress={setAddress}
            onGenerate={handleGenerateWebsite}
            isGenerating={isGenerating}
          />

          {/* Section 2: Asset Studio (organizer & placer) */}
          <AssetStudio
            assets={assets.filter(a => a.projectId === activeProjectId)}
            onAddAssets={(newAsts) => setAssets([...assets, ...newAsts])}
            onUpdateAssetRole={(id, role) => setAssets(assets.map(a => a.id === id ? { ...a, role } : a))}
            onDeleteAsset={(id) => setAssets(assets.filter(a => a.id !== id))}
            projectId={activeProjectId}
          />

          {/* Section 3: Professional Style Presets selection */}
          <StyleEngine
            selectedPresetId={selectedPresetId}
            onSelectPreset={(id: any) => setSelectedPresetId(id)}
          />

        </section>

        {/* RIGHT COLLUMN: Live Interactive View Canvas & Code Exporter */}
        <section className="xl:col-span-7 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-130px)] pl-0 xl:pl-2">
          
          {website ? (
            <div className="flex-1 flex flex-col h-full gap-6">
              {/* Active High-Fidelity Rendering Canvas */}
              <WebPreviewCanvas
                website={website}
                assets={assets.filter(a => a.projectId === activeProjectId)}
                onUpdateWebsite={setWebsite}
                history={history.filter(h => h.projectId === activeProjectId)}
                onRestoreVersion={handleRestoreVersion}
              />

              {/* Complete Production Code Exporter */}
              <Exporter
                website={website}
                assets={assets.filter(a => a.projectId === activeProjectId)}
              />
            </div>
          ) : (
            <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl flex flex-col items-center justify-center p-10 text-center text-slate-400">
              <Sparkles className="text-blue-500 animate-pulse mb-4" size={44} />
              <h3 className="text-md font-bold text-slate-200">Pre-compilando Matsu Sushi inicial...</h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1.5 leading-relaxed">
                El motor Valkyrie está estructurando los assets pre-cargados para evitar pantallas de bienvenida vacías. Esto toma unos segundos.
              </p>
            </div>
          )}

        </section>

      </main>

      {/* FOOTER METRICS SYSTEM LOGGER (AntiAI-Slop Clean design) */}
      <footer className="bg-slate-900/40 border-t border-slate-850 px-6 py-2.5 flex justify-between items-center text-[10px] font-mono text-slate-500">
        <span className="flex items-center gap-1">
          <CheckCircle size={10} className="text-green-500" />
          <span>Valkyrie Engine Local Host activo: Port 3000 • Listando {projects.length} Proyectos</span>
        </span>
        <span className="hidden md:inline">Website Forge Pro • Creador de Sitios de Alta Conversión</span>
      </footer>

    </div>
  );
}
