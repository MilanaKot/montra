import type { ServiceCategory } from './services.types'

export type DiscountType = 'fixed_price' | 'percentage' | 'second_person_free'
export type PaymentRestriction = 'cash_only' | 'none'

export interface PromotionRule {
  slug: string
  name: string
  /** Short line for the Akce page card. */
  tagline: string
  description: string[]
  /** Which service slugs this applies to. Empty = all services. */
  serviceSlugs: string[]
  serviceCategories?: ServiceCategory[]
  /** 0 = Sunday … 6 = Saturday. */
  daysOfWeek: number[]
  /** Slot must START within this window (local salon time). */
  startWindow: { from: string; to: string } | null
  discountType: DiscountType
  /** fixed_price: map of duration -> price. percentage: 0..100. */
  fixedPrices?: Record<number, number>
  percentage?: number
  partySize: number | null
  paymentRestriction: PaymentRestriction
  /** Not valid on Czech public holidays. */
  excludePublicHolidays: boolean
  stackable: boolean
  /** Whether gift vouchers can be redeemed against this promotion. */
  vouchersAllowed: boolean
  /** Whether the visit counts towards the loyalty card. */
  countsTowardsLoyalty: boolean
  active: boolean
  terms: string[]
}

/**
 * Promotions transcribed from montra.cz/beroun/akce/481 (Akční masáže a Happy
 * Hours Beroun). Prices, time windows and restrictions are verbatim.
 *
 * HAPPY HOURS is deliberately `active: false` with no windows: the current site
 * states "Pokud v této kolonce není uveden žádný čas ani datum, masáže pro dva
 * za cenu jednoho nenabízíme!!" — so it must never be advertised unless the
 * salon publishes a concrete time. Windows are managed in the admin.
 */
export const PROMOTIONS: PromotionRule[] = [
  {
    slug: 'akcni-ceny',
    name: 'Akční ceny pro jednotlivce',
    tagline: 'Pondělí až pátek 9:00–14:00',
    description: [
      'Každý všední den od 9:00 do 14:00 nabízíme thajskou celotělovou olejovou masáž a masáž zad a šíje za akční cenu.',
      'Poslední masáž za akční cenu je možná od 13:00 na 60 minut nebo od 13:30 na 30 minut. Na odpolední termíny se za akční cenu objednat nelze.',
    ],
    serviceSlugs: ['celotelova-olejova', 'zada-a-sije'],
    daysOfWeek: [1, 2, 3, 4, 5],
    startWindow: { from: '09:00', to: '14:00' },
    discountType: 'fixed_price',
    fixedPrices: { 30: 599, 45: 699, 60: 849, 90: 1199, 120: 1499 },
    partySize: null,
    paymentRestriction: 'cash_only',
    excludePublicHolidays: true,
    stackable: false,
    vouchersAllowed: false,
    countsTowardsLoyalty: false,
    active: true,
    terms: [
      'Platbu přijímáme pouze v hotovosti.',
      'Akční ceny neplatí ve dnech státního svátku.',
      'Na akční masáže nelze uplatnit dárkové poukazy.',
      'Zlevněné masáže se nezapisují do věrnostní kartičky ani permanentky a nelze je kombinovat s dalšími slevami.',
    ],
  },
  {
    slug: 'happy-hours',
    name: 'Happy Hours',
    tagline: 'Masáž pro dva za cenu jedné',
    description: [
      'Happy Hours je masáž pro dva ve stejný čas za cenu jedné masáže. Přijďte ve dvou, plaťte jednou.',
      'Pokud si vyberete masáže různých cen, platí se vždy cena vyšší z nich. Například za 60 minut olejové masáže zaplatíte v termínu Happy Hours pouze 990 Kč celkem.',
      'Happy Hours vypisujeme na konkrétní termíny. Pokud u nás žádný termín právě vypsaný není, masáže pro dva za cenu jedné v tu chvíli nenabízíme.',
    ],
    serviceSlugs: [],
    daysOfWeek: [1, 2, 3, 4, 5, 6],
    startWindow: null,
    discountType: 'second_person_free',
    partySize: 2,
    paymentRestriction: 'cash_only',
    excludePublicHolidays: true,
    stackable: false,
    vouchersAllowed: false,
    countsTowardsLoyalty: false,
    active: false,
    terms: [
      'Platba pouze v hotovosti.',
      'Počátek a konec masáže je určen vypsaným časem.',
      'Při masážích různých cen se platí cena vyšší masáže.',
      'Na Happy Hours nelze uplatnit dárkové poukazy.',
      'Happy Hours se nezapisují do věrnostní kartičky ani permanentky a nelze je kombinovat s dalšími slevami.',
    ],
  },
]

/** Non-slot offers shown on /akce but not applied by the booking engine. */
export const STANDING_OFFERS = [
  {
    slug: 'vernostni-karta',
    name: 'Věrnostní karta',
    tagline: 'Jedenáctá masáž v hodnotě 990 Kč zdarma',
    description: [
      'Za každou masáž dostanete razítko do věrnostní kartičky. Jedenáctá masáž v hodnotě 990 Kč je zdarma.',
      'Do kartičky se nezapisují Happy Hours ani masáže za akční cenu.',
    ],
  },
  {
    slug: 'permanentky',
    name: 'Permanentky',
    tagline: 'Pravidelná péče výhodněji',
    description: [
      'Největší efekt odborných thajských masáží se projeví při jejich pravidelném absolvování — a s permanentkou ještě ušetříte.',
      'O aktuálních variantách permanentek se rádi domluvíme na pobočce nebo telefonicky.',
    ],
  },
  {
    slug: 'serie-anti-cellulite',
    name: 'Série anti-cellulite procedur',
    tagline: 'Při zakoupení 10 procedur je další zdarma',
    description: [
      'Anti-cellulite masáž je vhodná jako série opakovaných procedur. Doporučujeme 10 intervalů po 90 minutách.',
      'Při zakoupení celé série 10 procedur je další procedura zdarma.',
    ],
  },
] as const
