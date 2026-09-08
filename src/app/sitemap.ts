import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

// /privacy and /terms are deliberately excluded: they are draft shells (see
// their `robots: { index: false }` metadata) and are not part of the sitemap
// until real compliance copy replaces the placeholder content.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: site.url, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/work`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/founding-offer`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
  ];
}
