import type { Metadata } from 'next'
import Image from 'next/image'
import { ACTIVE_THERAPISTS } from '@/content/therapists'
import { CONTRAINDICATIONS, BOOKING_POLICY, LOCATION } from '@/content/location'
import { ButtonLink, Container, Eyebrow, SectionHead } from '@/components/ui'
import { ContactBlock } from '@/components/contact/contact-block'

export const metadata: Metadata = {
  title: 'O nás',
  description:
    'Salon thajských masáží Montra v Berouně otevřel jako první z Monter v dubnu 2009. Poznejte náš tým a jak u nás masáž probíhá.',
  alternates: { canonical: '/o-nas' },
}

const GALLERY = [
  { src: '/images/salon-masazni-mistnost.png', alt: 'Masážní místnost s thajskou matrací v odpoledním světle' },
  { src: '/images/salon-relaxacni-zona.png', alt: 'Relaxační zóna s ratanovým lehátkem a čajem z citronové trávy' },
  { src: '/images/salon-parova-mistnost.png', alt: 'Párová místnost se dvěma matracemi vedle sebe' },
  { src: '/images/salon-bylinne-sacky.png', alt: 'Bylinné sáčky v mosazné míse vedle složených ručníků' },
  { src: '/images/salon-oleje-a-bylinky.png', alt: 'Masážní oleje, balzámy a sušené thajské bylinky' },
  { src: '/images/salon-recepce.png', alt: 'Recepce salonu s orchidejí a miskou s květy' },
]

export default function ONasPage() {
  return (
    <>
      <section className="pt-12 pb-4 md:pt-20">
        <Container>
          <SectionHead
            level="h1"
            eyebrow="Od roku 2009"
            title="Kousek Thajska v Berouně."
            lede="Montra znamená thajsky kouzelný. Salon v Berouně byl náš úplně první."
          />
        </Container>
      </section>

      <section className="section-tight">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="text-body-lg space-y-5 text-secondary">
                <p>
                  Salon thajské masáže Montra jsme pro vás vybudovali jako první v Berouně
                  v dubnu 2009. O sedm měsíců později přibyl Kladno, od roku 2013 Mladá
                  Boleslav, v roce 2015 Rudná u Prahy, v roce 2017 Praha 10 a v roce 2026
                  náš nejmladší salon Montra Royal v Praze 6.
                </p>
                <p>
                  Salon Montra v Berouně je útulný a zlatý doslova. Atmosféra a vůně
                  masážních olejů a thajských bylin vás uvítá už při cestě po schodech do
                  druhého patra, kde je pro vás salon otevřen.
                </p>
                <p>
                  Po každé masáži u nás dostanete thajský čaj. Je příjemné ještě chvíli
                  odpočívat v relaxační zóně na lehátku při šálku nápoje z citronové trávy.
                </p>
                <p className="text-foreground">
                  Ve všech našich salonech si můžete zakoupit thajské zboží, balzámy,
                  masážní oleje a další zboží z Thajska i od prověřených českých firem —
                  Saloos, Grešík nebo Green idea.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-card-lg border border-border-subtle bg-surface p-6 md:p-8">
                <h2 className="text-display-3">Jak to u nás chodí</h2>
                <ul className="mt-6 space-y-4">
                  {[
                    'Nemusíte si s sebou nosit vůbec nic.',
                    'Obsluha vás zavede k masážnímu loži, kde si v soukromí odložíte.',
                    'Na tradiční thajskou masáž vám zapůjčíme volný oděv — nebo můžete zůstat ve spodním prádle.',
                    'Na olejové masáže si ponechte spodní prádlo (ženy bez podprsenky), případně použijte naše jednorázové.',
                    `V každé masáži je zahrnuto ${BOOKING_POLICY.preparationMinutes} min na přípravu.`,
                    'Dostavte se prosím včas a nechte si více času, než na jaký máte rezervaci.',
                  ].map((t) => (
                    <li key={t} className="flex gap-3 text-[0.9375rem]">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 size-1 shrink-0 rounded-full bg-foreground/40"
                      />
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="text-small mt-6 border-t border-border-hairline pt-5 text-secondary">
                  {BOOKING_POLICY.cancellationNote}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------- the team */}
      <section className="section border-t border-border-hairline" id="tym">
        <Container>
          <SectionHead
            eyebrow="Náš tým"
            title="Poznejte naše terapeuty"
            lede="V Berouně o vás pečují tři lidé, kteří se masáži věnují celý profesní život."
          />
          <ul className="mt-12 grid gap-8 lg:grid-cols-3">
            {ACTIVE_THERAPISTS.map((t) => (
              <li key={t.slug}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                  {t.photo ? (
                    <Image
                      src={t.photo}
                      alt={`${t.name}, terapeut salonu Montra Beroun`}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="grid size-full place-items-center bg-foreground/[0.04]"
                    >
                      <span className="font-display text-[5rem] leading-none text-foreground/20">
                        {t.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-display-3 mt-6">{t.name}</h3>
                <p className="text-small mt-2 text-secondary">{t.specialization}</p>
                <div className="text-small mt-4 space-y-3 text-secondary">
                  {t.bio.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <ButtonLink href="/rezervace" className="mt-12">
            Rezervovat online
          </ButtonLink>
        </Container>
      </section>

      {/* ---------------------------------------------------------- gallery */}
      <section className="section border-t border-border-hairline" id="galerie">
        <Container>
          <Eyebrow>Fotogalerie</Eyebrow>
          <h2 className="text-display-2 mt-4">Podívejte se k nám.</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((g, i) => (
              <li
                key={g.src}
                className={
                  i === 0 ? 'sm:col-span-2 sm:row-span-2' : undefined
                }
              >
                <div
                  className={`relative overflow-hidden rounded-card-lg ${
                    i === 0 ? 'aspect-[4/3] sm:aspect-square' : 'aspect-[4/3]'
                  }`}
                >
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ------------------------------------------------- contraindications */}
      <section className="section-tight border-t border-border-hairline">
        <Container>
          <div className="mx-auto max-w-[44rem] rounded-card-lg border border-border-subtle p-6 md:p-8">
            <h2 className="text-display-3">Kdy masáž nedoporučujeme</h2>
            <p className="text-small mt-4 text-secondary">
              Masáž je relaxační a regenerační procedura, nikoli zdravotní výkon.
              Nedoporučujeme ji při: {CONTRAINDICATIONS.join(', ')}. Těhotenskou masáž
              provádíme od ukončeného třetího měsíce. Pokud si nejste jistí, poraďte se
              prosím se svým lékařem a dejte nám vědět při objednání — masáž vždy
              přizpůsobíme.
            </p>
            <p className="text-small mt-4 text-secondary">
              Máte dotaz? Napište nám na{' '}
              <a href={`mailto:${LOCATION.email}`} className="underline underline-offset-4">
                {LOCATION.email}
              </a>
              .
            </p>
          </div>
        </Container>
      </section>

      <ContactBlock />
    </>
  )
}
