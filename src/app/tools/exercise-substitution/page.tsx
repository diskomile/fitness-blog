import ExerciseSubstitution from '@/components/tools/ExerciseSubstitution'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Exercise Substitution Tool',
  description: 'No barbell? Shoulder injury? Home gym only? Find the best substitute for any exercise based on your equipment and limitations.',
}

export default function ExerciseSubstitutionPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">
          Exercise <span className="text-orange-400">Substitution</span>
        </h1>
        <p className="mt-2 text-zinc-400">
          No equipment? Injury? Find the best alternative for any exercise — tailored to your situation.
        </p>
      </div>
      <ExerciseSubstitution />
    </main>
  )
}
