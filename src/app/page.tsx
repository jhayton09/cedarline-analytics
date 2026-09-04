import { About } from '@/components/About';
import { Approach } from '@/components/Approach';
import { Contact } from '@/components/Contact';
import { FoundingOffer } from '@/components/FoundingOffer';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { StartingPoints } from '@/components/StartingPoints';
import { Work } from '@/components/Work';
import { site } from '@/content/site';
import { services } from '@/content/services';

/**
 * Describes the business itself. Nothing here is a claim the page does not also
 * make in plain text — no ratings, no review counts, no invented credentials.
 */
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.name,
  description:
    'Business analytics and systems consultancy for small businesses: dashboards, management reporting, financial modeling, forecasting and spreadsheet automation.',
  url: site.url,
  email: site.email,
  founder: { '@type': 'Person', name: site.founder },
  areaServed: { '@type': 'Country', name: 'United States' },
  address: { '@type': 'PostalAddress', addressRegion: 'NC', addressCountry: 'US' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: services.map((service) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: service.title, description: service.summary },
    })),
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
      <StartingPoints />
      <Services />
      <Work />
      <Approach />
      <About />
      <FoundingOffer />
      <Contact />
    </>
  );
}
