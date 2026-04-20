import { useEffect } from "react";
import { useSettings } from "@/hooks/use-settings";

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
  faqSchema?: Array<{ question: string; answer: string }>;
  focusKeyword?: string;
}

export function SEO({ title, description, image, canonicalUrl, faqSchema, focusKeyword }: SeoProps) {
  const { data: settings } = useSettings();

  useEffect(() => {
    // 1. Update Document Title
    const siteName = settings?.organization?.name || "YouthCamping";
    const finalTitle = title || siteName;
    document.title = finalTitle;

    // 2. Update Meta Description
    const metaDescription = description || "Discover curated tour packages and adventures with YouthCamping.";
    updateMetaName('description', metaDescription);
    if (focusKeyword) updateMetaName('keywords', focusKeyword);

    // 3. Update OpenGraph Tags
    updateMetaTag('og:title', finalTitle);
    updateMetaTag('og:description', metaDescription);
    if (image) updateMetaTag('og:image', image);
    updateMetaTag('og:type', 'website');
    updateMetaTag('og:url', window.location.href);

    // 4. Handle Canonical URL
    let canLink = document.querySelector('link[rel="canonical"]');
    if (!canLink) {
      canLink = document.createElement('link');
      canLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canLink);
    }
    canLink.setAttribute('href', canonicalUrl || window.location.href);

    // 5. Inject FAQ Schema (JSON-LD)
    const existingSchema = document.getElementById('faq-schema');
    if (existingSchema) existingSchema.remove();

    if (faqSchema && faqSchema.length > 0) {
      const script = document.createElement('script');
      script.id = 'faq-schema';
      script.type = 'application/ld+json';
      const ldData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqSchema.map(f => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer
          }
        }))
      };
      script.text = JSON.stringify(ldData);
      document.head.appendChild(script);
    }
    
  }, [title, description, image, settings, canonicalUrl, faqSchema, focusKeyword]);

  return null;
}

function updateMetaTag(property: string, content: string) {
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function updateMetaName(name: string, content: string) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}
