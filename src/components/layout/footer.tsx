import Link from 'next/link'
import { LOCATION } from '@/content/location'
import { Container } from '@/components/ui'

const NAV = [
  { href: '/masaze', label: 'Masáže' },
  { href: '/akce', label: 'Akce' },
  { href: '/darkove-poukazy', label: 'Dárkové poukazy' },
  { href: '/o-nas', label: 'O nás' },
  { href: '/kontakt', label: 'Kontakt' },
]

const LEGAL = [
  { href: '/vseobecne-obchodni-podminky', label: 'Všeobecné obchodní podmínky' },
  { href: '/zasady-zpracovani-osobnich-udaju', label: 'Zásady zpracování osobních údajů' },
  { href: '/cookies', label: 'Cookies' },
]

export function Footer() {
  return (
    <footer className="border-t border-border-hairline">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-5">
            <p className="text-[1.375rem] leading-none font-medium tracking-[0.22em] uppercase">
              Montra
            </p>
            <p className="text-body-lg mt-5 max-w-sm text-secondary">
              Thajské masáže v Berouně. Otevřeli jsme zde jako první salon Montra
              v dubnu 2009.
            </p>
            <a
              href={LOCATION.social.facebook}
              className="mt-6 inline-flex items-center gap-2 text-[0.9375rem] underline underline-offset-4 transition-colors hover:text-secondary"
            >
              Facebook
            </a>
          </div>

          <nav aria-label="Patička" className="md:col-span-3">
            <h2 className="text-eyebrow text-secondary">Navigace</h2>
            <ul className="mt-5 space-y-3">
              {NAV.map((i) => (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    className="text-[0.9375rem] transition-colors hover:text-secondary"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="text-eyebrow text-secondary">Kontakt</h2>
            <address className="mt-5 space-y-3 not-italic text-[0.9375rem]">
              <p>
                {LOCATION.address.street}
                <br />
                {LOCATION.address.postalCode} {LOCATION.address.city}
              </p>
              <p>
                <a
                  href={`tel:${LOCATION.phone.e164}`}
                  className="underline underline-offset-4 transition-colors hover:text-secondary"
                >
                  {LOCATION.phone.display}
                </a>
                <br />
                <a
                  href={`mailto:${LOCATION.email}`}
                  className="underline underline-offset-4 transition-colors hover:text-secondary"
                >
                  {LOCATION.email}
                </a>
              </p>
              <p className="text-secondary">
                {LOCATION.openingHoursSummary}
                <br />
                Neděle po dohodě
              </p>
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-border-hairline py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-small text-secondary">
            © {new Date().getFullYear()} {LOCATION.copyrightHolder} · Provozovatel{' '}
            {LOCATION.operator.name}, IČO {LOCATION.operator.ico}
          </p>
          <ul className="text-small flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="text-secondary transition-colors hover:text-foreground">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}
