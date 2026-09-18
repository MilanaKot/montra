/*
 * PARKED — not rendered anywhere.
 *
 * Showing concrete free slots implies the booking system is already wired
 * up. It is not: slots come from the mock provider. Kept so the idea can be
 * put back the moment a real availability backend exists.
 */
import Link from 'next/link'
import { mockAvailability } from '@/features/booking/mock-availability'
import { getService } from '@/content/services'
import { ArrowIcon, ButtonLink, Container, SectionHead } from '@/components/ui'
import { dayLabel, formatPrice } from '@/lib/utils'

export async function NextAvailable() {
  const slots = await mockAvailability.getNextAvailable(5)
  if (!slots.length) return null

  return (
    <section className="section border-t border-border-hairline">
      <Container>
        <SectionHead
          eyebrow="Volné termíny"
          title="Nejbližší volno"
          lede="Nemusíte volat. Vyberte čas, který vám sedí, a máte hotovo."
          action={
            <ButtonLink href="/rezervace" variant="secondary">
              Zobrazit všechny termíny
            </ButtonLink>
          }
        />

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {slots.map((slot) => {
            const service = getService(slot.serviceSlug)
            const when = new Date(slot.startsAt)
            return (
              <li key={`${slot.startsAt}-${slot.serviceSlug}`}>
                <Link
                  href={`/rezervace?masaz=${slot.serviceSlug}&delka=${slot.durationMinutes}&termin=${encodeURIComponent(slot.startsAt)}`}
                  className="group flex h-full flex-col rounded-card border border-border-subtle bg-surface p-5 transition-colors duration-300 hover:border-foreground/30"
                >
                  <p className="text-eyebrow text-secondary">{dayLabel(when)}</p>
                  <p className="font-display mt-2 text-[2.5rem] leading-none">{slot.time}</p>
                  <p className="text-small mt-3 flex-1 text-secondary">
                    {service?.name}
                    <br />
                    {slot.durationMinutes} min · {formatPrice(slot.priceCzk)}
                  </p>
                  {slot.promotion ? (
                    <span className="text-eyebrow mt-4 inline-flex w-fit rounded-pill bg-accent px-2.5 py-1 text-foreground">
                      {slot.promotion.label}
                    </span>
                  ) : (
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[0.9375rem]">
                      Rezervovat
                      <ArrowIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
