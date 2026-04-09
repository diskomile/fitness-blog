import DeloadPlanner from '@/components/tools/DeloadPlanner'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Deload Week Planner',
  description: 'Find out if you need a deload week and get a personalised deload protocol based on your training age and fatigue symptoms.',
}

export default function DeloadPlannerPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">
          Deload <span className="text-orange-400">Planner</span>
        </h1>
        <p className="mt-2 text-zinc-400">
          Find out if you need a deload and get a full week plan tailored to your training experience.
        </p>
      </div>
      <DeloadPlanner />
    </main>
  )
}
