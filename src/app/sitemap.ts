import type { MetadataRoute } from 'next'
import { SERVICES } from '@/content/services'
import { SITE_URL as SITE } from '@/lib/site-url'


export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/masaze', '/akce', '/darkove-poukazy', '/o-nas', '/kontakt']
  return [
    ...pages.map((p) => ({
      url: `${SITE}${p}`,
      changeFrequency: 'weekly' as const,
      priority: p === '' ? 1 : 0.8,
    })),
    ...SERVICES.map((s) => ({
      url: `${SITE}/masaze/${s.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
