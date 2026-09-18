import Image from 'next/image'
import Link from 'next/link'
import { ArrowIcon, Container, SectionHead } from '@/components/ui'

const CHOICES = [
  {
    title: 'Chci si odpočinout',
    text: 'Jemné olejové a aroma masáže',
    href: '/masaze?kategorie=relaxacni',
    image: '/images/salon-oleje-a-bylinky.jpg',
    alt: 'Masážní oleje, balzámy a sušené bylinky na dřevěném stole',
  },
  {
    title: 'Trápí mě záda a šíje',
    text: 'Cílené masáže zad, ramen a krku',
    href: '/masaze?kategorie=cilene',
    image: '/images/masaz-zada-a-sije.jpg',
    alt: 'Terapeutka uvolňuje hostovi svaly v oblasti zad a šíje',
  },
  {
    title: 'Chci pravou thajskou masáž',
    text: 'Tradiční tlaková a protahovací technika',
    href: '/masaze?kategorie=klasicke',
    image: '/images/salon-masazni-lehatko.jpg',
    alt: 'Thajská matrace připravená k tradiční masáži, s válcovým polštářem',
  },
  {
    title: 'Chceme masáž ve dvou',
    text: 'Párové masáže a společné zážitky',
    href: '/masaze?kategorie=specialni',
    image: '/images/salon-parova-mistnost.jpg',
    alt: 'Párová místnost se dvěma thajskými matracemi vedle sebe',
  },
]

export function QuickChoice() {
  return (
    <section className="section" id="co-potrebujete">
      <Container>
        <SectionHead
          eyebrow="Kudy začít"
          title="Co dnes potřebujete?"
          lede="Čtyři nejčastější důvody, proč k nám hosté chodí. Vyberte ten svůj a my vám ukážeme jen to podstatné."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {CHOICES.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="group flex h-full flex-col overflow-hidden rounded-card-lg border border-border-subtle bg-surface transition-colors duration-300 hover:border-foreground/30"
              >
                <div className="relative aspect-[5/4] overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out-soft group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-display-3">{c.title}</h3>
                  <p className="text-small mt-2.5 flex-1 text-secondary">{c.text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[0.9375rem]">
                    Vybrat
                    <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
