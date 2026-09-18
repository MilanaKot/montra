import type { Metadata } from 'next'
import { Suspense } from 'react'
import { BookingFlow } from '@/components/booking/flow'

export const metadata: Metadata = {
  title: 'Rezervace online',
  description:
    'Rezervujte si thajskou masáž v Berouně online. Bez registrace, za necelé dvě minuty.',
  alternates: { canonical: '/rezervace' },
  robots: { index: false, follow: true },
}

export default function RezervacePage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <BookingFlow />
    </Suspense>
  )
}
