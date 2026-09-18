import type { Metadata, Viewport } from 'next'
import { EB_Garamond, Inter } from 'next/font/google'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { LOCATION } from '@/content/location'
import './globals.css'

/**
 * The brief asked for Cormorant Garamond. Its latin-ext subset lacks the
 * precomposed Czech carons (ě š č ř ž), so the browser synthesises them from
 * combining marks and they land visibly off the letter — unacceptable on a
 * Czech-language site. EB Garamond is the same Garamond revival with correct
 * Czech glyphs, so the intended look survives the swap.
 */
const garamond = EB_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-garamond',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.montra.cz'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Montra Beroun — thajské masáže na Slapské 130',
    template: '%s | Montra Beroun',
  },
  description:
    'Tradiční thajské a relaxační masáže v Berouně. Rezervujte online, Po–So 9:00–20:00, Slapská 130.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'Montra Beroun',
    title: 'Montra Beroun — thajské masáže',
    description:
      'Tradiční thajské a relaxační masáže v Berouně. Rezervujte online, Po–So 9:00–20:00.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#FFF5E6',
  width: 'device-width',
  initialScale: 1,
}

/** LocalBusiness structured data. No reviews or ratings are fabricated. */
function StructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    name: LOCATION.name,
    alternateName: LOCATION.legalName,
    url: SITE_URL,
    telephone: LOCATION.phone.e164,
    email: LOCATION.email,
    image: `${SITE_URL}/opengraph-image.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: LOCATION.address.street,
      addressLocality: LOCATION.address.city,
      postalCode: LOCATION.address.postalCode,
      addressCountry: LOCATION.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: LOCATION.geo.lat,
      longitude: LOCATION.geo.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '09:00',
        closes: '20:00',
      },
    ],
    sameAs: [LOCATION.social.facebook],
    currenciesAccepted: 'CZK',
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${garamond.variable} ${inter.variable}`}>
      <body>
        <a href="#obsah" className="sr-only-focusable">
          Přejít na obsah
        </a>
        <Header />
        <main id="obsah">{children}</main>
        <Footer />
        <StructuredData />
      </body>
    </html>
  )
}
