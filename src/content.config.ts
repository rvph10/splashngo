import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const faqItem = z.object({ question: z.string(), answer: z.string() });

// One Markdown file per service. The body is the opening paragraph of the service page.
const services = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(), // used on cards and in menus
      description: z.string(), // meta description (~150 characters)
      category: z.enum(['logement', 'exterieur', 'professionnels']),
      alsoIn: z.array(z.enum(['logement', 'exterieur', 'professionnels'])).default([]),
      order: z.number(),
      icon: image(),
      image: image(),
      included: z.array(z.string()).default([]),
      faq: z.array(faqItem).default([]),
    }),
});

export const collections = { services };
