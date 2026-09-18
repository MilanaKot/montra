import type { MetadataRoute } from 'next'
import { SERVICES } from '@/content/services'

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.montra.cz'

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
