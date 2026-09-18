export interface Therapist {
  slug: string
  /** Display name as used on the current site. */
  name: string
  /** Short line shown on the card. */
  specialization: string
  bio: string[]
  /**
   * Photo path. The real portraits live on the current site under
   * montra.cz/maserky/ — drop them into public/images/tym/ under these names
   * and they are picked up automatically. Until then the card renders initials.
   */
  photo: string | null
  active: boolean
}

/**
 * The Beroun team, transcribed from montra.cz/beroun/nase-maserky.
 * Note: Somyong is described on the current site as a "thajský masér" — the
 * new UI therefore says "náš tým" / "terapeut" rather than "masérky".
 */
export const THERAPISTS: Therapist[] = [
  {
    slug: 'somyong',
    name: 'Somyong',
    specialization: 'Tradiční thajská masáž · cílená práce se zády a šíjí',
    bio: [
      'Somyong je naše slunce — má neomezenou zásobu pozitivní energie, kterou vás při masáži zahrne.',
      'Je velmi kvalifikovaný thajský masér s rozsáhlými znalostmi. Své umění získával od dětství, v Thajsku provozoval vlastní masážní salon a pracoval v thajském sanatoriu v Bangkoku jako fyzioterapeut, kde spolupracoval s lékaři.',
      'Dokáže u hosta najít místo, odkud napětí vychází, a ví, jak mu ulevit. V Berouně má dnes velkou klientelu ze širokého okolí.',
    ],
    photo: null,
    active: true,
  },
  {
    slug: 'kung',
    name: 'Kung',
    specialization: 'Relaxační a olejové masáže',
    bio: [
      'Kung k nám přiletěla teprve nedávno, ale už je velmi žádanou masérkou.',
      'Můžete od ní očekávat vždy jen poctivou masáž, po které se vám uleví — a dokáže vám navodit slunečnou náladu i ve dnech deštivých.',
      'Pokud hledáte relax na duši i na těle, objednejte se právě ke Kung.',
    ],
    photo: null,
    active: true,
  },
  {
    slug: 'mimi',
    name: 'Mimi',
    specialization: 'Tradiční thajská masáž · pohybový aparát',
    bio: [
      'Mimi patří mezi oblíbené masérky našeho salonu. Své zkušenosti získala přímo v Thajsku, kde se věnovala tradiční thajské masáži a zdokonalovala své techniky.',
      'Díky praxi a citlivému přístupu dokáže uvolnit ztuhlé svaly i zmírnit dlouhodobé napětí.',
      'Ke každému hostovi přistupuje individuálně a masáž vždy přizpůsobí jeho aktuálním potřebám.',
    ],
    photo: null,
    active: true,
  },
]

export const ACTIVE_THERAPISTS = THERAPISTS.filter((t) => t.active)

export function getTherapist(slug: string): Therapist | undefined {
  return THERAPISTS.find((t) => t.slug === slug)
}
