export interface SlotQuery {
  serviceSlug: string
  durationMinutes: number
  partySize: number
  /** Therapist slug, or null for "kterákoli dostupná". */
  therapistSlug: string | null
  /** ISO date (YYYY-MM-DD) to start looking from. */
  fromDate: string
  days: number
}

export interface Slot {
  /** Full ISO timestamp of the slot start, in salon local time. */
  startsAt: string
  /** YYYY-MM-DD, for grouping. */
  date: string
  /** HH:MM, for display. */
  time: string
  /** Server-calculated price. The browser never sends a price back. */
  priceCzk: number
  /** Set when a promotion applies to this exact slot. */
  promotion?: {
    slug: string
    label: string
    originalPriceCzk: number
    note?: string
  }
  /** Therapists that could take this slot. */
  therapistSlugs: string[]
}

export interface SlotDay {
  date: string
  label: string
  dateLabel: string
  slots: Slot[]
}

/**
 * The seam between UI and backend. Swap the mock implementation for a real
 * fetch() against the availability endpoint without touching any component.
 */
export interface AvailabilityProvider {
  getSlots(query: SlotQuery): Promise<SlotDay[]>
  /** Next few openings across all services, for the homepage teaser. */
  getNextAvailable(limit: number): Promise<Array<Slot & { serviceSlug: string; durationMinutes: number }>>
}
