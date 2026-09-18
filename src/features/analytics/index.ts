/**
 * Vendor-neutral analytics seam. No provider is wired up — the project does not
 * have one yet. Swap `sink` for a real adapter and every call site keeps working.
 */
export type AnalyticsEvent =
  | 'booking_started'
  | 'booking_service_selected'
  | 'booking_duration_selected'
  | 'booking_slot_selected'
  | 'booking_details_started'
  | 'booking_completed'
  | 'voucher_started'
  | 'voucher_completed'
  | 'phone_clicked'
  | 'navigation_clicked'

type Payload = Record<string, string | number | boolean | null | undefined>

let sink: ((event: AnalyticsEvent, payload?: Payload) => void) | null = null

export function setAnalyticsSink(fn: typeof sink) {
  sink = fn
}

export function track(event: AnalyticsEvent, payload?: Payload) {
  sink?.(event, payload)
  if (process.env.NODE_ENV === 'development') {
    console.debug('[analytics]', event, payload ?? {})
  }
}
