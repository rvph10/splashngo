// Umami events (no-op when Umami is not loaded). Event names and properties:
//   clic-telephone | clic-whatsapp | clic-email | clic-instagram | clic-devis
//       { emplacement }  where the link sits (data-zone of the closest ancestor)
//   envoi-formulaire     { service }   contact form sent successfully
//   ouverture-faq        { question }  an FAQ answer was opened
// Umami adds the page URL to every event.

type Umami = { track: (event: string, data?: Record<string, string>) => void };
const umami = () => (window as unknown as { umami?: Umami }).umami;
const track = (event: string, data?: Record<string, string>) => {
  if (umami()) umami()!.track(event, data);
  else window.addEventListener('load', () => umami()?.track(event, data), { once: true });
};

const linkEvent = (href: string): string | undefined => {
  if (href.startsWith('tel:')) return 'clic-telephone';
  if (href.includes('wa.me/')) return 'clic-whatsapp';
  if (href.startsWith('mailto:')) return 'clic-email';
  if (href.includes('instagram.com')) return 'clic-instagram';
  if (href.startsWith('/contact')) return 'clic-devis';
};

document.addEventListener('click', (e) => {
  const link = (e.target as Element).closest?.<HTMLAnchorElement>('a[href]');
  if (!link) return;
  const event = linkEvent(link.getAttribute('href')!);
  if (!event) return;
  const zone = link.closest<HTMLElement>('[data-zone]')?.dataset.zone ?? 'contenu';
  track(event, { emplacement: zone });
});

// Contact page after a successful send (rendered with data-form-sent="<service id>").
const sent = document.querySelector<HTMLElement>('[data-form-sent]');
if (sent) track('envoi-formulaire', { service: sent.dataset.formSent! });

document.querySelectorAll<HTMLDetailsElement>('.faq details').forEach((details) =>
  details.addEventListener('toggle', () => {
    const question = details.querySelector('summary')?.textContent?.trim();
    if (details.open && question) track('ouverture-faq', { question });
  }),
);
