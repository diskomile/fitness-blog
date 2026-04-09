import SupplementTiming from '@/components/tools/SupplementTiming'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Supplement Timing Guide',
  description: 'Find the optimal time to take creatine, protein, caffeine, and other supplements based on your workout schedule.',
}

export default function SupplementTimingPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">
          Supplement <span className="text-orange-400">Timing</span>
        </h1>
        <p className="mt-2 text-zinc-400">
          Enter your workout time and get personalised timing recommendations for every major supplement.
        </p>
      </div>
      <SupplementTiming />
    </main>
  )
}
