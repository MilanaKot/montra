import Link from 'next/link'
import { LogoMark } from '@/components/brand/logo-mark'
import { LOCATION } from '@/content/location'
import { Container } from '@/components/ui'

const NAV = [
  { href: '/masaze', label: 'Masáže' },
  { href: '/akce', label: 'Akce' },
  { href: '/darkove-poukazy', label: 'Dárkové poukazy' },
  { href: '/o-nas', label: 'O nás' },
  { href: '/kontakt', label: 'Kontakt' },
]

const BRANCHES = [
  { href: 'https://www.montra.cz/rudna/', label: 'Rudná u Prahy' },
  { href: 'https://www.montra.cz/mlada-boleslav/', label: 'Mladá Boleslav' },
  { href: 'https://www.montra.cz/kladno/', label: 'Kladno' },
  { href: 'https://www.montra.cz/praha10/', label: 'Praha 10' },
  { href: 'https://www.montra.cz/praha6/', label: 'Praha 6' },
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
            <div className="flex items-center gap-3 text-brand-ink">
              <LogoMark className="h-9 w-auto" />
              <p className="text-[1.375rem] leading-none font-medium tracking-[0.24em] uppercase">
                Montra
              </p>
            </div>
            <p className="text-small mt-3 tracking-[0.18em] text-secondary uppercase">
              Thajské masáže &amp; wellness
            </p>
            <p className="text-body-lg mt-5 max-w-sm text-secondary">
              Thajské masáže v Berouně. Otevřeli jsme zde jako první salon Montra
              v dubnu 2009.
            </p>
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
            <h2 className="text-eyebrow text-secondary">Montra</h2>
            <ul className="mt-5 space-y-3">
              {BRANCHES.map((b) => (
                <li key={b.href}>
                  <a
                    href={b.href}
                    className="text-[0.9375rem] text-secondary transition-colors hover:text-foreground"
                  >
                    {b.label}
                  </a>
                </li>
              ))}
            </ul>
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
