import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const isSanityLive = Boolean(projectId && projectId !== 'demo-project');

export const sanityClient = isSanityLive
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
    })
  : null;

const builder = isSanityLive && sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlForImage(source: any) {
  if (!builder || !source) return '';
  return builder.image(source).auto('format').fit('max').url();
}
