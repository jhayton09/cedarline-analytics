import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

// /privacy and /terms both now carry approved, indexable policy content.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: site.url, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/work`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/founding-offer`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/about`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${site.url}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${site.url}/terms`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
