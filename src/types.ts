export interface Asset {
  id: string;
  projectId: string;
  name: string;
  type: 'image' | 'video' | 'logo' | 'icon' | 'document';
  url: string; // Base64 dataURL or direct reference url
  role: 'hero' | 'gallery' | 'background' | 'testimonial' | 'logo' | 'cta' | 'map' | 'unassigned';
  size: string; // e.g., "1.2 MB"
  width?: number;
  height?: number;
  orientation?: 'landscape' | 'portrait' | 'square';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  businessType: string;
  targetObjective: string;
  whatsappNumber: string;
  emailContact: string;
  phoneContact: string;
  addressContact: string;
  createdAt: string;
  updatedAt: string;
}

export interface StylePreset {
  id: string;
  name: string;
  label: string;
  description: string;
  typography: {
    heading: string;
    body: string;
    importUrl: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    textPrimary: string;
    textSecondary: string;
    cardBg: string;
    border: string;
  };
  spacing: {
    sectionPadding: string;
    elementGap: string;
  };
  borderRadius: string; // 'none' | 'sm' | 'md' | 'lg' | 'full'
  shadow: string;       // 'none' | 'sm' | 'md' | 'lg' | 'xl'
  glassmorphism: boolean;
  usesDarkTheme: boolean;
}

export interface SectionContent {
  id: string;
  type: 'hero' | 'about' | 'services' | 'benefits' | 'gallery' | 'process' | 'testimonials' | 'faqs' | 'contact' | 'footer' | 'legal';
  title: string;
  subtitle?: string;
  description?: string;
  items?: Array<{
    title?: string;
    description?: string;
    image?: string;
    icon?: string;
    badge?: string;
  }>;
  primaryCta?: {
    text: string;
    link: string;
  };
  secondaryCta?: {
    text: string;
    link: string;
  };
}

export interface GeneratedWebsite {
  title: string;
  tagline: string;
  description: string;
  keywords: string;
  businessName: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  preset: StylePreset;
  sections: SectionContent[];
  seoChecklist: {
    hasH1: boolean;
    h1Text: string;
    altTagsCount: number;
    altTagsTotal: number;
    hasMetaDescription: boolean;
    hasKeywords: boolean;
    hasFavicon: boolean;
    hasWhatsAppButton: boolean;
    hasStructuredData: boolean;
    score: number; // 0 - 100
  };
  schemaMarkup: string; // JSON-LD schema
}

export interface VersionHistory {
  id: string;
  projectId: string;
  timestamp: string;
  promptUsed: string;
  website: GeneratedWebsite;
  stylePresetId: string;
}
