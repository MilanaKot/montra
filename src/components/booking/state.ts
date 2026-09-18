import type { Service } from '@/content/services.types'

export type StepId = 'sluzba' | 'delka' | 'osoby' | 'terapeut' | 'termin' | 'udaje'

export const STEPS: Array<{ id: StepId; label: string; heading: string }> = [
  { id: 'sluzba', label: 'Masáž', heading: 'Jakou masáž si přejete?' },
  { id: 'delka', label: 'Délka', heading: 'Jak dlouhou masáž si přejete?' },
  { id: 'osoby', label: 'Osoby', heading: 'Pro kolik osob?' },
  { id: 'terapeut', label: 'Terapeut', heading: 'Máte oblíbenou masérku?' },
  { id: 'termin', label: 'Termín', heading: 'Vyberte termín' },
  { id: 'udaje', label: 'Údaje', heading: 'Vaše údaje' },
]

export interface BookingState {
  serviceSlug: string | null
  durationMinutes: number | null
  partySize: number
  therapistSlug: string | null
  startsAt: string | null
  priceCzk: number | null
  promotionLabel: string | null
  name: string
  phone: string
  email: string
  note: string
  marketingConsent: boolean
}

export const EMPTY_STATE: BookingState = {
  serviceSlug: null,
  durationMinutes: null,
  partySize: 1,
  therapistSlug: null,
  startsAt: null,
  priceCzk: null,
  promotionLabel: null,
  name: '',
  phone: '',
  email: '',
  note: '',
  marketingConsent: false,
}

const KEY = 'montra:rezervace'

/**
 * The unfinished flow is kept in sessionStorage so a refresh doesn't lose it.
 * Customer contact details are deliberately excluded — they are never persisted
 * in the browser.
 */
export function persist(state: BookingState) {
  if (typeof window === 'undefined') return
  const { name: _n, phone: _p, email: _e, note: _no, ...safe } = state
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(safe))
  } catch {
    /* private mode / storage disabled — the flow still works, just not resumable */
  }
}

export function restore(): Partial<BookingState> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.sessionStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Partial<BookingState>) : {}
  } catch {
    return {}
  }
}

export function clearPersisted() {
  try {
    window.sessionStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
}

/** Durations the chosen service actually supports — never a generic 30/60/90 list. */
export function durationsFor(service: Service | undefined) {
  return service?.durations ?? []
}

export function partySizesFor(service: Service | undefined): number[] {
  return service?.partySizes ?? [1]
}
