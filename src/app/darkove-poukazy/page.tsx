import type { Metadata } from 'next'
import Image from 'next/image'
import { VoucherFlow } from '@/components/voucher/flow'
import { Container, Eyebrow } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Dárkové poukazy',
  description:
    'Dárkový poukaz na thajskou masáž Montra Beroun. Doručíme e-mailem, platí na jakoukoli masáž a nemusíte ho vyčerpat najednou.',
  alternates: { canonical: '/darkove-poukazy' },
}

export default function PoukazyPage() {
  return (
    <>
      <section className="pt-10 pb-4 md:pt-16">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <Eyebrow>Dárkové poukazy</Eyebrow>
              <h1 className="text-display-1 mt-6">Darujte chvíli klidu.</h1>
              <p className="text-body-lg mt-7 max-w-md text-secondary">
                Darujte svým blízkým dárek spojený s vůní Asie a zážitek relaxace
                z exotického Thajska. Poukaz doručíme e-mailem — stačí ho vytisknout
                a vzít s sebou.
              </p>
              <ul className="text-small mt-8 space-y-2.5 text-secondary">
                {[
                  'Platí v kterémkoli salonu Montra.',
                  'Částku nemusíte vyčerpat najednou — lze ji použít kreditním způsobem.',
                  'Každý kód je unikátní a elektronicky ověřovaný.',
                  'Poukazy nelze uplatnit na Happy Hours a akční masáže.',
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1 shrink-0 rounded-full bg-foreground/40"
                    />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-6">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem]">
                <Image
                  src="/images/salon-oleje-a-bylinky.png"
                  alt="Masážní oleje, balzámy a thajské bylinky připravené v salonu"
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <div className="border-t border-border-hairline">
        <VoucherFlow />
      </div>
    </>
  )
}
