import WaterIntake from '@/components/tools/WaterIntake'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Daily Water Intake Calculator',
  description: 'Calculate exactly how much water you should drink per day based on your weight, activity level, and climate.',
}

export default function WaterIntakePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">
          Water <span className="text-orange-400">Intake Calculator</span>
        </h1>
        <p className="mt-2 text-zinc-400">
          Find out exactly how much water you need daily — with an hourly drinking schedule.
        </p>
      </div>
      <WaterIntake />
    </main>
  )
}
