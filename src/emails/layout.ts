// HTML e-mail shell in the site's style: white card, logo, blue band with the
// scalloped edge, pill buttons. Table layout + inline styles for mail clients.
import { site } from '../data/site';

export const colors = {
  ink: '#0f1e33',
  muted: '#4d5b6e',
  accent: '#40b4fd',
  primary: '#1478c8',
  surface: '#eef4fa',
  line: '#e2e8f0',
};
const font = "'Plus Jakarta Sans', 'Helvetica Neue', Arial, sans-serif";

/** Escapes user input before it goes into HTML. */
export const esc = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/** Plain text to HTML: escaped, line breaks kept. */
export const multiline = (value: string) => esc(value).replace(/\r?\n/g, '<br>');

export function button(label: string, href: string, variant: 'primary' | 'light' = 'primary') {
  const bg = variant === 'primary' ? colors.primary : colors.surface;
  const fg = variant === 'primary' ? '#ffffff' : colors.ink;
  return `<a href="${esc(href)}" style="display:inline-block;margin:0 8px 10px 0;padding:14px 22px;border-radius:12px;background:${bg};color:${fg};font-family:${font};font-size:15px;font-weight:600;line-height:1.2;text-decoration:none">${label}</a>`;
}

/** Label / value rows (values must already be escaped). */
export function details(rows: [string, string][]) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 0;border-bottom:1px solid ${colors.line};width:120px;vertical-align:top;font-family:${font};font-size:14px;color:${colors.muted}">${label}</td><td style="padding:10px 0;border-bottom:1px solid ${colors.line};vertical-align:top;font-family:${font};font-size:15px;font-weight:600;color:${colors.ink}">${value}</td></tr>`,
    )
    .join('')}</table>`;
}

/** Grey box for the visitor's message (value must already be escaped). */
export const quote = (html: string) =>
  `<div style="margin-top:8px;padding:18px 20px;border-radius:12px;background:${colors.surface};font-family:${font};font-size:15px;line-height:1.6;color:${colors.ink}">${html}</div>`;

export const heading = (text: string) =>
  `<p style="margin:28px 0 8px;font-family:${font};font-size:13px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:${colors.muted}">${text}</p>`;

export const paragraph = (html: string) =>
  `<p style="margin:0 0 16px;font-family:${font};font-size:16px;line-height:1.6;color:${colors.muted}">${html}</p>`;

interface LayoutOptions {
  /** Inbox preview line. */
  preheader: string;
  title: string;
  intro: string;
  body: string;
  /** Small print under the footer. */
  note?: string;
}

export function layout({ preheader, title, intro, body, note }: LayoutOptions) {
  const base = import.meta.env.SITE ?? 'https://www.splashngo.be';
  const asset = (path: string) => new URL(path, base).href;
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background:${colors.surface}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${colors.surface}">
<tr><td align="center" style="padding:32px 12px">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden">
    <tr><td align="center" style="padding:28px 32px 24px">
      <a href="${base}"><img src="${asset('/email/logo.png')}" width="176" height="38" alt="${site.name}" style="display:block;border:0"></a>
    </td></tr>
    <tr><td style="background:${colors.accent};padding:32px 32px 20px;text-align:center">
      <h1 style="margin:0 0 10px;font-family:${font};font-size:28px;line-height:1.2;font-weight:700;letter-spacing:-0.5px;color:${colors.ink}">${title}</h1>
      <p style="margin:0;font-family:${font};font-size:16px;line-height:1.6;color:${colors.ink}">${intro}</p>
    </td></tr>
    <tr><td style="line-height:0;font-size:0"><img src="${asset('/email/scallop.png')}" width="600" height="12" alt="" style="display:block;width:100%;height:auto;border:0"></td></tr>
    <tr><td style="padding:24px 32px 32px">${body}</td></tr>
    <tr><td style="padding:24px 32px;border-top:1px solid ${colors.line};text-align:center;font-family:${font};font-size:13px;line-height:1.6;color:${colors.muted}">
      <strong style="color:${colors.ink}">${site.name}</strong>, nettoyage intérieur, extérieur et professionnel ${site.area.phrase}<br>
      <a href="${site.phone.href}" style="color:${colors.primary};text-decoration:none">${site.phone.label}</a>
      &nbsp;·&nbsp; <a href="${site.whatsapp.href}" style="color:${colors.primary};text-decoration:none">WhatsApp</a>
      &nbsp;·&nbsp; <a href="${base}" style="color:${colors.primary};text-decoration:none">${new URL(base).hostname}</a>
      ${note ? `<br><span style="font-size:12px">${note}</span>` : ''}
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}
