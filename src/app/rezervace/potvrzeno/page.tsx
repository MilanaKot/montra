import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Confirmation } from '@/components/booking/confirmation'

export const metadata: Metadata = {
  title: 'Rezervace potvrzena',
  robots: { index: false, follow: false },
}

export default function PotvrzenoPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <Confirmation />
    </Suspense>
  )
}
