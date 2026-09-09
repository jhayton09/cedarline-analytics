import { FAQ } from '@/components/FAQ';
import { Founder } from '@/components/Founder';
import { FoundingOffer } from '@/components/FoundingOffer';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { InquirySection } from '@/components/InquirySection';
import { MobileStickyCta } from '@/components/MobileStickyCta';
import { Problems } from '@/components/Problems';
import { Services } from '@/components/Services';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { WorkNav } from '@/components/WorkNav';
import { homeFaq } from '@/content/faq';
import { homeSteps } from '@/content/how-it-works';
import { services } from '@/content/services';
import { site } from '@/content/site';

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

/** Mirrors the FAQ section verbatim — same source array, same wording, no new claims. */
const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: homeFaq.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Problems />
        <HowItWorks
          id="how-it-works"
          heading="From business problem to working system in three steps."
          steps={homeSteps}
        />
        <WorkNav />
        <Services />
        <FoundingOffer />
        <FAQ />
        <Founder />
        <InquirySection />
      </main>
      <SiteFooter />
      <MobileStickyCta href="#inquiry" targetId="inquiry" />
    </>
  );
}
