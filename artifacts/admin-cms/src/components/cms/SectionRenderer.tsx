import React from 'react';
import { CMSSection } from '@/lib/cms-types';

// These would be imported from your component library
// For now, I'll create placeholders that we can flesh out
import { Hero } from '@/components/sections/hero';
import { Stats } from '@/components/sections/stats';
import { TripGrid } from '@/components/sections/trip-grid';
import { FAQSection } from '@/components/sections/faq';
import { ContentBlock } from '@/components/sections/content-block';

interface SectionRendererProps {
  section: CMSSection;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({ section }) => {
  if (section.isVisible === false) return null;

  switch (section.type) {
    case 'hero':
      return <Hero data={section.data} />;
    case 'stats':
      return <Stats data={section.data} />;
    case 'trips':
      return <TripGrid data={section.data} />;
    case 'faq':
      return <FAQSection data={section.data} />;
    case 'content':
      return <ContentBlock data={section.data} />;
    default:
      return <div>Unknown section type: {section.type}</div>;
  }
};
