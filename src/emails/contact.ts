// The two e-mails sent by the contact form: notification to Splashngo and
// confirmation to the visitor. Each returns { subject, html, text }.
import { site } from '../data/site';
import { button, details, esc, heading, layout, multiline, paragraph, quote } from './layout';

export interface ContactRequest {
  name: string;
  email: string;
  phone?: string | null;
  serviceLabel: string;
  message: string;
}

const NBSP = ' ';
/** "+32 470 12 34 56" / "0470 12 34 56" → "32470123456" for wa.me links. */
const waNumber = (phone: string) => {
  const digits = phone.replace(/[^\d+]/g, '');
  if (digits.startsWith('+')) return digits.slice(1);
  if (digits.startsWith('00')) return digits.slice(2);
  if (digits.startsWith('0')) return `32${digits.slice(1)}`;
  return digits;
};

export function businessEmail(r: ContactRequest) {
  const firstName = r.name.split(' ')[0];
  const buttons = [
    button('Répondre par e-mail', `mailto:${r.email}?subject=${encodeURIComponent(`Votre demande de devis ${site.name}`)}`),
    r.phone && button('Appeler', `tel:${r.phone.replace(/[^\d+]/g, '')}`, 'light'),
    r.phone && button('WhatsApp', `https://wa.me/${waNumber(r.phone)}`, 'light'),
  ]
    .filter(Boolean)
    .join('');

  return {
    subject: `Nouvelle demande, ${r.serviceLabel}, ${r.name}`,
    html: layout({
      preheader: `${r.name} demande un devis pour ${r.serviceLabel}.`,
      title: 'Nouvelle demande de devis',
      intro: `${esc(r.name)} a envoyé une demande depuis le site.`,
      body: [
        details([
          ['Nom', esc(r.name)],
          ['E-mail', `<a href="mailto:${esc(r.email)}" style="color:#1478c8;text-decoration:none">${esc(r.email)}</a>`],
          ['Téléphone', r.phone ? esc(r.phone) : 'Non renseigné'],
          ['Service', esc(r.serviceLabel)],
        ]),
        heading('Message'),
        quote(multiline(r.message)),
        `<div style="margin-top:24px">${buttons}</div>`,
        paragraph(`<span style="font-size:14px">Répondre à cet e-mail écrit directement à ${esc(firstName)}. Un e-mail de confirmation lui a été envoyé.</span>`),
      ].join(''),
    }),
    text: [
      `Nouvelle demande de devis`,
      '',
      `Nom${NBSP}: ${r.name}`,
      `E-mail${NBSP}: ${r.email}`,
      `Téléphone${NBSP}: ${r.phone || 'non renseigné'}`,
      `Service${NBSP}: ${r.serviceLabel}`,
      '',
      r.message,
    ].join('\n'),
  };
}

export function customerEmail(r: ContactRequest) {
  const firstName = r.name.split(' ')[0];
  return {
    subject: 'Nous avons bien reçu votre demande',
    html: layout({
      preheader: 'Nous revenons vers vous sous 48 heures avec un devis adapté.',
      title: 'Nous avons bien reçu votre demande',
      intro: `Merci ${esc(firstName)}, nous revenons vers vous sous 48${NBSP}heures avec un devis adapté.`,
      body: [
        paragraph(`Bonjour ${esc(firstName)},`),
        paragraph(`Merci d'avoir contacté ${site.name}. Nous étudions votre demande et vous envoyons un devis précis sous 48${NBSP}heures. Si nous avons besoin d'une précision, nous vous contacterons avant.`),
        heading('Votre demande'),
        details([['Service', esc(r.serviceLabel)]]),
        quote(multiline(r.message)),
        heading('Pour aller plus vite'),
        paragraph(`Envoyez-nous quelques photos sur WhatsApp${NBSP}: c'est souvent le moyen le plus rapide d'obtenir un devis précis. Pour une demande urgente, appelez-nous directement.`),
        `<div style="margin-top:8px">${button('Envoyer des photos sur WhatsApp', site.whatsapp.href)}${button(`Appeler le ${site.phone.label}`, site.phone.href, 'light')}</div>`,
        paragraph(`<span style="font-size:14px">Vous pouvez aussi répondre directement à cet e-mail.</span>`),
      ].join(''),
      note: `Vous recevez cet e-mail car vous avez envoyé une demande de devis sur notre site.`,
    }),
    text: [
      `Bonjour ${firstName},`,
      '',
      `Merci d'avoir contacté ${site.name}. Nous avons bien reçu votre demande et vous envoyons un devis précis sous 48 heures.`,
      '',
      `Service${NBSP}: ${r.serviceLabel}`,
      `Votre message${NBSP}:`,
      r.message,
      '',
      `Pour aller plus vite, envoyez-nous quelques photos sur WhatsApp${NBSP}: ${site.whatsapp.href}`,
      `Une question${NBSP}? Appelez-nous au ${site.phone.label} ou répondez simplement à cet e-mail.`,
      '',
      `L'équipe ${site.name}`,
    ].join('\n'),
  };
}
