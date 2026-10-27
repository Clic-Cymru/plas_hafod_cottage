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
      token: process.env.SANITY_API_WRITE_TOKEN,
      // Always fetch fresh data so confirmed bookings and blocked dates reflect immediately
      useCdn: false,
    })
  : null;

const builder = isSanityLive && sanityClient ? createImageUrlBuilder(sanityClient) : null;

export function urlForImage(source: any) {
  if (!builder || !source) return '';
  return builder.image(source).auto('format').fit('max').url();
}
