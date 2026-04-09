import SleepCalculator from '@/components/tools/SleepCalculator'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sleep Calculator',
  description: 'Calculate the best times to go to sleep or wake up based on 90-minute sleep cycles. Optimise recovery and muscle growth.',
}

export default function SleepCalculatorPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">
          Sleep <span className="text-orange-400">Calculator</span>
        </h1>
        <p className="mt-2 text-zinc-400">
          Wake up refreshed by timing your sleep to complete 90-minute cycles.
        </p>
      </div>
      <SleepCalculator />
    </main>
  )
}
