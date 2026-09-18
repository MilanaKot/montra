import type { Metadata } from 'next'
import { LegalPage, PendingContent } from '@/components/layout/legal-page'

export const metadata: Metadata = {
  title: 'Cookies',
  alternates: { canonical: '/cookies' },
  robots: { index: false, follow: true },
}

export default function Page() {
  return (
    <LegalPage title="Cookies" lede="Správa předvoleb a přehled používaných cookies.">
      <p>
        Web používá pouze technicky nezbytné cookies potřebné k tomu, aby fungovala
        rozpracovaná rezervace. Analytické ani marketingové nástroje zatím nenasazujeme.
      </p>
      <PendingContent source="montra.cz/beroun/cookies-sprava-predvoleb" />
    </LegalPage>
  )
}
