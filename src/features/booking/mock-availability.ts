import { SERVICES, getService } from '@/content/services'
import { PROMOTIONS } from '@/content/promotions'
import { ACTIVE_THERAPISTS } from '@/content/therapists'
import { LOCATION, BOOKING_POLICY } from '@/content/location'
import type { AvailabilityProvider, Slot, SlotDay, SlotQuery } from './types'
import { addDays, dateLabel, dayLabel, startOfDay } from '@/lib/utils'

/*
 * PROTOTYPE DATA ONLY.
 *
 * Slots here are generated deterministically from the date so the prototype
 * looks alive and stays stable between renders. This is NOT an availability
 * engine: it does not know about real bookings, therapist schedules, rooms or
 * buffers. Replace this module with a server-backed provider before any real
 * booking is taken — the `AvailabilityProvider` interface is the only contract
 * the UI depends on.
 */

/** Deterministic pseudo-random in [0,1) from a string seed. */
function seeded(seed: string): number {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return ((h >>> 0) % 10000) / 10000
}

function iso(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function priceFor(serviceSlug: string, minutes: number): number {
  const svc = getService(serviceSlug)
  const opt = svc?.durations.find((d) => d.minutes === minutes)
  return opt?.priceCzk ?? svc?.durations[0]?.priceCzk ?? 0
}

function minutesOf(hhmm: string): number {
  const [h = '0', m = '0'] = hhmm.split(':')
  return Number(h) * 60 + Number(m)
}

/**
 * Applies the real promotion rules to a candidate slot. Promo prices are never
 * hardcoded in a component — they come from src/content/promotions.ts.
 */
function applyPromotion(
  serviceSlug: string,
  minutes: number,
  date: Date,
  startMinutes: number,
  partySize: number,
  basePrice: number,
): Slot['promotion'] | undefined {
  for (const promo of PROMOTIONS) {
    if (!promo.active) continue
    if (!promo.daysOfWeek.includes(date.getDay())) continue
    if (promo.serviceSlugs.length && !promo.serviceSlugs.includes(serviceSlug)) continue
    if (promo.partySize !== null && promo.partySize !== partySize) continue
    if (promo.startWindow) {
      const from = minutesOf(promo.startWindow.from)
      const to = minutesOf(promo.startWindow.to)
      if (startMinutes < from || startMinutes >= to) continue
      // "Poslední masáž za akční cenu je možná od 13:00 na 60 minut,
      //  nebo od 13:30 na 30 minut." -> the massage must fit inside the window.
      if (startMinutes + minutes > to + 60) continue
    }
    if (promo.discountType === 'fixed_price') {
      const p = promo.fixedPrices?.[minutes]
      if (p === undefined || p >= basePrice) continue
      return {
        slug: promo.slug,
        label: 'Akční termín',
        originalPriceCzk: basePrice,
        note: 'Platba pouze v hotovosti',
      }
    }
    if (promo.discountType === 'second_person_free') {
      return {
        slug: promo.slug,
        label: 'Happy Hours',
        originalPriceCzk: basePrice * 2,
        note: 'Masáž pro dva za cenu jedné',
      }
    }
  }
  return undefined
}

function promotionPrice(
  serviceSlug: string,
  minutes: number,
  date: Date,
  startMinutes: number,
  partySize: number,
  basePrice: number,
): number {
  for (const promo of PROMOTIONS) {
    if (!promo.active || promo.discountType !== 'fixed_price') continue
    if (!promo.daysOfWeek.includes(date.getDay())) continue
    if (promo.serviceSlugs.length && !promo.serviceSlugs.includes(serviceSlug)) continue
    if (promo.startWindow) {
      const from = minutesOf(promo.startWindow.from)
      const to = minutesOf(promo.startWindow.to)
      if (startMinutes < from || startMinutes >= to) continue
      if (startMinutes + minutes > to + 60) continue
    }
    const p = promo.fixedPrices?.[minutes]
    if (p !== undefined && p < basePrice) return p
  }
  return basePrice
}

function openingFor(date: Date): { open: number; close: number } | null {
  const rule = LOCATION.openingHours.find((h) => h.weekday === date.getDay())
  if (!rule?.open || !rule.close) return null
  return { open: minutesOf(rule.open), close: minutesOf(rule.close) }
}

function slotsForDay(
  date: Date,
  serviceSlug: string,
  minutes: number,
  partySize: number,
  therapistSlug: string | null,
  now: Date,
): Slot[] {
  const hours = openingFor(date)
  if (!hours) return []

  const service = getService(serviceSlug)
  const required = service?.requiredTherapists ?? 1
  const pool = ACTIVE_THERAPISTS.filter((t) => !therapistSlug || t.slug === therapistSlug)
  // A party of two, or a four-hands massage, needs more than one therapist free.
  const needed = Math.max(required, partySize > 1 ? 2 : 1)
  if (pool.length < needed) return []

  const total = minutes + BOOKING_POLICY.preparationMinutes
  const out: Slot[] = []
  const earliest = now.getTime() + BOOKING_POLICY.minimumLeadMinutes * 60_000

  for (let start = hours.open; start + total <= hours.close; start += 30) {
    const at = new Date(date)
    at.setHours(Math.floor(start / 60), start % 60, 0, 0)
    if (at.getTime() < earliest) continue

    const key = `${iso(date)}|${start}|${serviceSlug}|${minutes}|${partySize}|${therapistSlug ?? '*'}`
    // Busier in the afternoon, and a narrower therapist filter frees up less.
    const load = start > 14 * 60 ? 0.62 : 0.42
    const bias = therapistSlug ? 0.18 : 0
    if (seeded(key) < load + bias) continue

    const base = priceFor(serviceSlug, minutes) * (partySize > 1 && required === 1 ? 2 : 1)
    const promotion = applyPromotion(serviceSlug, minutes, date, start, partySize, base)
    const price =
      promotion?.slug === 'happy-hours'
        ? priceFor(serviceSlug, minutes)
        : promotionPrice(serviceSlug, minutes, date, start, partySize, base)

    out.push({
      startsAt: at.toISOString(),
      date: iso(date),
      time: `${String(at.getHours()).padStart(2, '0')}:${String(at.getMinutes()).padStart(2, '0')}`,
      priceCzk: price,
      ...(promotion ? { promotion } : {}),
      therapistSlugs: pool.slice(0, needed).map((t) => t.slug),
    })
  }
  return out
}

export const mockAvailability: AvailabilityProvider = {
  async getSlots(query: SlotQuery): Promise<SlotDay[]> {
    const now = new Date()
    const from = startOfDay(new Date(`${query.fromDate}T00:00:00`))
    const days: SlotDay[] = []

    for (let i = 0; i < query.days; i++) {
      const d = addDays(from, i)
      const slots = slotsForDay(
        d,
        query.serviceSlug,
        query.durationMinutes,
        query.partySize,
        query.therapistSlug,
        now,
      )
      if (!slots.length) continue
      days.push({
        date: iso(d),
        label: dayLabel(d, now),
        dateLabel: dateLabel(d),
        slots,
      })
    }
    return days
  },

  async getNextAvailable(limit) {
    const now = new Date()
    const picks = ['celotelova-olejova', 'zada-a-sije', 'tradicni-thajska', 'bio-kokosova']
    const out: Array<Slot & { serviceSlug: string; durationMinutes: number }> = []

    for (let i = 0; i < 7 && out.length < limit; i++) {
      const d = addDays(startOfDay(now), i)
      for (const slug of picks) {
        if (out.length >= limit) break
        const svc = SERVICES.find((s) => s.slug === slug)
        const minutes = svc?.durations.find((x) => x.recommended)?.minutes ?? 60
        const slots = slotsForDay(d, slug, minutes, 1, null, now)
        const slot = slots[Math.floor(seeded(`${iso(d)}${slug}`) * slots.length)]
        if (slot) out.push({ ...slot, serviceSlug: slug, durationMinutes: minutes })
      }
    }
    return out.slice(0, limit)
  },
}
