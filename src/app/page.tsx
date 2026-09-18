import { Hero } from '@/components/home/hero'
import { QuickChoice } from '@/components/home/quick-choice'
import { Popular } from '@/components/home/popular'
import { About } from '@/components/home/about'
import { Team } from '@/components/home/team'
import { VoucherBand } from '@/components/home/voucher-band'
import { ContactBlock } from '@/components/contact/contact-block'

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickChoice />
      <Popular />
      <About />
      <Team />
      <VoucherBand />
      <ContactBlock />
    </>
  )
}
