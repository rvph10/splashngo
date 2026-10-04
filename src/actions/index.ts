import { ActionError, defineAction } from 'astro:actions';
import { getEntry } from 'astro:content';
import { CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL, RESEND_API_KEY } from 'astro:env/server';
import { z } from 'astro/zod';
import { Resend } from 'resend';
import { businessEmail, customerEmail } from '../emails/contact';

const resend = new Resend(RESEND_API_KEY);

// Empty form fields arrive as null, so optional fields must accept it.
const optionalText = z.string().trim().nullish();

export const server = {
  contact: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string({ error: 'Veuillez indiquer votre nom.' }).trim().min(1, 'Veuillez indiquer votre nom.').max(120),
      email: z.email({ error: 'Adresse e-mail invalide.' }),
      phone: optionalText.refine((value) => !value || /^[+\d][\d\s./-]{7,}$/.test(value), {
        message: 'Numéro de téléphone invalide.',
      }),
      service: optionalText,
      message: z
        .string({ error: 'Veuillez écrire un message.' })
        .trim()
        .min(10, 'Votre message est trop court.')
        .max(5000, 'Votre message est trop long.'),
      // Honeypot: hidden field, real visitors leave it empty.
      website: z.string().max(0).nullish(),
    }),
    handler: async ({ name, email, phone, service, message }) => {
      const serviceEntry = service && service !== 'autre' ? await getEntry('services', service) : undefined;
      const request = { name, email, phone, message, serviceLabel: serviceEntry?.data.title ?? 'Autre demande' };

      // 1. Notify Splashngo. This one must succeed.
      const notification = businessEmail(request);
      const { error } = await resend.emails.send({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL,
        replyTo: email,
        ...notification,
      });
      if (error) {
        console.error('Contact notification e-mail failed', error);
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: "L'envoi a échoué. Réessayez dans quelques minutes, ou appelez-nous ou écrivez-nous sur WhatsApp.",
        });
      }

      // 2. Confirm to the visitor. A failure here must not fail the request,
      //    since Splashngo already has the message.
      const { error: confirmationError } = await resend.emails.send({
        from: CONTACT_FROM_EMAIL,
        to: email,
        replyTo: CONTACT_TO_EMAIL,
        ...customerEmail(request),
      });
      if (confirmationError) console.error('Contact confirmation e-mail failed', confirmationError);

      return { service: serviceEntry?.id ?? 'autre' };
    },
  }),
};
