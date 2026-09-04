export const site = {
  name: 'Cedarline Analytics',
  tagline: 'Business Analytics & Systems',
  url: 'https://cedarlineanalytics.com',
  email: 'jake@cedarlineanalytics.com',
  founder: 'Jake Hayton',
  region: 'North Carolina',
} as const;

export const mailto = {
  general: `mailto:${site.email}?subject=${encodeURIComponent('Cedarline Analytics inquiry')}`,
  foundingOffer: `mailto:${site.email}?subject=${encodeURIComponent('Founding Client Inquiry')}`,
} as const;

export const nav = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Founding Offer', href: '#founding-offer' },
  { label: 'Contact', href: '#contact' },
] as const;
