import Image from 'next/image'
import Link from 'next/link'
import { LOCATION } from '@/content/location'
import { ArrowIcon, ButtonLink, Container, Eyebrow } from '@/components/ui'

export function Hero() {
  return (
    <section className="pt-14 pb-16 md:pt-24 md:pb-28">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Thajské masáže · Beroun</Eyebrow>
          <h1 className="text-display-1 mt-8">
            Dopřejte tělu klid.
            <br />
            Hlavě taky.
          </h1>
          <p className="text-body-lg mt-8 max-w-md text-secondary">
            Tradiční thajské a relaxační masáže v Berouně. Masírujeme tu od roku 2009.
          </p>

          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
            <ButtonLink href="/rezervace" size="lg">
              Rezervovat online
            </ButtonLink>
            <Link
              href="/masaze"
              className="group inline-flex items-center gap-2 text-[1.0625rem] underline decoration-foreground/25 underline-offset-[6px] transition-colors hover:decoration-foreground"
            >
              Vybrat masáž
              <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="relative mt-14 aspect-[4/3] overflow-hidden rounded-[2rem] md:mt-20 md:aspect-[21/9]">
          <Image
            src="/images/salon-masazni-mistnost.jpg"
            alt="Masážní místnost salonu Montra Beroun — thajská matrace s válcovým polštářem v odpoledním světle"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <dl className="mt-12 flex flex-wrap gap-x-14 gap-y-6 border-t border-border-hairline pt-9">
          <div>
            <dt className="text-eyebrow text-secondary">Kde</dt>
            <dd className="mt-2 text-[0.9375rem]">
              {LOCATION.address.street}, {LOCATION.address.city}
              <span className="block text-secondary">2. patro · přístup po schodech</span>
            </dd>
          </div>
          <div>
            <dt className="text-eyebrow text-secondary">Otevřeno</dt>
            <dd className="mt-2 text-[0.9375rem]">
              {LOCATION.openingHoursSummary}
              <span className="block text-secondary">Neděle po dohodě</span>
            </dd>
          </div>
          <div>
            <dt className="text-eyebrow text-secondary">Objednávky</dt>
            <dd className="mt-2 text-[0.9375rem]">
              <a
                href={`tel:${LOCATION.phone.e164}`}
                className="underline underline-offset-4 transition-colors hover:text-secondary"
              >
                {LOCATION.phone.display}
              </a>
            </dd>
          </div>
        </dl>
      </Container>
    </section>
  )
}
