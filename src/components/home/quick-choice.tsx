import Image from 'next/image'
import Link from 'next/link'
import { ArrowIcon, Container, SectionHead } from '@/components/ui'

/**
 * The spine of the site: people arrive with a complaint, not with a product
 * name. Everything below this section is subordinate to it.
 */
const CHOICES = [
  {
    title: 'Chci si odpočinout',
    text: 'Jemné olejové a aroma masáže',
    href: '/masaze?kategorie=relaxacni',
    image: '/images/salon-oleje-a-bylinky.jpg',
    alt: 'Masážní oleje a sušené bylinky na dřevěném stole',
  },
  {
    title: 'Trápí mě záda a šíje',
    text: 'Uvolnit krk, ramena a záda',
    href: '/masaze?kategorie=cilene',
    image: '/images/masaz-zada-a-sije.jpg',
    alt: 'Terapeutka uvolňuje hostovi svaly v oblasti zad a šíje',
  },
  {
    title: 'Chci pravou thajskou masáž',
    text: 'Tlaková a protahovací technika',
    href: '/masaze?kategorie=klasicke',
    image: '/images/salon-masazni-lehatko.jpg',
    alt: 'Thajská matrace připravená k tradiční masáži',
  },
  {
    title: 'Chceme masáž ve dvou',
    text: 'Vedle sebe, ve stejný čas',
    href: '/masaze?kategorie=specialni',
    image: '/images/salon-parova-mistnost.jpg',
    alt: 'Párová místnost se dvěma matracemi vedle sebe',
  },
]

export function QuickChoice() {
  return (
    <section className="section border-t border-border-hairline" id="co-potrebujete">
      <Container>
        <SectionHead
          eyebrow="Kudy začít"
          title="Co dnes potřebujete?"
          lede="Vyberte, s čím přicházíte. Zbytek za vás zúžíme my."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {CHOICES.map((c) => (
            <li key={c.href}>
              <Link href={c.href} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem]">
                  <Image
                    src={c.image}
                    alt={c.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out-soft group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="text-display-3 mt-5 lg:min-h-[2.2em]">{c.title}</h3>
                <p className="text-small mt-2 inline-flex items-center gap-2 text-secondary">
                  {c.text}
                  <ArrowIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
