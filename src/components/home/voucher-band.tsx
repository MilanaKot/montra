import Image from 'next/image'
import { ButtonLink, Container, Eyebrow } from '@/components/ui'

export function VoucherBand() {
  return (
    <section className="section-tight">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-accent text-background">
          <div className="grid items-center gap-0 md:grid-cols-2">
            <div className="p-8 sm:p-12 lg:p-16">
              <Eyebrow className="text-background/75">Dárkové poukazy</Eyebrow>
              <h2 className="text-display-2 mt-5">Darujte chvíli klidu.</h2>
              <p className="text-body-lg mt-6 max-w-sm text-background/85">
                Dárkový poukaz na masáž Montra doručíme e-mailem. Platí na jakoukoli
                masáž a nemusíte ho vyčerpat najednou.
              </p>
              <ButtonLink href="/darkove-poukazy" variant="dark" size="lg" className="mt-9">
                Koupit poukaz
              </ButtonLink>
            </div>
            <div className="relative aspect-[4/3] md:aspect-auto md:h-full md:min-h-[26rem]">
              <Image
                src="/images/darkovy-poukaz.jpg"
                alt="Dárkový poukaz Montra v obálce, vedle mísy s květy plumerie"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
