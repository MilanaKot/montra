export type ServiceCategory =
  | 'klasicke'
  | 'cilene'
  | 'relaxacni'
  | 'premiove'
  | 'specialni'

export interface ServiceDurationOption {
  minutes: number
  priceCzk: number
  /** Shown next to the duration, e.g. "masáž zad" for the 60min Royal/Hot stone. */
  note?: string
  /** Marks the duration the salon recommends. Never the most expensive by default. */
  recommended?: boolean
}

export interface Service {
  slug: string
  name: string
  category: ServiceCategory
  /** 2–3 lines. Shown in the catalogue card. Wellness language, no medical claims. */
  summary: string
  /** Long-form copy for the detail page. */
  description: string[]
  durations: ServiceDurationOption[]
  /** Practical notes surfaced on the detail page and in the booking summary. */
  notes?: string[]
  /** How many therapists must be free at the same time for one booking. */
  requiredTherapists: number
  /** Party sizes this service can be booked for. */
  partySizes: number[]
  image: string
  popular?: boolean
  /**
   * Verbatim copy from the current montra.cz/beroun price list, preserved so no
   * business content is lost in migration. Some of these contain therapeutic
   * claims ("léčí", "zbaví Vás migrén"); they are intentionally NOT published —
   * see docs/content-migration.md. `summary`/`description` above are the
   * published, wellness-worded versions.
   */
  legacyDescription: string
}

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  klasicke: 'Klasické',
  cilene: 'Cílené',
  relaxacni: 'Relaxační',
  premiove: 'Prémiové',
  specialni: 'Speciální',
}

export const CATEGORY_ORDER: ServiceCategory[] = [
  'klasicke',
  'cilene',
  'relaxacni',
  'premiove',
  'specialni',
]
