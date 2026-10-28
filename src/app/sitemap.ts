import type { MetadataRoute } from 'next';

const BASE_URL = 'https://plashafodcottage.co.uk';

interface PageRoute {
  path: string;
  pathCy: string;
  priority: number;
  changeFrequency: 'weekly' | 'monthly' | 'yearly';
}

const routes: PageRoute[] = [
  {
    path: '',
    pathCy: '/cy',
    priority: 1.0,
    changeFrequency: 'weekly',
  },
  {
    path: '/bryn-bugeiliaid-bach',
    pathCy: '/cy/bryn-bugeiliaid-bach',
    priority: 0.9,
    changeFrequency: 'weekly',
  },
  {
    path: '/local-area',
    pathCy: '/cy/local-area',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  {
    path: '/reviews',
    pathCy: '/cy/reviews',
    priority: 0.8,
    changeFrequency: 'weekly',
  },
  {
    path: '/contact',
    pathCy: '/cy/contact',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  {
    path: '/terms',
    pathCy: '/cy/terms',
    priority: 0.5,
    changeFrequency: 'yearly',
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    const enUrl = `${BASE_URL}${route.path}`;
    const cyUrl = `${BASE_URL}${route.pathCy}`;

    // English entry
    entries.push({
      url: enUrl,
      lastModified: currentDate,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          'en-GB': enUrl,
          'cy-GB': cyUrl,
        },
      },
    });

    // Welsh entry
    entries.push({
      url: cyUrl,
      lastModified: currentDate,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          'en-GB': enUrl,
          'cy-GB': cyUrl,
        },
      },
    });
  }

  return entries;
}
