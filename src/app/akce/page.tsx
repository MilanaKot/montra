import type { Metadata } from 'next'
import { PROMOTIONS, STANDING_OFFERS } from '@/content/promotions'
import { getService } from '@/content/services'
import { LOCATION } from '@/content/location'
import { ButtonLink, Container, Eyebrow, SectionHead } from '@/components/ui'
import { formatPrice } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Akce a Happy Hours',
  description:
    'Akční ceny masáží v Berouně pondělí až pátek 9:00–14:00, Happy Hours pro dva, věrnostní karta a permanentky.',
  alternates: { canonical: '/akce' },
}

export default function AkcePage() {
  const akcni = PROMOTIONS.find((p) => p.slug === 'akcni-ceny')
  const happy = PROMOTIONS.find((p) => p.slug === 'happy-hours')

  return (
    <>
      <section className="pt-12 pb-4 md:pt-20">
        <Container>
          <SectionHead
            level="h1"
            eyebrow="Speciální nabídka"
            title="Akce a Happy Hours."
            lede="Zvýhodněné termíny pro jednotlivce i páry. Akční ceny uvidíte rovnou v rezervaci — nemusíte nic hledat."
            action={<ButtonLink href="/rezervace">Rezervovat online</ButtonLink>}
          />
        </Container>
      </section>

      {/* ------------------------------------------------------- akční ceny */}
      {akcni ? (
        <section className="section-tight" id="akcni-ceny">
          <Container>
            <div className="overflow-hidden rounded-[2rem] border border-border-subtle bg-surface">
              <div className="grid lg:grid-cols-12">
                <div className="p-8 lg:col-span-7 lg:p-12">
                  <Eyebrow>Pro jednotlivce</Eyebrow>
                  <h2 className="text-display-2 mt-4">{akcni.name}</h2>
                  <p className="text-body-lg mt-3 text-accent-secondary">{akcni.tagline}</p>
                  <div className="text-body-lg mt-7 space-y-4 text-secondary">
                    {akcni.description.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>

                  <p className="text-small mt-8 text-secondary">Platí na tyto masáže:</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {akcni.serviceSlugs.map((slug) => (
                      <li
                        key={slug}
                        className="rounded-pill border border-border-hairline px-3.5 py-1.5 text-[0.9375rem]"
                      >
                        {getService(slug)?.name ?? slug}
                      </li>
                    ))}
                  </ul>

                  <ul className="text-small mt-8 space-y-2 text-secondary">
                    {akcni.terms.map((t) => (
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

                <div className="border-t border-border-hairline bg-accent/12 p-8 lg:col-span-5 lg:border-t-0 lg:border-l lg:p-12">
                  <h3 className="text-eyebrow text-secondary">Akční ceník</h3>
                  <ul className="mt-5 divide-y divide-border-hairline">
                    {Object.entries(akcni.fixedPrices ?? {}).map(([min, price]) => (
                      <li key={min} className="flex items-baseline justify-between gap-4 py-3.5">
                        <span className="text-[0.9375rem]">{min} min</span>
                        <span className="font-display text-[1.5rem] leading-none">
                          {formatPrice(price)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <ButtonLink href="/rezervace" className="mt-7 w-full">
                    Najít akční termín
                  </ButtonLink>
                  <p className="text-small mt-4 text-secondary">
                    Pro volné akční termíny můžete také zavolat na{' '}
                    <a
                      href={`tel:${LOCATION.phone.e164}`}
                      className="underline underline-offset-4"
                    >
                      {LOCATION.phone.display}
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* ------------------------------------------------------ happy hours */}
      {happy ? (
        <section className="section-tight" id="happy-hours">
          <Container>
            <div className="rounded-[2rem] border border-border-subtle p-8 lg:p-12">
              <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <Eyebrow>Pro dva</Eyebrow>
                  <h2 className="text-display-2 mt-4">{happy.name}</h2>
                  <p className="text-body-lg mt-3 text-accent-secondary">{happy.tagline}</p>
                  <div className="text-body-lg mt-7 space-y-4 text-secondary">
                    {happy.description.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="rounded-card-lg border border-border-subtle bg-surface p-6">
                    <h3 className="text-eyebrow text-secondary">Vypsané termíny</h3>
                    {happy.active ? (
                      <p className="mt-4">Aktuální termíny najdete v rezervaci.</p>
                    ) : (
                      <>
                        <p className="mt-4 text-[1.0625rem]">
                          Právě nemáme vypsaný žádný termín.
                        </p>
                        <p className="text-small mt-2 text-secondary">
                          Jakmile Happy Hours vypíšeme, objeví se přímo v rezervaci u konkrétních
                          časů. Můžete se také zeptat telefonicky.
                        </p>
                        <ButtonLink
                          href={`tel:${LOCATION.phone.e164}`}
                          variant="secondary"
                          className="mt-6 w-full"
                        >
                          Zavolat {LOCATION.phone.display}
                        </ButtonLink>
                      </>
                    )}
                  </div>
                  <ul className="text-small mt-6 space-y-2 text-secondary">
                    {happy.terms.map((t) => (
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
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* -------------------------------------------------- standing offers */}
      <section className="section border-t border-border-hairline">
        <Container>
          <h2 className="text-display-2">Stálé výhody</h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-3 lg:gap-6">
            {STANDING_OFFERS.map((o) => (
              <li
                key={o.slug}
                id={o.slug}
                className="rounded-card-lg border border-border-subtle bg-surface p-6"
              >
                <h3 className="text-display-3">{o.name}</h3>
                <p className="mt-2.5 text-[0.9375rem] text-accent-secondary">{o.tagline}</p>
                <div className="text-small mt-5 space-y-3 text-secondary">
                  {o.description.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}
