import Image from 'next/image'
import { ButtonLink, Container, Eyebrow } from '@/components/ui'

export function About() {
  return (
    <section className="section border-t border-border-hairline">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image
                src="/images/salon-recepce.png"
                alt="Recepce salonu Montra Beroun s orchidejí a připravenými masážními oleji"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <Eyebrow>Od roku 2009</Eyebrow>
            <h2 className="text-display-2 mt-5">Kousek Thajska v Berouně.</h2>
            <div className="text-body-lg mt-7 space-y-5 text-secondary">
              <p>
                Salon thajské masáže Montra jsme v Berouně otevřeli jako úplně první —
                v dubnu 2009. Od té doby přibyly pobočky v Kladně, Mladé Boleslavi,
                Rudné u Prahy a v Praze.
              </p>
              <p>
                Beroun zůstal útulný a zlatý doslova. Atmosféra a vůně masážních olejů
                a thajských bylin vás uvítá už cestou po schodech do druhého patra.
                Po masáži dostanete thajský čaj a můžete si v klidu odpočinout
                v relaxační zóně.
              </p>
              <p className="text-foreground">Montra znamená thajsky kouzelný.</p>
            </div>
            <ButtonLink href="/o-nas" variant="secondary" className="mt-9">
              Více o salonu
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  )
}
