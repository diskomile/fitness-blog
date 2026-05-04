import type { Metadata } from 'next'
import WorkoutGeneratorForm from './WorkoutGeneratorForm'

export const metadata: Metadata = {
  title: 'Personalized Workout Plan Generator — BurnLab',
  description: 'Generate a custom workout plan based on your gender, goal, fitness level, and available equipment. Powered by AI.',
}

export default function WorkoutGeneratorPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          Workout Plan <span className="text-orange-400">Generator</span>
        </h1>
        <p className="mt-3 text-zinc-400">
          Answer 4 questions and get a personalised workout plan with exercise instructions — built for your exact goal and equipment.
        </p>
      </div>
      <WorkoutGeneratorForm />
    </main>
  )
}
