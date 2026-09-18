import { Hero } from '@/components/home/hero'
import { QuickChoice } from '@/components/home/quick-choice'
import { Popular } from '@/components/home/popular'
import { NextAvailable } from '@/components/home/next-available'
import { VoucherBand } from '@/components/home/voucher-band'
import { Team } from '@/components/home/team'
import { About } from '@/components/home/about'
import { ContactBlock } from '@/components/contact/contact-block'

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickChoice />
      <Popular />
      <NextAvailable />
      <VoucherBand />
      <Team />
      <About />
      <ContactBlock />
    </>
  )
}
