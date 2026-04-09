import StrengthStandards from '@/components/tools/StrengthStandards'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Strength Standards Calculator',
  description: 'Find out if your squat, bench, deadlift and overhead press are beginner, intermediate, advanced or elite level.',
}

export default function StrengthStandardsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">
          Strength <span className="text-orange-400">Standards</span>
        </h1>
        <p className="mt-2 text-zinc-400">
          See how your lifts compare to strength standards for your bodyweight. Enter your 1-rep maxes to find your level.
        </p>
      </div>
      <StrengthStandards />
    </main>
  )
}
