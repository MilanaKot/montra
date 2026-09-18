export interface Therapist {
  slug: string
  name: string
  /** Short line shown on the card. */
  specialization: string
  bio: string[]
  photo: string | null
  active: boolean
  /**
   * True while this entry is a stand-in rather than a real member of staff.
   * Everything flagged here MUST be replaced before the site goes live —
   * see docs/team-original.md for the real people and docs/content-migration.md §4.
   */
  isPlaceholder: boolean
}

/**
 * ⚠️  ZÁSTUPNÉ PERSONY — NEPOUŽÍVAT V OSTRÉM PROVOZU  ⚠️
 *
 * The Beroun team is really Somyong, Kung and Mimi. Their names, biographies
 * and portraits are NOT used here on purpose: this prototype ships
 * AI-generated portraits, and putting a synthetic face under a real person's
 * name would misrepresent both the staff and what a guest is booking.
 *
 * So the three entries below are invented people with invented histories,
 * paired with the AI portraits. They preserve the real team's *shape* — one
 * therapist trained in traditional Thai technique, one focused on relaxation
 * and oils, one on the musculoskeletal side — so the layout and the
 * therapist picker in the booking flow can be reviewed honestly.
 *
 * Before launch: replace these with the real content from docs/team-original.md
 * and real photographs, and drop `isPlaceholder`.
 */
export const THERAPISTS: Therapist[] = [
  {
    slug: 'arthit',
    name: 'Arthit',
    specialization: 'Tradiční thajská masáž · cílená práce se zády a šíjí',
    bio: [
      'Arthit se tradiční thajské masáži věnuje od mládí — techniku se učil v Thajsku a pracoval tam několik let, než přišel do Čech.',
      'Pracuje spíš pomalu a s citem pro tlak, který host snese. Bývá vyhledávaný lidmi, kteří tráví den u počítače a cítí napětí v ramenou a šíji.',
      'Domluví se česky i anglicky.',
    ],
    photo: '/images/tym-arthit.png',
    active: true,
    isPlaceholder: true,
  },
  {
    slug: 'ploy',
    name: 'Ploy',
    specialization: 'Relaxační, olejové a aroma masáže',
    bio: [
      'Ploy má nejraději klidné olejové masáže — ty, u kterých hosté usínají.',
      'Dobře pracuje s aromaterapií a ráda vůni vybere podle toho, jak se ten den cítíte. Pokud si nevíte rady, poradí.',
      'V Berouně je součástí týmu několik let.',
    ],
    photo: '/images/tym-ploy.png',
    active: true,
    isPlaceholder: true,
  },
  {
    slug: 'mali',
    name: 'Mali',
    specialization: 'Tradiční thajská masáž · pohybový aparát',
    bio: [
      'Mali se školila přímo v Thajsku a zaměřuje se na tradiční thajskou techniku — tlak, protažení a práci s celým tělem.',
      'Ke každému hostovi přistupuje individuálně: než začne, vždy se zeptá, co vás trápí, a masáž tomu přizpůsobí.',
      'Její masáže patří mezi nejintenzivnější, které u nás najdete.',
    ],
    photo: '/images/tym-mali.png',
    active: true,
    isPlaceholder: true,
  },
]

export const ACTIVE_THERAPISTS = THERAPISTS.filter((t) => t.active)

/** True while any therapist entry is still a stand-in. */
export const TEAM_IS_PLACEHOLDER = THERAPISTS.some((t) => t.isPlaceholder)

export function getTherapist(slug: string): Therapist | undefined {
  return THERAPISTS.find((t) => t.slug === slug)
}
