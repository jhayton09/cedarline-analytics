export const site = {
  name: 'Cedarline Analytics',
  tagline: 'Business Analytics & Systems',
  positioning: 'Business Analytics & Systems for Small Businesses',
  url: 'https://cedarlineanalytics.com',
  email: 'jake@cedarlineanalytics.com',
  founder: 'Jake Hayton',
  region: 'North Carolina',
} as const;

export const mailto = {
  general: `mailto:${site.email}`,
} as const;

/** Primary site nav: conventional three items plus the one CTA (rendered separately). */
export const headerNav = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/about' },
] as const;

/** Footer nav is intentionally its own list — it also surfaces the Founding Offer and the inquiry form. */
export const footerNav = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/#services' },
  { label: 'Founding Offer', href: '/founding-offer' },
  { label: 'Start an Inquiry', href: '/#inquiry' },
] as const;

export const legalNav = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
] as const;
