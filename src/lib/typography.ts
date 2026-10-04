/**
 * French typography: non-breaking space before ? ! : ; so the sign never
 * wraps onto its own line. Lets content files use plain spaces.
 */
export function frenchSpacing(text: string): string {
  return text.replace(/ ([?!:;])/g, ' $1');
}
