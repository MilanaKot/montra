import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SERVICES, getService } from '@/content/services'
import { CATEGORY_LABELS } from '@/content/services.types'
import { BOOKING_POLICY, CONTRAINDICATIONS, LOCATION } from '@/content/location'
import { ArrowIcon, ButtonLink, Container, Eyebrow } from '@/components/ui'
import { ServiceCard } from '@/components/massage/service-card'
import { formatPrice } from '@/lib/utils'

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}
  return {
    title: service.name,
    description: service.summary,
    alternates: { canonical: `/masaze/${service.slug}` },
    openGraph: { title: service.name, description: service.summary },
  }
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const related = SERVICES.filter(
    (s) => s.category === service.category && s.slug !== service.slug,
  ).slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.summary,
    serviceType: CATEGORY_LABELS[service.category],
    provider: { '@type': 'HealthAndBeautyBusiness', name: LOCATION.name },
    areaServed: LOCATION.address.city,
    offers: service.durations.map((d) => ({
      '@type': 'Offer',
      price: d.priceCzk,
      priceCurrency: 'CZK',
      name: `${service.name} — ${d.minutes} min`,
    })),
  }

  return (
    <>
      <section className="pt-8 pb-14 md:pt-12 md:pb-20">
        <Container>
          <nav aria-label="Drobečková navigace" className="text-small">
            <ol className="flex flex-wrap items-center gap-2 text-secondary">
              <li>
                <Link href="/masaze" className="transition-colors hover:text-foreground">
                  Masáže
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground">{service.name}</li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="min-w-0 lg:col-span-7">
              <Eyebrow>{CATEGORY_LABELS[service.category]}</Eyebrow>
              <h1 className="text-display-2 mt-5">{service.name}</h1>
              <div className="text-body-lg mt-8 space-y-5 text-secondary">
                {service.description.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {service.notes?.length ? (
                <div className="mt-10 rounded-card border border-border-subtle bg-surface p-6">
                  <h2 className="text-eyebrow text-secondary">Dobré vědět</h2>
                  <ul className="mt-4 space-y-2.5">
                    {service.notes.map((n) => (
                      <li key={n} className="flex gap-3 text-[0.9375rem]">
                        <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-foreground/40" />
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="min-w-0 lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="mt-6 rounded-card-lg border border-border-subtle bg-surface p-6">
                <h2 className="text-eyebrow text-secondary">Délka a cena</h2>
                <ul className="mt-5 divide-y divide-border-hairline">
                  {service.durations.map((d) => (
                    <li
                      key={d.minutes}
                      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5 py-3.5"
                    >
                      <span className="text-[0.9375rem]">
                        {d.minutes} min
                        {d.note ? (
                          <span className="text-small ml-2 text-secondary">({d.note})</span>
                        ) : null}
                      </span>
                      <span className="font-display text-[1.375rem] leading-none">
                        {formatPrice(d.priceCzk)}
                      </span>
                      {d.recommended ? (
                        <span className="text-eyebrow rounded-pill bg-accent px-2 py-0.5 text-background">
                          Doporučujeme
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>

                <ButtonLink
                  href={`/rezervace?masaz=${service.slug}`}
                  size="lg"
                  className="mt-6 w-full"
                >
                  Rezervovat online
                </ButtonLink>
                <ButtonLink
                  href={`tel:${LOCATION.phone.e164}`}
                  variant="secondary"
                  className="mt-3 w-full"
                >
                  Objednat telefonicky
                </ButtonLink>
                <p className="text-small mt-5 text-secondary">
                  V každé masáži je zahrnuto {BOOKING_POLICY.preparationMinutes} min na přípravu.
                  {' '}
                  {BOOKING_POLICY.cancellationNote}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14 rounded-card border border-border-subtle p-6 md:mt-20">
            <h2 className="text-eyebrow text-secondary">Kdy masáž nedoporučujeme</h2>
            <p className="text-small mt-4 text-secondary">
              Masáž je relaxační procedura, nikoli zdravotní výkon. Nedoporučujeme ji při:{' '}
              {CONTRAINDICATIONS.join(', ')}. Pokud si nejste jistí, poraďte se prosím se svým
              lékařem — a dejte nám vědět při objednání.
            </p>
          </div>
        </Container>
      </section>

      {related.length ? (
        <section className="section border-t border-border-hairline">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-display-2">Podobné masáže</h2>
              <Link
                href={`/masaze?kategorie=${service.category}`}
                className="hidden items-center gap-2 text-[0.9375rem] sm:inline-flex"
              >
                Celá kategorie
                <ArrowIcon />
              </Link>
            </div>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {related.map((s) => (
                <li key={s.slug}>
                  <ServiceCard service={s} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
