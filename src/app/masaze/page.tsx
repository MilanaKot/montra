import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Catalog } from '@/components/massage/catalog'
import { Container, SectionHead } from '@/components/ui'
import { ContactBlock } from '@/components/contact/contact-block'

export const metadata: Metadata = {
  title: 'Masáže a ceník',
  description:
    'Tradiční thajské, olejové, aroma a prémiové masáže v Berouně. Ceník, délky a online rezervace.',
  alternates: { canonical: '/masaze' },
}

export default function MasazePage() {
  return (
    <>
      <section className="pt-12 pb-4 md:pt-20">
        <Container>
          <SectionHead
            level="h1"
            eyebrow="Ceník a druhy masáží"
            title="Vyberte si masáž."
            lede="Dvacet šest masáží rozdělených do pěti skupin. Filtrujte podle toho, co dnes potřebujete — ceník najdete přímo u každé masáže."
          />
          <Suspense fallback={<div className="mt-10 h-12" />}>
            <Catalog />
          </Suspense>
        </Container>
      </section>
      <div className="pb-8" />
      <ContactBlock />
    </>
  )
}
