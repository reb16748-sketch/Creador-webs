import { StylePreset } from './types';

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: 'minimal-premium',
    name: 'Minimal Premium',
    label: 'Clean & Aesthetic Minimalist',
    description: 'High-contrast clean spacing, fine typography, and massive negative space. Perfect for architectural studios, modern consultants, and boutique brands.',
    typography: {
      heading: 'Inter',
      body: 'Inter',
      importUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    },
    colors: {
      primary: '#000000',
      secondary: '#4b5563',
      accent: '#2563eb',
      background: '#fafafa',
      textPrimary: '#111827',
      textSecondary: '#4b5563',
      cardBg: '#ffffff',
      border: '#e5e7eb'
    },
    spacing: {
      sectionPadding: 'py-20 md:py-32',
      elementGap: 'gap-6'
    },
    borderRadius: 'rounded-none',
    shadow: 'shadow-none',
    glassmorphism: false,
    usesDarkTheme: false
  },
  {
    id: 'luxury-dark',
    name: 'Luxury Dark',
    label: 'Cosmic Obsidian & Gold',
    description: 'Sophisticated deep dark canvas, thin gold/champagne lines, and extremely high-contrast dark visual structures. Built for premium restaurants, luxury barbers, and high-end clinics.',
    typography: {
      heading: 'Playfair Display',
      body: 'Inter',
      importUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap'
    },
    colors: {
      primary: '#d4af37', // Gold
      secondary: '#a1a1aa',
      accent: '#f59e0b',
      background: '#09090b', // Deep zinc-950
      textPrimary: '#fafafa',
      textSecondary: '#a1a1aa',
      cardBg: '#18181b', // Zinc-900
      border: '#27272a'
    },
    spacing: {
      sectionPadding: 'py-24 md:py-32',
      elementGap: 'gap-8'
    },
    borderRadius: 'rounded-md',
    shadow: 'shadow-xl shadow-black/40',
    glassmorphism: true,
    usesDarkTheme: true
  },
  {
    id: 'editorial',
    name: 'Editorial Serif',
    label: 'Aesthetic Editorial & Storytelling',
    description: 'Classic serif headlines paired with wide-set body copy. Ideal for coaches, agencies, authors, therapists, and personal portfolios.',
    typography: {
      heading: 'Playfair Display',
      body: 'Inter',
      importUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,400&family=Inter:wght@400;500&display=swap'
    },
    colors: {
      primary: '#1c1917',
      secondary: '#57534e',
      accent: '#854d0e',
      background: '#fdfbf7', // Antique off-white
      textPrimary: '#1c1917',
      textSecondary: '#57534e',
      cardBg: '#f5f5f4',
      border: '#e7e5e4'
    },
    spacing: {
      sectionPadding: 'py-20 md:py-28',
      elementGap: 'gap-6'
    },
    borderRadius: 'rounded-sm',
    shadow: 'shadow-md shadow-stone-200/50',
    glassmorphism: false,
    usesDarkTheme: false
  },
  {
    id: 'cinematic',
    name: 'Cinematic Visual',
    label: 'Immersive Screen Capture',
    description: 'Sleek tech-dark aesthetic focusing on glowing typography, high-impact asset blocks, and clean grids. Suited for photographers, videographers, and modern designers.',
    typography: {
      heading: 'Space Grotesk',
      body: 'Inter',
      importUrl: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap'
    },
    colors: {
      primary: '#3b82f6',
      secondary: '#94a3b8',
      accent: '#60a5fa',
      background: '#0d0e12',
      textPrimary: '#f8fafc',
      textSecondary: '#94a3b8',
      cardBg: '#1e2028',
      border: '#1f2937'
    },
    spacing: {
      sectionPadding: 'py-28 md:py-36',
      elementGap: 'gap-8'
    },
    borderRadius: 'rounded-lg',
    shadow: 'shadow-2xl shadow-blue-950/10',
    glassmorphism: true,
    usesDarkTheme: true
  },
  {
    id: 'warm-local-business',
    name: 'Warm Local Business',
    label: 'Friendly & Trustworthy Local',
    description: 'Nurturing tones, comfortable padding, and high trust signals. For dental clinics, lawyers, barber shops, craft stores, and general local service providers.',
    typography: {
      heading: 'Outfit',
      body: 'Inter',
      importUrl: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Inter:wght@400;500&display=swap'
    },
    colors: {
      primary: '#0d9488', // Teal-600
      secondary: '#4b5563',
      accent: '#f59e0b',
      background: '#fafbfc',
      textPrimary: '#0f172a',
      textSecondary: '#475569',
      cardBg: '#ffffff',
      border: '#f1f5f9'
    },
    spacing: {
      sectionPadding: 'py-16 md:py-24',
      elementGap: 'gap-5'
    },
    borderRadius: 'rounded-xl',
    shadow: 'shadow-sm border border-slate-100',
    glassmorphism: false,
    usesDarkTheme: false
  },
  {
    id: 'bold-typography',
    name: 'Bold Typography',
    label: 'Massive Headlines & High Action',
    description: 'Chunky, brutalist-influenced display headers, full-width blocks, and highly visible action CTAs. Incredible for conversion landing pages, gym coaches, and modern agencies.',
    typography: {
      heading: 'Space Grotesk',
      body: 'Inter',
      importUrl: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;800&family=Inter:wght@400;500;700&display=swap'
    },
    colors: {
      primary: '#6d28d9', // Deep Purple
      secondary: '#4b5563',
      accent: '#ec4899', // Hot Pink
      background: '#f8fafc',
      textPrimary: '#0f172a',
      textSecondary: '#334155',
      cardBg: '#ffffff',
      border: '#0f172a' // Solid layout aesthetics
    },
    spacing: {
      sectionPadding: 'py-20 md:py-28',
      elementGap: 'gap-6'
    },
    borderRadius: 'rounded-2xl',
    shadow: 'shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]', // Retro brutalist accent
    glassmorphism: false,
    usesDarkTheme: false
  },
  {
    id: 'soft-luxury',
    name: 'Soft Luxury',
    label: 'Champagne & Soft Rose',
    description: 'A delicate, premium blend of warm beige, champagne gold, and soft padding. Ideal for high-end boutique properties, aesthetic doctors, spas, or quiet luxury portfolios.',
    typography: {
      heading: 'Playfair Display',
      body: 'Inter',
      importUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Inter:wght@300;400;500&display=swap'
    },
    colors: {
      primary: '#9a3412', // Rich brown
      secondary: '#78716c',
      accent: '#c2410c',
      background: '#faf8f5',
      textPrimary: '#292524',
      textSecondary: '#78716c',
      cardBg: '#ffffff',
      border: '#f2eae1'
    },
    spacing: {
      sectionPadding: 'py-20 md:py-28',
      elementGap: 'gap-6'
    },
    borderRadius: 'rounded-3xl',
    shadow: 'shadow-lg shadow-stone-100',
    glassmorphism: false,
    usesDarkTheme: false
  }
];

export function getPresetById(id: string): StylePreset {
  return STYLE_PRESETS.find(p => p.id === id) || STYLE_PRESETS[0];
}
