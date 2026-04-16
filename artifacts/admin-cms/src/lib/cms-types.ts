export type SectionType = 
  | 'hero' 
  | 'stats' 
  | 'content' 
  | 'trips' 
  | 'faq' 
  | 'testimonials' 
  | 'cta';

export interface CMSSection {
  id: string;
  type: SectionType;
  data: any;
  isVisible?: boolean;
}

export interface HeroData {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
  layout?: 'centered' | 'left' | 'split';
}

export interface StatsData {
  items: Array<{
    label: string;
    value: string;
  }>;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContentData {
  html: string;
}

export interface SEOData {
  title: string;
  description: string;
  ogImage?: string;
}
