import type { Metadata } from 'next'
import { LegalPage, PendingContent } from '@/components/layout/legal-page'
import { BOOKING_POLICY } from '@/content/location'

export const metadata: Metadata = {
  title: 'Všeobecné obchodní podmínky',
  alternates: { canonical: '/vseobecne-obchodni-podminky' },
  robots: { index: false, follow: true },
}

export default function Page() {
  return (
    <LegalPage title="Všeobecné obchodní podmínky">
      <h2 className="text-display-3">Rezervace a její zrušení</h2>
      <p>{BOOKING_POLICY.cancellationNote}</p>
      <p>
        Rezervaci lze zrušit osobně, telefonicky nebo prostřednictvím odkazu
        v potvrzovacím e-mailu.
      </p>
      <h2 className="text-display-3">Dárkové poukazy</h2>
      <p>
        Každý kód dárkového poukazu je unikátní a elektronicky ověřovaný, lze jej použít
        pouze jednou. Zvolenou částku není nutné vyčerpat při jedné návštěvě — lze ji
        použít kreditním způsobem. Poukazy nelze uplatnit na Happy Hours a akční masáže.
      </p>
      <h2 className="text-display-3">Akční ceny a Happy Hours</h2>
      <p>
        Akční ceny a Happy Hours se hradí pouze v hotovosti, neplatí ve dnech státního
        svátku, nezapisují se do věrnostní kartičky ani permanentky a nelze je kombinovat
        s dalšími slevami.
      </p>
      <PendingContent source="montra.cz/beroun/vseobecne-obchodni-podminky" />
    </LegalPage>
  )
}
