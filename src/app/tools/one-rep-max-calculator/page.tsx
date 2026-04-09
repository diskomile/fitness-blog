import type { Metadata } from 'next'
import Link from 'next/link'
import OneRepMaxCalculator from '@/components/tools/OneRepMaxCalculator'

export const metadata: Metadata = {
  title: '1 Rep Max Calculator — Estimate Your 1RM Instantly',
  description:
    'Free 1 rep max calculator for squat, bench press, deadlift and more. Enter your weight and reps to get your estimated 1RM and full percentage table.',
}

export default function OneRepMaxPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-2">
        <Link href="/tools" className="text-sm text-zinc-500 hover:text-orange-400 transition-colors">
          ← All Tools
        </Link>
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          1-Rep Max Calculator
        </h1>
        <p className="mt-2 text-zinc-400">
          Estimate your one-rep max for any lift using the Epley formula. Get a full percentage table for your training zones.
        </p>
      </div>

      <OneRepMaxCalculator />

      <div className="mt-12 space-y-4 border-t border-zinc-800 pt-8">
        <h2 className="text-xl font-bold text-white">How to use your 1RM for programming</h2>
        <p className="text-zinc-400">
          Your 1RM is the foundation of strength programming. Use it to set weights for different rep ranges: <strong className="text-white">85-95%</strong> for strength work (1-5 reps), <strong className="text-white">67-85%</strong> for hypertrophy (6-12 reps), and <strong className="text-white">below 67%</strong> for endurance and conditioning.
        </p>
        <div className="flex gap-4">
          <Link href="/tools/tdee-calculator" className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:border-orange-500/50 hover:text-orange-400 transition-colors">
            TDEE Calculator →
          </Link>
          <Link href="/tools/macro-calculator" className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:border-orange-500/50 hover:text-orange-400 transition-colors">
            Macro Calculator →
          </Link>
        </div>
      </div>
    </main>
  )
}
