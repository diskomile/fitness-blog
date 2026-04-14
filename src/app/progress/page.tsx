import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { supabaseAdmin } from '@/lib/supabase'
import BodyWeightChart from '@/components/charts/BodyWeightChart'
import ExerciseProgressChart from '@/components/charts/ExerciseProgressChart'

export const metadata = { title: 'Progress — IronPulse Fitness' }

type SetLog = { weight: number; reps: number }

async function getProgressData(userId: string) {
  const [measurementsResult, workoutLogsResult] = await Promise.all([
    supabaseAdmin
      .from('body_measurements')
      .select('measured_at, weight_kg, body_fat_pct')
      .eq('user_id', userId)
      .order('measured_at', { ascending: true }),
    supabaseAdmin
      .from('workout_logs')
      .select('exercise_name, sets, logged_at')
      .eq('user_id', userId)
      .order('logged_at', { ascending: true }),
  ])

  // Body weight chart data
  const weightData = (measurementsResult.data ?? []).map((m) => ({
    date: m.measured_at,
    weight: m.weight_kg,
    bodyFat: m.body_fat_pct,
  }))

  // Exercise progress map: { exerciseName: [{ date, maxWeight, totalVolume }] }
  const rawLogs = workoutLogsResult.data ?? []
  const exerciseMap: Record<string, { date: string; maxWeight: number; totalVolume: number }[]> = {}

  for (const log of rawLogs) {
    const sets = log.sets as SetLog[]
    if (!sets?.length) continue

    const maxWeight = Math.max(...sets.map((s) => s.weight ?? 0))
    const totalVolume = sets.reduce((sum, s) => sum + (s.weight ?? 0) * (s.reps ?? 0), 0)
    const dateStr = log.logged_at.split('T')[0]

    if (!exerciseMap[log.exercise_name]) exerciseMap[log.exercise_name] = []

    // Merge same-day entries (keep highest weight)
    const existing = exerciseMap[log.exercise_name].find((e) => e.date === dateStr)
    if (existing) {
      existing.maxWeight = Math.max(existing.maxWeight, maxWeight)
      existing.totalVolume += totalVolume
    } else {
      exerciseMap[log.exercise_name].push({ date: dateStr, maxWeight, totalVolume })
    }
  }

  // Sort exercises by number of sessions (most logged first)
  const sortedExerciseMap = Object.fromEntries(
    Object.entries(exerciseMap)
      .sort(([, a], [, b]) => b.length - a.length)
      .slice(0, 20)
  )

  return { weightData, exerciseMap: sortedExerciseMap }
}

export default async function ProgressPage() {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  const { weightData, exerciseMap } = await getProgressData(user.id)

  const totalExercises = Object.keys(exerciseMap).length
  const totalSessions = Object.values(exerciseMap).reduce((sum, e) => sum + e.length, 0)

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white">
            Your <span className="text-orange-400">Progress</span>
          </h1>
          <p className="mt-1 text-zinc-400">Track strength gains and body composition over time.</p>
        </div>
        <Link href="/dashboard" className="text-sm text-zinc-500 hover:text-white transition-colors">
          ← Dashboard
        </Link>
      </div>

      {/* Summary stats */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-center">
          <p className="text-2xl font-extrabold text-orange-400">{weightData.length}</p>
          <p className="mt-0.5 text-xs text-zinc-500">Measurements</p>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-center">
          <p className="text-2xl font-extrabold text-blue-400">{totalSessions}</p>
          <p className="mt-0.5 text-xs text-zinc-500">Logged Sessions</p>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-center">
          <p className="text-2xl font-extrabold text-purple-400">{totalExercises}</p>
          <p className="mt-0.5 text-xs text-zinc-500">Exercises Tracked</p>
        </div>
      </div>

      {/* Charts */}
      <div className="space-y-6">
        <BodyWeightChart data={weightData} />
        <ExerciseProgressChart exerciseMap={exerciseMap} />
      </div>

      {/* CTAs if empty */}
      {weightData.length === 0 && totalExercises === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/30 p-10 text-center">
          <p className="text-4xl">📊</p>
          <p className="mt-3 font-bold text-white">No data yet</p>
          <p className="mt-1 text-sm text-zinc-400">
            Start logging workouts and measurements to see your progress charts here.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/workout-plans" className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-400 transition-colors">
              Log a Workout →
            </Link>
            <Link href="/measurements" className="rounded-xl border border-zinc-700 px-5 py-2.5 text-sm font-bold text-white hover:border-zinc-500 transition-colors">
              Add Measurement →
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}
