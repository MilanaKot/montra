'use client'

import { useSearchParams } from 'next/navigation'
import { getService } from '@/content/services'
import { getTherapist } from '@/content/therapists'
import { BOOKING_POLICY, LOCATION } from '@/content/location'
import { ButtonLink, Container } from '@/components/ui'
import { formatPrice } from '@/lib/utils'

function CheckIcon() {
  return (
    <span className="grid size-16 place-items-center rounded-full bg-accent">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-8">
        <path
          d="M5 12.5l4.5 4.5L19 7.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

/** Builds a Google Calendar link — no library, no tracking. */
function calendarUrl(title: string, start: Date, minutes: number, location: string) {
  const fmt = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, '')
  const end = new Date(start.getTime() + minutes * 60_000)
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${fmt(start)}/${fmt(end)}`,
    location,
  })
  return `https://calendar.google.com/calendar/render?${p.toString()}`
}

export function Confirmation() {
  const params = useSearchParams()
  const service = getService(params.get('masaz') ?? '')
  const minutes = Number(params.get('delka') ?? 0)
  const partySize = Number(params.get('osoby') ?? 1)
  const price = Number(params.get('cena') ?? 0)
  const therapist = getTherapist(params.get('terapeut') ?? '')
  const startsAt = params.get('termin')
  const when = startsAt ? new Date(startsAt) : null

  const address = `${LOCATION.address.street}, ${LOCATION.address.postalCode} ${LOCATION.address.city}`

  return (
    <section className="section">
      <Container>
        <div className="mx-auto max-w-[40rem]">
          <CheckIcon />
          <h1 className="text-display-2 mt-8">Rezervace je potvrzena.</h1>
          <p className="text-body-lg mt-5 text-secondary">
            Potvrzení jsme vám poslali e-mailem. Těšíme se na vás.
          </p>

          <div className="mt-10 rounded-card-lg border border-border-subtle bg-surface p-6 md:p-8">
            <dl className="divide-y divide-border-hairline">
              <div className="flex justify-between gap-6 pb-3.5">
                <dt className="text-small text-secondary">Masáž</dt>
                <dd className="text-right text-[0.9375rem]">
                  {service?.name ?? '—'}
                  {minutes ? ` · ${minutes} min` : ''}
                  {partySize === 2 ? ' · 2 osoby' : ''}
                </dd>
              </div>
              <div className="flex justify-between gap-6 py-3.5">
                <dt className="text-small text-secondary">Termín</dt>
                <dd className="text-right text-[0.9375rem]">
                  {when
                    ? when.toLocaleString('cs-CZ', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : '—'}
                </dd>
              </div>
              <div className="flex justify-between gap-6 py-3.5">
                <dt className="text-small text-secondary">Terapeut</dt>
                <dd className="text-right text-[0.9375rem]">
                  {therapist?.name ?? 'Kterákoli dostupná'}
                </dd>
              </div>
              <div className="flex justify-between gap-6 py-3.5">
                <dt className="text-small text-secondary">Kde</dt>
                <dd className="text-right text-[0.9375rem]">
                  {LOCATION.name}
                  <br />
                  {address}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 pt-4">
                <dt className="text-small text-secondary">Cena</dt>
                <dd className="font-display text-[1.625rem] leading-none">
                  {price ? formatPrice(price) : '—'}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {when && service ? (
              <ButtonLink
                href={calendarUrl(`${service.name} — Montra Beroun`, when, minutes, address)}
                variant="secondary"
              >
                Přidat do kalendáře
              </ButtonLink>
            ) : null}
            <ButtonLink href={LOCATION.maps.directions} variant="secondary">
              Navigovat
            </ButtonLink>
            <ButtonLink href={`tel:${LOCATION.phone.e164}`} variant="secondary">
              Zavolat
            </ButtonLink>
          </div>

          <div className="mt-10 rounded-card border border-border-subtle p-6">
            <h2 className="text-eyebrow text-secondary">Než přijdete</h2>
            <ul className="text-small mt-4 space-y-2.5 text-secondary">
              <li>Dostavte se prosím včas a nechte si i chvíli po masáži.</li>
              <li>{LOCATION.address.floorNote}</li>
              <li>Nemusíte si s sebou nosit nic — vše potřebné u nás dostanete.</li>
              <li>{BOOKING_POLICY.cancellationNote}</li>
            </ul>
          </div>

          <p className="text-small mt-8 text-secondary">
            Potřebujete termín změnit?{' '}
            <a
              href={`tel:${LOCATION.phone.e164}`}
              className="underline underline-offset-4 hover:text-foreground"
            >
              Zavolejte nám na {LOCATION.phone.display}
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  )
}
