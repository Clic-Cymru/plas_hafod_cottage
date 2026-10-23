import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'iji5mij0';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const isSanityLive = Boolean(projectId && projectId !== 'demo-project');

export const sanityClient = isSanityLive
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // Guardrail: Use Sanity edge CDN in production (1,000,000 free requests/mo)
      // and fresh data in local development.
      useCdn: process.env.NODE_ENV === 'production',
    })
  : null;

const builder = isSanityLive && sanityClient ? createImageUrlBuilder(sanityClient) : null;

export function urlForImage(source: any) {
  if (!builder || !source) return '';
  return builder.image(source).auto('format').fit('max').url();
}
