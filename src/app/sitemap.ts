import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

// /privacy now carries the approved policy and is indexable. /terms is
// still a draft shell (see its `robots: { index: false }` metadata) and
// stays out of the sitemap until real compliance copy replaces it.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: site.url, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/work`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/founding-offer`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/about`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${site.url}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
