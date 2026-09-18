import type { Metadata } from 'next'
import { LegalPage, PendingContent } from '@/components/layout/legal-page'

export const metadata: Metadata = {
  title: 'Zásady zpracování osobních údajů',
  alternates: { canonical: '/zasady-zpracovani-osobnich-udaju' },
  robots: { index: false, follow: true },
}

export default function Page() {
  return (
    <LegalPage
      title="Zásady zpracování osobních údajů"
      lede="Jaké údaje o vás zpracováváme, proč a jak dlouho."
    >
      <h2 className="text-display-3">Jaké údaje zpracováváme</h2>
      <p>
        Pro vyřízení rezervace potřebujeme vaše jméno, telefon a e-mail. Poznámka
        k rezervaci je nepovinná. Poštovní adresu nevyžadujeme — dárkové poukazy
        doručujeme e-mailem.
      </p>
      <h2 className="text-display-3">Marketingová sdělení</h2>
      <p>
        Souhlas se zasíláním novinek je zcela dobrovolný a oddělený od zpracování nutného
        k vyřízení rezervace. Odvolat jej můžete kdykoli odkazem v každém e-mailu.
      </p>
      <PendingContent source="montra.cz/beroun/zasady-zpracovani-osobnich-udaju" />
    </LegalPage>
  )
}
