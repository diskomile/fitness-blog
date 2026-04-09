import type { Metadata } from 'next'
import Link from 'next/link'
import MacroCalculator from '@/components/tools/MacroCalculator'

export const metadata: Metadata = {
  title: 'Macro Calculator — Protein, Carbs & Fat for Your Goal',
  description:
    'Free macro calculator. Get your personalized daily protein, carbs and fat targets for cutting, bulking or maintaining. Instant results.',
}

export default function MacroCalculatorPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-2">
        <Link href="/tools" className="text-sm text-zinc-500 hover:text-orange-400 transition-colors">
          ← All Tools
        </Link>
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          Macro Calculator
        </h1>
        <p className="mt-2 text-zinc-400">
          Get your personalized daily macronutrient targets — protein, carbohydrates, and fat — based on your goal and calorie needs.
        </p>
      </div>

      <MacroCalculator />

      <div className="mt-12 space-y-4 border-t border-zinc-800 pt-8">
        <h2 className="text-xl font-bold text-white">Why macros matter more than calories alone</h2>
        <p className="text-zinc-400">
          Two people eating the same calories can get very different results based on their macro split. <strong className="text-white">Protein</strong> preserves muscle during a cut and builds it during a bulk. <strong className="text-white">Carbs</strong> fuel training performance. <strong className="text-white">Fat</strong> supports hormones and nutrient absorption.
        </p>
        <div className="flex gap-4">
          <Link href="/tools/tdee-calculator" className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:border-orange-500/50 hover:text-orange-400 transition-colors">
            TDEE Calculator →
          </Link>
          <Link href="/tools/one-rep-max-calculator" className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:border-orange-500/50 hover:text-orange-400 transition-colors">
            1RM Calculator →
          </Link>
        </div>
      </div>
    </main>
  )
}
