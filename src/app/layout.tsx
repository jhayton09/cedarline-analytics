import type { Metadata, Viewport } from 'next';
import { Inter, Instrument_Sans } from 'next/font/google';
import { site } from '@/content/site';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const display = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

const description =
  'Cedarline Analytics builds dashboards, forecasts, and spreadsheet systems that turn scattered business data into clear numbers for small businesses.';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description,
  applicationName: site.name,
  authors: [{ name: site.founder }],
  creator: site.founder,
  keywords: [
    'business analytics',
    'small business dashboards',
    'management reporting',
    'financial modeling',
    'forecasting',
    'spreadsheet automation',
    'Excel consultant',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | ${site.tagline}`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
};

/**
 * No <SiteHeader>/<SiteFooter>/<main> here: /founding-offer uses a
 * deliberately minimal header instead of the full site nav, so header, the
 * <main id="main"> skip-link target, and footer are all composed per-page
 * rather than once globally. Home, /work, /privacy and /terms all render the
 * standard <SiteHeader> + <SiteFooter> themselves.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-ink-900 focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
