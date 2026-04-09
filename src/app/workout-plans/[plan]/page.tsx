import { currentUser } from '@clerk/nextjs/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { WORKOUT_PLANS, getPlanBySlug, getPlanColorClasses } from '@/lib/workout-plans'
import { getPlanLogs } from '@/app/workout-log/actions'
import WorkoutLogger from '@/components/workout/WorkoutLogger'

export function generateStaticParams() {
  return WORKOUT_PLANS.map((p) => ({ plan: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ plan: string }> }) {
  const { plan: slug } = await params
  const plan = getPlanBySlug(slug)
  if (!plan) return {}
  return { title: `${plan.name} Workout Plan` }
}

export default async function PlanPage({ params }: { params: Promise<{ plan: string }> }) {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  const { plan: slug } = await params
  const plan = getPlanBySlug(slug)
  if (!plan) notFound()

  const colorClass = getPlanColorClasses(plan.color)
  const previousLogs = await getPlanLogs(slug)

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      {/* Back */}
      <Link
        href="/workout-plans"
        className="mb-8 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors"
      >
        ← All Plans
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-3">
          <span className="text-4xl">{plan.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-extrabold text-white">{plan.name}</h1>
              <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${colorClass}`}>
                {plan.level}
              </span>
            </div>
            <p className="text-zinc-400">{plan.tagline}</p>
          </div>
        </div>
        <p className="text-zinc-400">{plan.description}</p>
        <div className="mt-4 flex gap-6 text-sm text-zinc-500">
          <span>🗓 {plan.daysPerWeek} days/week</span>
          <span>🎯 {plan.goal}</span>
        </div>
      </div>

      {/* Days */}
      <div className="space-y-8">
        {plan.days.map((day) => (
          <div key={day.label} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            {/* Day header */}
            <div className="mb-4 flex items-center gap-3">
              <span className={`rounded-lg border px-2 py-1 text-xs font-bold ${colorClass}`}>
                {day.label}
              </span>
              <h2 className="font-bold text-white">{day.focus}</h2>
            </div>

            {/* Exercises */}
            <div className="space-y-3">
              {day.exercises.map((ex, i) => (
                <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-white">{ex.name}</p>
                      <p className="mt-0.5 text-xs text-zinc-500">{ex.muscle}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-bold text-orange-400">
                        {ex.sets} × {ex.reps}
                      </p>
                      <p className="text-xs text-zinc-500">sets × reps</p>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-zinc-400">💡 {ex.tip}</p>
                </div>
              ))}
            </div>

            {/* Workout Logger */}
            <WorkoutLogger
              planSlug={slug}
              dayLabel={day.label}
              exercises={day.exercises.map((ex) => ({
                name: ex.name,
                sets: ex.sets,
                reps: ex.reps,
                muscle: ex.muscle,
              }))}
              previousLogs={previousLogs}
            />
          </div>
        ))}
      </div>
    </main>
  )
}
