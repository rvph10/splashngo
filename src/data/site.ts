// Site-wide settings and navigation. Edit contact details here only.
import { PUBLIC_PREVIEW, PUBLIC_UMAMI_SRC, PUBLIC_UMAMI_WEBSITE_ID } from 'astro:env/client';

const PHONE = '+32469175354'; // international format, digits only after the +
const WHATSAPP_MESSAGE = 'Bonjour Splashngo, je souhaite un devis pour ';

export const site = {
  name: 'Splashngo',
  title: 'Splashngo | Société de nettoyage à Bruxelles',
  description:
    "Société de nettoyage à Bruxelles et environs : remise en état, vitres, gouttières, panneaux solaires, terrasses, bureaux. Devis sous 48 heures.",
  phone: { label: '+32 469 17 53 54', href: `tel:${PHONE}` },
  whatsapp: { label: 'WhatsApp', href: `https://wa.me/${PHONE.slice(1)}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}` },
  // TODO: placeholder address, replace with the real one
  email: { label: 'contact@splashngo.be', href: 'mailto:contact@splashngo.be' },
  instagram: { label: '@splashngo_be', href: 'https://www.instagram.com/splashngo_be/' },
  // Service area: Brussels and the surrounding municipalities.
  area: { short: 'Bruxelles et environs', phrase: 'à Bruxelles et dans ses environs' },
  /** Client test link: pages are noindex and robots.txt blocks crawlers (see .env.example). */
  preview: PUBLIC_PREVIEW,
  /** Self-hosted Umami analytics, set in .env (see .env.example). Disabled while empty. */
  umami: { src: PUBLIC_UMAMI_SRC, websiteId: PUBLIC_UMAMI_WEBSITE_ID },
};

export const mainNav = [
  { label: 'Comment ça marche', href: '/#etapes' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/contact' },
];

export const footerNav = [
  {
    title: 'Services',
    links: [
      { label: 'Logement', href: '/services#logement' },
      { label: 'Extérieur', href: '/services#exterieur' },
      { label: 'Professionnels', href: '/services#professionnels' },
    ],
  },
  {
    title: 'Splashngo',
    links: [
      { label: 'Accueil', href: '/' },
      { label: 'Tous les services', href: '/services' },
      { label: 'Demander un devis', href: '/contact' },
    ],
  },
  {
    title: 'Informations',
    links: [
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'Confidentialité', href: '/politique-de-confidentialite' },
    ],
  },
];

export const socials = [
  { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/splashngo_be/' },
  { label: 'WhatsApp', icon: 'whatsapp', href: `https://wa.me/${PHONE.slice(1)}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}` },
] as const;
