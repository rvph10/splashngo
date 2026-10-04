// schema.org structured data (JSON-LD) for search engines.
import { site } from '../data/site';

const PHONE = site.phone.href.replace('tel:', '');

export function businessId(base: URL) {
  return new URL('/#business', base).href;
}

/** The business itself, on every page. No ratings: only real, verifiable data. */
export function localBusiness(base: URL, services: { title: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': businessId(base),
    name: site.name,
    description: site.description,
    url: new URL('/', base).href,
    telephone: PHONE,
    email: site.email.label,
    image: new URL('/og-image.png', base).href,
    logo: new URL('/apple-touch-icon.png', base).href,
    sameAs: [site.instagram.href],
    address: { '@type': 'PostalAddress', addressLocality: 'Bruxelles', addressRegion: 'Bruxelles-Capitale', addressCountry: 'BE' },
    areaServed: [
      { '@type': 'City', name: 'Bruxelles' },
      { '@type': 'AdministrativeArea', name: 'Région de Bruxelles-Capitale' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services de nettoyage',
      itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, url: s.url } })),
    },
  };
}

export function service(base: URL, s: { title: string; description: string; url: string; image: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    description: s.description,
    url: s.url,
    image: s.image,
    serviceType: s.title,
    provider: { '@id': businessId(base) },
    areaServed: { '@type': 'City', name: 'Bruxelles' },
  };
}

export function breadcrumbs(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: item.url })),
  };
}

export function faqPage(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((q) => ({ '@type': 'Question', name: q.question, acceptedAnswer: { '@type': 'Answer', text: q.answer } })),
  };
}

/** Safe to inline in a <script> tag. */
export const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');
