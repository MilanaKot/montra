import { SERVICES } from './services'

/**
 * What someone arrives with — not how the price list is organised.
 *
 * The two are deliberately different. `prémiové` is a price tier, so nobody
 * turns up wanting "something premium"; `speciální` is a grab bag holding
 * couples, four-hands, pregnancy and children's massage together. When the
 * cards were aliases for categories, Royal and Hot Stone were unreachable and
 * "we want a massage for two" listed children's massage.
 *
 * So a scenario owns an explicit list of services and crosses categories
 * freely. Royal appears under both the traditional and the back-and-neck
 * scenario — it is a Thai massage with herbal compresses, and its 60-minute
 * option is a back massage.
 */
export interface Scenario {
  id: string
  title: string
  /** One line, in the imperative — what the guest gets, not the category. */
  text: string
  image: string
  alt: string
  serviceSlugs: string[]
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'odpocinout',
    title: 'Chci si odpočinout',
    text: 'Jemné olejové a aroma masáže',
    image: '/images/salon-oleje-a-bylinky.jpg',
    alt: 'Masážní oleje a sušené bylinky na dřevěném stole',
    serviceSlugs: [
      'bio-kokosova',
      'levandulova',
      'aloe-vera',
      'horky-olej',
      'pestici-biokokos',
      'konopna-euforia',
      'granatove-jablko',
      'skoricova-detox',
      'tepla-levandulova-aroma',
      'tepla-skoricova-aroma',
      'citronova-trava',
      'hot-stone',
    ],
  },
  {
    id: 'zada-a-sije',
    title: 'Trápí mě záda a šíje',
    text: 'Uvolnit krk, ramena, záda i nohy',
    image: '/images/masaz-zada-a-sije.jpg',
    alt: 'Terapeutka uvolňuje hostovi svaly v oblasti zad a šíje',
    serviceSlugs: [
      'zada-a-sije',
      'proti-bolestem-hlavy',
      'office',
      'nohy',
      'hot-stone',
      'royal-bylinna',
    ],
  },
  {
    id: 'tradicni',
    title: 'Chci pravou thajskou masáž',
    text: 'Tlaková a protahovací technika',
    image: '/images/salon-masazni-lehatko.jpg',
    alt: 'Thajská matrace připravená k tradiční masáži',
    serviceSlugs: ['tradicni-thajska', 'royal-bylinna', 'celotelova-olejova'],
  },
  {
    id: 've-dvou',
    title: 'Chceme masáž ve dvou',
    text: 'Vedle sebe, ve stejný čas',
    image: '/images/salon-parova-mistnost.jpg',
    alt: 'Párová místnost se dvěma matracemi vedle sebe',
    serviceSlugs: ['parova-biokokos', 'ctyri-ruce'],
  },
]

/** Less common reasons to come. Shown as a quiet line under the four cards. */
export const SECONDARY_SCENARIOS: Scenario[] = [
  {
    id: 'plet',
    title: 'Péče o pleť',
    text: 'Obličejové masáže a omlazující kosmetika',
    image: '',
    alt: '',
    serviceSlugs: ['face-anti-age', 'omlazujici-kosmetika-obliceje'],
  },
  {
    id: 'tehotenstvi',
    title: 'Čekám miminko',
    text: 'Těhotenská masáž od ukončeného třetího měsíce',
    image: '',
    alt: '',
    serviceSlugs: ['tehotenska-biokokosova'],
  },
  {
    id: 'deti',
    title: 'Masáž pro dítě',
    text: 'Jemná celotělová masáž pro děti do 12 let',
    image: '',
    alt: '',
    serviceSlugs: ['detska-olejova'],
  },
  {
    id: 'postava',
    title: 'Chci pracovat na postavě',
    text: 'Anti-cellulite masáž jako série procedur',
    image: '',
    alt: '',
    serviceSlugs: ['anti-cellulite'],
  },
]

const ALL = [...SCENARIOS, ...SECONDARY_SCENARIOS]

export function getScenario(id: string): Scenario | undefined {
  return ALL.find((s) => s.id === id)
}

/** Every service must be reachable from at least one scenario. */
export function unreachableServices(): string[] {
  const covered = new Set(ALL.flatMap((s) => s.serviceSlugs))
  return SERVICES.filter((s) => !covered.has(s.slug)).map((s) => s.slug)
}
