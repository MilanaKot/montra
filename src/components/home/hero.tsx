import Image from 'next/image'
import { LOCATION } from '@/content/location'
import { ButtonLink, Container, Eyebrow } from '@/components/ui'

export function Hero() {
  return (
    <section className="pt-10 pb-14 md:pt-16 md:pb-20">
      <Container>
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6 xl:col-span-6">
            <Eyebrow>Thajské masáže · Beroun</Eyebrow>
            <h1 className="text-display-1 mt-6">
              Dopřejte tělu klid.
              <br />
              Hlavě taky.
            </h1>
            <p className="text-body-lg mt-7 max-w-md text-secondary">
              Tradiční thajské a relaxační masáže v Berouně. Masírujeme tu od roku 2009.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href="/rezervace" size="lg">
                Rezervovat online
              </ButtonLink>
              <ButtonLink href="/masaze" variant="secondary" size="lg">
                Vybrat masáž
              </ButtonLink>
            </div>

            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-border-hairline pt-8">
              <div>
                <dt className="text-eyebrow text-secondary">Kde</dt>
                <dd className="mt-1.5 text-[0.9375rem]">{LOCATION.address.street}</dd>
              </div>
              <div>
                <dt className="text-eyebrow text-secondary">Otevřeno</dt>
                <dd className="mt-1.5 text-[0.9375rem]">{LOCATION.openingHoursSummary}</dd>
              </div>
              <div>
                <dt className="text-eyebrow text-secondary">Objednávky</dt>
                <dd className="mt-1.5 text-[0.9375rem]">
                  <a
                    href={`tel:${LOCATION.phone.e164}`}
                    className="underline underline-offset-4 transition-colors hover:text-secondary"
                  >
                    {LOCATION.phone.display}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-6 xl:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="/images/salon-masazni-mistnost.jpg"
                alt="Masážní místnost salonu Montra Beroun — thajská matrace s válcovým polštářem v odpoledním světle"
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
  )
}
