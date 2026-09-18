import type { NextConfig } from 'next'

/**
 * Old montra.cz/beroun URLs -> new routes. See docs/content-migration.md.
 * All permanent (301) so existing search rankings carry over.
 */
const LEGACY_REDIRECTS = [
  ['/beroun', '/'],
  ['/beroun/cenik-a-druhy-masazi', '/masaze'],
  ['/beroun/nase-maserky', '/o-nas#tym'],
  ['/beroun/fotogalerie', '/o-nas#galerie'],
  ['/beroun/neco-o-nas', '/o-nas'],
  ['/beroun/kontakt', '/kontakt'],
  ['/beroun/darkovy-poukaz', '/darkove-poukazy'],
  ['/beroun/e-shop', '/darkove-poukazy'],
  ['/beroun/nakupni-kosik', '/darkove-poukazy'],
  ['/beroun/specialni-akce', '/akce'],
  ['/beroun/vseobecne-obchodni-podminky', '/vseobecne-obchodni-podminky'],
  ['/beroun/zasady-zpracovani-osobnich-udaju', '/zasady-zpracovani-osobnich-udaju'],
  ['/beroun/cookies-sprava-predvoleb', '/cookies'],
  // Numbered promo pages from the legacy CMS.
  ['/beroun/akce/481/:slug*', '/akce#happy-hours'],
  ['/beroun/akce/14/:slug*', '/darkove-poukazy'],
  ['/beroun/akce/193/:slug*', '/akce#vernostni-karta'],
  ['/beroun/akce/282/:slug*', '/akce#permanentky'],
  ['/beroun/akce/:id/:slug*', '/akce'],
] as const

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return LEGACY_REDIRECTS.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }))
  },
}

export default nextConfig
