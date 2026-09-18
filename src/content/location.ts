/**
 * Single source of truth for the Beroun branch.
 * Every value here is taken verbatim from the current montra.cz/beroun pages.
 * Do not invent values: if something is unknown, leave it out rather than guess.
 */

export const LOCATION = {
  slug: 'beroun',
  name: 'Montra Beroun',
  legalName: 'Thajské masáže Montra',
  branchLabel: 'BEROUN',
  /** Natural case — the branch selector is set in the display serif. */
  branchName: 'Beroun',

  address: {
    street: 'Slapská 130',
    city: 'Beroun',
    postalCode: '266 01',
    country: 'CZ',
    /** The salon is on the second floor, reachable by stairs. */
    floorNote: 'Salon je ve druhém patře. Přístup je po schodech — budova nemá výtah.',
  },

  geo: { lat: 49.9625932, lng: 14.0733429 },

  phone: { display: '777 758 755', e164: '+420777758755' },
  email: 'beroun@montra.cz',

  /**
   * Po–So 9–20 (21) h, Neděle po dohodě.
   * `closeMinute` is the guaranteed close; the site also advertises "(21)",
   * represented as `lateCloseMinute` — bookable only when staff schedule allows.
   */
  openingHours: [
    { weekday: 1, label: 'Pondělí', open: '09:00', close: '20:00' },
    { weekday: 2, label: 'Úterý', open: '09:00', close: '20:00' },
    { weekday: 3, label: 'Středa', open: '09:00', close: '20:00' },
    { weekday: 4, label: 'Čtvrtek', open: '09:00', close: '20:00' },
    { weekday: 5, label: 'Pátek', open: '09:00', close: '20:00' },
    { weekday: 6, label: 'Sobota', open: '09:00', close: '20:00' },
    { weekday: 0, label: 'Neděle', open: null, close: null, note: 'po dohodě' },
  ] as const,

  openingHoursSummary: 'Po–So 9:00–20:00',
  openingHoursNote: 'Neděle po dohodě. V pátek a sobotu masírujeme po domluvě i do 21:00.',

  /**
   * Deliberately empty: the salon has a Facebook page
   * (facebook.com/beroun.cz) but it is not linked from the site. Put profiles
   * back here and they reappear in the footer and in `sameAs`.
   */
  social: {} as Record<string, string>,

  maps: {
    directions:
      'https://www.google.com/maps/dir/?api=1&destination=Slapsk%C3%A1%20130%2C%20266%2001%20Beroun',
    embed:
      'https://www.google.com/maps?q=Slapsk%C3%A1%20130%2C%20266%2001%20Beroun&output=embed',
  },

  /** Provozovatel — from the Kontakt page. */
  operator: {
    name: 'Palavee, s.r.o.',
    street: 'Vrchlického 479/51',
    city: 'Praha 5',
    ico: '08947937',
    bankAccount: '1020441/5500',
  },

  /** Footer copyright as shown on the current site. */
  copyrightHolder: 'Montra s.r.o.',

  /** Other Montra branches — kept for the branch selector. */
  otherBranches: [
    { label: 'Rudná', href: 'https://www.montra.cz/rudna/' },
    { label: 'Ml. Boleslav', href: 'https://www.montra.cz/mlada-boleslav/' },
    { label: 'Kladno', href: 'https://www.montra.cz/kladno/' },
    { label: 'Praha 10', href: 'https://www.montra.cz/praha10/' },
    { label: 'Praha 6', href: 'https://www.montra.cz/praha6/' },
  ],
} as const

/**
 * Operational rules that exist in the current site copy — not invented here.
 *
 * - cancellationCutoffHours: "zrušte svoji rezervaci ... alespoň 24 hod předem,
 *   jinak Vám bude účtována masáž v plné ceně." (Něco o nás)
 * - preparationMinutes: "V každé masáži je zahrnuto 5 min na přípravu." (Něco o nás)
 */
export const BOOKING_POLICY = {
  cancellationCutoffHours: 24,
  cancellationNote:
    'Rezervaci lze bezplatně zrušit nejpozději 24 hodin před termínem. Při pozdějším zrušení účtujeme masáž v plné ceně.',
  preparationMinutes: 5,
  /** How far ahead the public calendar may be booked. */
  bookingHorizonDays: 60,
  /** Minimum lead time before the first bookable slot. */
  minimumLeadMinutes: 90,
  timeZone: 'Europe/Prague',
  currency: 'CZK',
} as const

export const CONTRAINDICATIONS = [
  'nemoc a horečnaté stavy',
  'silná menstruace',
  'stav po úrazu',
  'první tři měsíce těhotenství',
  'vysoký krevní tlak',
  'křečové žíly',
] as const
