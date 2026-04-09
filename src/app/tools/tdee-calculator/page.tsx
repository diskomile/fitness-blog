import type { Metadata } from 'next'
import Link from 'next/link'
import TdeeCalculator from '@/components/tools/TdeeCalculator'

export const metadata: Metadata = {
  title: 'TDEE Calculator — Total Daily Energy Expenditure',
  description:
    'Free TDEE calculator. Find out exactly how many calories you need per day to lose weight, maintain, or bulk up. Based on the Mifflin-St Jeor formula.',
}

export default function TdeeCalculatorPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-2">
        <Link href="/tools" className="text-sm text-zinc-500 hover:text-orange-400 transition-colors">
          ← All Tools
        </Link>
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          TDEE Calculator
        </h1>
        <p className="mt-2 text-zinc-400">
          Calculate your Total Daily Energy Expenditure using the Mifflin-St Jeor formula — the most accurate method for estimating daily calorie needs.
        </p>
      </div>

      <TdeeCalculator />

      <div className="mt-12 space-y-6 border-t border-zinc-800 pt-8">
        <h2 className="text-xl font-bold text-white">What is TDEE?</h2>
        <p className="text-zinc-400">
          Your <strong className="text-white">Total Daily Energy Expenditure (TDEE)</strong> is the total number of calories your body burns in a day — including exercise, daily movement, and basic bodily functions. It&apos;s the single most important number for body composition.
        </p>
        <h2 className="text-xl font-bold text-white">How is it calculated?</h2>
        <p className="text-zinc-400">
          We use the <strong className="text-white">Mifflin-St Jeor formula</strong> to calculate your Basal Metabolic Rate (BMR), then multiply by an activity factor. This is the formula most commonly used by registered dietitians and has the highest accuracy across populations.
        </p>
        <div className="flex gap-4">
          <Link href="/tools/macro-calculator" className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:border-orange-500/50 hover:text-orange-400 transition-colors">
            Macro Calculator →
          </Link>
          <Link href="/tools/one-rep-max-calculator" className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:border-orange-500/50 hover:text-orange-400 transition-colors">
            1RM Calculator →
          </Link>
        </div>
      </div>
    </main>
  )
}
