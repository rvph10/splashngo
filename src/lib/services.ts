import { getCollection, type CollectionEntry } from 'astro:content';
import { categories, type CategoryId } from '../data/content';

export type Service = CollectionEntry<'services'>;

export async function getServices(): Promise<Service[]> {
  return (await getCollection('services')).sort((a, b) => a.data.order - b.data.order);
}

/** Categories in order, each with its services (including those listed via `alsoIn`). */
export async function getServiceGroups() {
  const services = await getServices();
  return categories.map((category) => ({
    ...category,
    services: services.filter(
      (s) => s.data.category === category.id || s.data.alsoIn.includes(category.id as CategoryId),
    ),
  }));
}
