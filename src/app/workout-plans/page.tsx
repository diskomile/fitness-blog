import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { WORKOUT_PLANS, getPlanColorClasses } from '@/lib/workout-plans'

export const metadata = { title: 'Workout Plans' }

export default async function WorkoutPlansPage() {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white">
          Workout <span className="text-orange-400">Plans</span>
        </h1>
        <p className="mt-1 text-zinc-400">
          Choose a goal-based plan and start training today.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {WORKOUT_PLANS.map((plan) => {
          const colorClass = getPlanColorClasses(plan.color)
          return (
            <Link
              key={plan.slug}
              href={`/workout-plans/${plan.slug}`}
              className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-zinc-600"
            >
              <div className="mb-3 text-3xl">{plan.emoji}</div>
              <div className="mb-2 flex items-center gap-2">
                <h2 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                  {plan.name}
                </h2>
                <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${colorClass}`}>
                  {plan.level}
                </span>
              </div>
              <p className="mb-4 text-sm text-zinc-400">{plan.tagline}</p>
              <div className="flex gap-4 text-xs text-zinc-500">
                <span>🗓 {plan.daysPerWeek} days/week</span>
                <span>🎯 {plan.goal}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
