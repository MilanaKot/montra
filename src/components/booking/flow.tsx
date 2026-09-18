'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type { ReadonlyURLSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { SERVICES, getService } from '@/content/services'
import { CATEGORY_LABELS, CATEGORY_ORDER } from '@/content/services.types'
import { ACTIVE_THERAPISTS } from '@/content/therapists'
import { BOOKING_POLICY, LOCATION } from '@/content/location'
import { mockAvailability } from '@/features/booking/mock-availability'
import type { SlotDay } from '@/features/booking/types'
import { track } from '@/features/analytics'
import { Badge, Button, Container } from '@/components/ui'
import { ChoiceCard, Field, StepHeading, inputClass } from './pieces'
import {
  EMPTY_STATE,
  STEPS,
  clearPersisted,
  durationsFor,
  partySizesFor,
  persist,
  restore,
  type BookingState,
  type StepId,
} from './state'
import { cn, formatPrice } from '@/lib/utils'

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
}

/** Accepts Czech numbers and international format; rejects obvious nonsense. */
function isPhone(v: string) {
  const digits = v.replace(/[\s()/-]/g, '')
  return /^\+?[0-9]{9,15}$/.test(digits)
}

function todayIso() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function initialState(params: URLSearchParams | ReadonlyURLSearchParams): BookingState {
  const saved = restore()
  const slug = params.get('masaz')
  const delka = params.get('delka')
  const termin = params.get('termin')

  const preset: Partial<BookingState> = {}
  if (slug && getService(slug)) preset.serviceSlug = slug
  if (delka && Number(delka) > 0) preset.durationMinutes = Number(delka)
  if (termin) preset.startsAt = termin

  return { ...EMPTY_STATE, ...saved, ...preset }
}

function initialStep(params: URLSearchParams | ReadonlyURLSearchParams): number {
  const slug = params.get('masaz')
  if (!slug || !getService(slug)) return 0
  return params.get('delka') ? 2 : 1
}

export function BookingFlow() {
  const router = useRouter()
  const params = useSearchParams()

  /*
   * This subtree is client-rendered (it reads useSearchParams behind Suspense),
   * so the initial state can safely be derived from the URL and sessionStorage
   * in a lazy initialiser — no mount effect, no hydration mismatch.
   */
  const [state, setState] = useState<BookingState>(() => initialState(params))
  const [stepIndex, setStepIndex] = useState(() => initialStep(params))
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [slotResult, setSlotResult] = useState<{ key: string; days: SlotDay[] } | null>(null)
  const [visible, setVisible] = useState<{ key: string; count: number }>({ key: '', count: 3 })
  const [submitting, setSubmitting] = useState(false)

  const step = STEPS[stepIndex]!
  const service = getService(state.serviceSlug ?? '')

  /** Identifies one availability query; changing it invalidates loaded slots. */
  const slotKey =
    state.serviceSlug && state.durationMinutes
      ? `${state.serviceSlug}|${state.durationMinutes}|${state.partySize}|${state.therapistSlug ?? '*'}`
      : null

  const days = slotResult && slotResult.key === slotKey ? slotResult.days : null
  const loadingSlots = step.id === 'termin' && slotKey !== null && days === null
  const visibleDays = visible.key === slotKey ? visible.count : 3

  const set = useCallback((patch: Partial<BookingState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch }
      persist(next)
      return next
    })
  }, [])

  /*
   * Fetch availability for the current query. State is only written from the
   * promise callback, so this stays a pure "subscribe to an external system"
   * effect. Swapping mockAvailability for a real provider changes nothing here.
   */
  useEffect(() => {
    if (step.id !== 'termin' || !slotKey || !state.serviceSlug || !state.durationMinutes) return
    let cancelled = false
    void mockAvailability
      .getSlots({
        serviceSlug: state.serviceSlug,
        durationMinutes: state.durationMinutes,
        partySize: state.partySize,
        therapistSlug: state.therapistSlug,
        fromDate: todayIso(),
        days: BOOKING_POLICY.bookingHorizonDays,
      })
      .then((d) => {
        if (!cancelled) setSlotResult({ key: slotKey, days: d })
      })
    return () => {
      cancelled = true
    }
  }, [step.id, slotKey, state.serviceSlug, state.durationMinutes, state.partySize, state.therapistSlug])

  useEffect(() => {
    track('booking_started', { service: initialState(params).serviceSlug })
    // Fires once per visit to the flow.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const canContinue = useMemo(() => {
    switch (step.id) {
      case 'sluzba':
        return Boolean(state.serviceSlug)
      case 'delka':
        return Boolean(state.durationMinutes)
      case 'osoby':
        return Boolean(state.partySize)
      case 'terapeut':
        return true
      case 'termin':
        return Boolean(state.startsAt)
      case 'udaje':
        return true
      default:
        return false
    }
  }, [step.id, state])

  function goNext() {
    if (step.id === 'udaje') return submit()
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function jumpTo(id: StepId) {
    const idx = STEPS.findIndex((s) => s.id === id)
    if (idx >= 0 && idx < stepIndex) setStepIndex(idx)
  }

  function submit() {
    const next: Record<string, string> = {}
    if (state.name.trim().length < 2) next.name = 'Vyplňte prosím jméno a příjmení.'
    if (!isPhone(state.phone)) next.phone = 'Zadejte prosím platné telefonní číslo.'
    if (!isEmail(state.email)) next.email = 'Zadejte prosím platný e-mail.'
    setErrors(next)
    if (Object.keys(next).length) {
      document.getElementById(Object.keys(next)[0]!)?.focus()
      return
    }
    setSubmitting(true)
    track('booking_completed', {
      service: state.serviceSlug,
      duration: state.durationMinutes,
      partySize: state.partySize,
    })
    /*
     * PROTOTYPE: the reservation is not created anywhere. In production this
     * posts to the server, which re-validates availability inside a transaction
     * and calculates the price itself before inserting.
     */
    const q = new URLSearchParams({
      masaz: state.serviceSlug ?? '',
      delka: String(state.durationMinutes ?? ''),
      osoby: String(state.partySize),
      termin: state.startsAt ?? '',
      cena: String(state.priceCzk ?? ''),
      ...(state.therapistSlug ? { terapeut: state.therapistSlug } : {}),
    })
    clearPersisted()
    router.push(`/rezervace/potvrzeno?${q.toString()}`)
  }

  const shownDays = days?.slice(0, visibleDays) ?? []

  return (
    <div className="pb-28 md:pb-16">
      <Container>
        <div className="mx-auto max-w-[46rem]">
          <h1 className="sr-only">Rezervace online — Montra Beroun</h1>

          {/* Progress */}
          <div className="pt-8 md:pt-12">
            <div className="flex items-center justify-between gap-4">
              <p className="text-eyebrow text-secondary">
                Krok {stepIndex + 1} / {STEPS.length}
              </p>
              <p className="text-small text-secondary">{step.label}</p>
            </div>
            <ol className="mt-3 flex gap-1.5" aria-label="Průběh rezervace">
              {STEPS.map((s, i) => (
                <li key={s.id} className="flex-1">
                  <button
                    type="button"
                    onClick={() => jumpTo(s.id)}
                    disabled={i >= stepIndex}
                    aria-current={i === stepIndex ? 'step' : undefined}
                    className={cn(
                      'block h-1 w-full rounded-pill transition-colors',
                      i < stepIndex
                        ? 'cursor-pointer bg-foreground'
                        : i === stepIndex
                          ? 'bg-accent'
                          : 'bg-foreground/12',
                    )}
                  >
                    <span className="sr-only">{s.label}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10">
            <StepHeading
              hint={
                step.id === 'termin' && state.therapistSlug
                  ? 'Zobrazujeme jen termíny vybraného terapeuta.'
                  : undefined
              }
            >
              {step.heading}
            </StepHeading>

            {/* ------------------------------------------------ 1. service */}
            {step.id === 'sluzba' ? (
              <div className="space-y-8">
                {CATEGORY_ORDER.map((cat) => {
                  const items = SERVICES.filter((s) => s.category === cat)
                  if (!items.length) return null
                  return (
                    <div key={cat}>
                      <h3 className="text-eyebrow text-secondary">{CATEGORY_LABELS[cat]}</h3>
                      <div className="mt-3 space-y-2">
                        {items.map((s) => (
                          <ChoiceCard
                            key={s.slug}
                            selected={state.serviceSlug === s.slug}
                            onSelect={() => {
                              const allowed = s.durations.map((d) => d.minutes)
                              set({
                                serviceSlug: s.slug,
                                durationMinutes:
                                  state.durationMinutes && allowed.includes(state.durationMinutes)
                                    ? state.durationMinutes
                                    : null,
                                partySize: s.partySizes.includes(state.partySize)
                                  ? state.partySize
                                  : (s.partySizes[0] ?? 1),
                                startsAt: null,
                              })
                              track('booking_service_selected', { service: s.slug })
                            }}
                            title={s.name}
                            subtitle={s.summary}
                            meta={
                              <span className="text-small text-secondary">
                                od {formatPrice(Math.min(...s.durations.map((d) => d.priceCzk)))}
                              </span>
                            }
                          />
                        ))}
                      </div>
                    </div>
                  )
                })}

                <div>
                  <h3 className="text-eyebrow text-secondary">Nejste si jistí?</h3>
                  <div className="mt-3 rounded-card border border-border-subtle bg-surface p-5">
                    <p className="text-[1.0625rem]">Nevím, co vybrat</p>
                    <p className="text-small mt-1.5 text-secondary">
                      Zavolejte nám na{' '}
                      <a
                        href={`tel:${LOCATION.phone.e164}`}
                        className="underline underline-offset-4"
                        onClick={() => track('phone_clicked', { from: 'booking_step_1' })}
                      >
                        {LOCATION.phone.display}
                      </a>{' '}
                      a vybereme masáž spolu. Poradíme podle toho, co vás trápí a kolik máte času.
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            {/* ----------------------------------------------- 2. duration */}
            {step.id === 'delka' ? (
              <div className="space-y-2">
                {durationsFor(service).map((d) => (
                  <ChoiceCard
                    key={d.minutes}
                    selected={state.durationMinutes === d.minutes}
                    onSelect={() => {
                      set({ durationMinutes: d.minutes, startsAt: null })
                      track('booking_duration_selected', { minutes: d.minutes })
                    }}
                    title={`${d.minutes} min`}
                    subtitle={d.note}
                    badge={d.recommended ? <Badge tone="accent">Doporučujeme</Badge> : undefined}
                    meta={
                      <span className="font-display text-[1.375rem] leading-none">
                        {formatPrice(d.priceCzk)}
                      </span>
                    }
                  />
                ))}
                <p className="text-small pt-2 text-secondary">
                  V každé masáži je zahrnuto {BOOKING_POLICY.preparationMinutes} min na přípravu.
                </p>
              </div>
            ) : null}

            {/* ------------------------------------------------- 3. people */}
            {step.id === 'osoby' ? (
              <div className="space-y-2">
                {partySizesFor(service).map((n) => (
                  <ChoiceCard
                    key={n}
                    selected={state.partySize === n}
                    onSelect={() => set({ partySize: n, startsAt: null })}
                    title={n === 1 ? '1 osoba' : '2 osoby společně'}
                    subtitle={
                      n === 2
                        ? 'Masáž probíhá ve stejný čas. Termín nabídneme jen tehdy, když jsou volní dva terapeuti.'
                        : undefined
                    }
                  />
                ))}
                {service && service.partySizes.length === 1 ? (
                  <p className="text-small pt-2 text-secondary">
                    {service.partySizes[0] === 2
                      ? 'Tuto masáž nabízíme pouze pro dvě osoby.'
                      : 'Tuto masáž nabízíme pouze pro jednu osobu.'}
                  </p>
                ) : null}
              </div>
            ) : null}

            {/* ---------------------------------------------- 4. therapist */}
            {step.id === 'terapeut' ? (
              <div className="space-y-2">
                <ChoiceCard
                  selected={state.therapistSlug === null}
                  onSelect={() => set({ therapistSlug: null, startsAt: null })}
                  title="Kterákoli dostupná"
                  subtitle="Nabídneme vám nejvíc volných termínů."
                />
                {ACTIVE_THERAPISTS.map((t) => (
                  <ChoiceCard
                    key={t.slug}
                    selected={state.therapistSlug === t.slug}
                    onSelect={() => set({ therapistSlug: t.slug, startsAt: null })}
                    title={t.name}
                    subtitle={t.specialization}
                  />
                ))}
              </div>
            ) : null}

            {/* --------------------------------------------- 5. date, time */}
            {step.id === 'termin' ? (
              <div>
                {loadingSlots ? (
                  <p className="text-secondary">Hledáme volné termíny…</p>
                ) : !days?.length ? (
                  <div className="rounded-card border border-border-subtle bg-surface p-6">
                    <p>V nejbližších dnech nemáme volno pro tuto kombinaci.</p>
                    <p className="text-small mt-2 text-secondary">
                      Zkuste jiného terapeuta nebo nám zavolejte na{' '}
                      <a href={`tel:${LOCATION.phone.e164}`} className="underline underline-offset-4">
                        {LOCATION.phone.display}
                      </a>
                      .
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-eyebrow text-secondary">Nejbližší termíny</p>
                    <div className="mt-5 space-y-8">
                      {shownDays.map((day) => (
                        <div key={day.date}>
                          <h3 className="flex items-baseline gap-2.5">
                            <span className="text-[1.0625rem]">{day.label}</span>
                            <span className="text-small text-secondary">{day.dateLabel}</span>
                          </h3>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {day.slots.map((slot) => {
                              const selected = state.startsAt === slot.startsAt
                              return (
                                <button
                                  key={slot.startsAt}
                                  type="button"
                                  aria-pressed={selected}
                                  onClick={() => {
                                    set({
                                      startsAt: slot.startsAt,
                                      priceCzk: slot.priceCzk,
                                      promotionLabel: slot.promotion?.label ?? null,
                                    })
                                    track('booking_slot_selected', { startsAt: slot.startsAt })
                                  }}
                                  className={cn(
                                    'flex min-h-12 min-w-[5.25rem] flex-col items-center justify-center rounded-card border px-3 py-2 transition-colors',
                                    selected
                                      ? 'border-foreground bg-foreground text-background'
                                      : slot.promotion
                                        ? 'border-accent bg-accent/15 hover:border-foreground/40'
                                        : 'border-border-subtle bg-surface hover:border-foreground/40',
                                  )}
                                >
                                  <span className="text-[1.0625rem] leading-none">{slot.time}</span>
                                  {slot.promotion ? (
                                    <span className="text-[0.625rem] mt-1 leading-none font-medium tracking-[0.1em] uppercase">
                                      {slot.promotion.label}
                                    </span>
                                  ) : null}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {visibleDays < days.length ? (
                      <Button
                        variant="secondary"
                        className="mt-8"
                        onClick={() =>
                          setVisible({ key: slotKey ?? '', count: visibleDays + 5 })
                        }
                      >
                        Vybrat jiné datum
                      </Button>
                    ) : null}
                  </>
                )}
              </div>
            ) : null}

            {/* ----------------------------------------------- 6. customer */}
            {step.id === 'udaje' ? (
              <div className="space-y-5">
                <Field id="name" label="Jméno a příjmení" error={errors.name}>
                  {(p) => (
                    <input
                      {...p}
                      className={inputClass}
                      autoComplete="name"
                      value={state.name}
                      onChange={(e) => set({ name: e.target.value })}
                    />
                  )}
                </Field>
                <Field id="phone" label="Telefon" error={errors.phone} hint="Pro případ, že bychom potřebovali termín upřesnit.">
                  {(p) => (
                    <input
                      {...p}
                      type="tel"
                      inputMode="tel"
                      className={inputClass}
                      autoComplete="tel"
                      placeholder="+420 777 758 755"
                      value={state.phone}
                      onChange={(e) => set({ phone: e.target.value })}
                    />
                  )}
                </Field>
                <Field id="email" label="E-mail" error={errors.email} hint="Sem pošleme potvrzení rezervace.">
                  {(p) => (
                    <input
                      {...p}
                      type="email"
                      inputMode="email"
                      className={inputClass}
                      autoComplete="email"
                      value={state.email}
                      onChange={(e) => set({ email: e.target.value })}
                    />
                  )}
                </Field>
                <Field id="note" label="Poznámka (nepovinné)">
                  {(p) => (
                    <textarea
                      {...p}
                      rows={3}
                      className={inputClass}
                      placeholder="Např. bolí mě pravé rameno, nebo stadium těhotenství."
                      value={state.note}
                      onChange={(e) => set({ note: e.target.value })}
                    />
                  )}
                </Field>

                <label className="flex cursor-pointer items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    className="mt-1 size-4 shrink-0 accent-[#FA7864]"
                    checked={state.marketingConsent}
                    onChange={(e) => set({ marketingConsent: e.target.checked })}
                  />
                  <span className="text-small text-secondary">
                    Chci občas dostávat e-mailem novinky a akční nabídky. Nepovinné — rezervaci
                    potvrdíme i bez souhlasu.
                  </span>
                </label>

                <Summary state={state} />
              </div>
            ) : null}
          </div>
        </div>
      </Container>

      {/* Sticky action bar — always reachable with a thumb. */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border-hairline bg-background/92 backdrop-blur-md md:static md:mt-12 md:border-0 md:bg-transparent md:backdrop-blur-none">
        <Container>
          <div className="mx-auto flex max-w-[46rem] items-center gap-3 py-3.5 md:py-0">
            {stepIndex > 0 ? (
              <Button variant="secondary" size="lg" onClick={goBack} className="shrink-0 px-6">
                Zpět
              </Button>
            ) : null}
            <Button
              size="lg"
              className="flex-1"
              disabled={!canContinue || submitting}
              onClick={goNext}
            >
              {step.id === 'udaje' ? 'Potvrdit rezervaci' : 'Pokračovat'}
            </Button>
          </div>
        </Container>
      </div>
    </div>
  )
}

function Summary({ state }: { state: BookingState }) {
  const service = getService(state.serviceSlug ?? '')
  const when = state.startsAt ? new Date(state.startsAt) : null
  const therapist = ACTIVE_THERAPISTS.find((t) => t.slug === state.therapistSlug)

  const rows: Array<[string, string]> = [
    ['Masáž', service?.name ?? '—'],
    ['Délka', state.durationMinutes ? `${state.durationMinutes} min` : '—'],
    ['Počet osob', state.partySize === 2 ? '2 osoby' : '1 osoba'],
    ['Terapeut', therapist?.name ?? 'Kterákoli dostupná'],
    [
      'Termín',
      when
        ? when.toLocaleString('cs-CZ', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit',
          })
        : '—',
    ],
    ['Místo', `${LOCATION.name}, ${LOCATION.address.street}`],
  ]

  return (
    <div className="mt-8 rounded-card-lg border border-border-subtle bg-surface p-6">
      <h3 className="text-eyebrow text-secondary">Shrnutí</h3>
      <dl className="mt-4 divide-y divide-border-hairline">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-6 py-2.5">
            <dt className="text-small text-secondary">{k}</dt>
            <dd className="text-right text-[0.9375rem]">{v}</dd>
          </div>
        ))}
        <div className="flex items-baseline justify-between gap-6 pt-4">
          <dt className="text-small text-secondary">Cena</dt>
          <dd className="text-right">
            {state.promotionLabel ? (
              <span className="text-eyebrow mr-2 rounded-pill bg-accent px-2 py-0.5">
                {state.promotionLabel}
              </span>
            ) : null}
            <span className="font-display text-[1.625rem] leading-none">
              {state.priceCzk ? formatPrice(state.priceCzk) : '—'}
            </span>
          </dd>
        </div>
      </dl>
      <p className="text-small mt-5 text-secondary">
        Platba na místě. {BOOKING_POLICY.cancellationNote}
      </p>
    </div>
  )
}
