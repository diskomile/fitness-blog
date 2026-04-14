import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { supabaseAdmin } from '@/lib/supabase'

async function getDashboardStats(userId: string) {
  const [sessionsResult, logsResult, measurementsResult, recentLogsResult] = await Promise.all([
    supabaseAdmin
      .from('gym_sessions')
      .select('session_date')
      .eq('user_id', userId)
      .eq('was_at_gym', true)
      .order('session_date', { ascending: false }),
    supabaseAdmin
      .from('workout_logs')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId),
    supabaseAdmin
      .from('body_measurements')
      .select('measured_at, weight_kg')
      .eq('user_id', userId)
      .order('measured_at', { ascending: false })
      .limit(2),
    supabaseAdmin
      .from('workout_logs')
      .select('exercise_name, sets, plan_slug, day_label, logged_at')
      .eq('user_id', userId)
      .order('logged_at', { ascending: false })
      .limit(5),
  ])

  const sessions = sessionsResult.data ?? []
  const totalSessions = sessions.length
  const totalLogs = logsResult.count ?? 0
  const measurements = measurementsResult.data ?? []
  const recentLogs = recentLogsResult.data ?? []

  // Streak calc
  const sessionDates = new Set(sessions.map((s) => s.session_date))
  let streak = 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  for (let i = 0; i <= 365; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    if (sessionDates.has(dateStr)) {
      streak++
    } else if (i > 0) {
      break
    }
  }

  // Weight change
  let weightChange: number | null = null
  if (measurements.length === 2 && measurements[0].weight_kg && measurements[1].weight_kg) {
    weightChange = measurements[0].weight_kg - measurements[1].weight_kg
  }

  return {
    totalSessions,
    streak,
    totalLogs,
    latestWeight: measurements[0]?.weight_kg ?? null,
    weightChange,
    recentLogs,
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

type SetLog = { weight: number; reps: number }

export default async function DashboardPage() {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  const firstName =
    user.firstName ?? user.emailAddresses[0]?.emailAddress?.split('@')[0] ?? 'there'

  const { totalSessions, streak, totalLogs, latestWeight, weightChange, recentLogs } =
    await getDashboardStats(user.id)

  const stats = [
    {
      label: 'Current Streak',
      value: streak === 0 ? '—' : `${streak}d`,
      sub: streak === 0 ? 'No sessions yet' : streak === 1 ? '1 day in a row' : `${streak} days in a row`,
      color: 'text-orange-400',
      bg: 'bg-orange-400/10',
      emoji: '🔥',
    },
    {
      label: 'Total Sessions',
      value: totalSessions === 0 ? '—' : String(totalSessions),
      sub: totalSessions === 0 ? 'Start logging in calendar' : 'gym visits logged',
      color: 'text-green-400',
      bg: 'bg-green-400/10',
      emoji: '📅',
    },
    {
      label: 'Workout Sets',
      value: totalLogs === 0 ? '—' : String(totalLogs),
      sub: totalLogs === 0 ? 'No sets logged yet' : 'sets logged total',
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
      emoji: '🏋️',
    },
    {
      label: 'Body Weight',
      value: latestWeight ? `${latestWeight}kg` : '—',
      sub:
        weightChange !== null
          ? weightChange > 0
            ? `+${weightChange.toFixed(1)}kg from last`
            : `${weightChange.toFixed(1)}kg from last`
          : latestWeight
          ? 'Latest measurement'
          : 'No measurements yet',
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
      emoji: '📏',
    },
  ]

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white">
          Welcome back, <span className="text-orange-400">{firstName}</span> 👋
        </h1>
        <p className="mt-1 text-zinc-400">Here&apos;s your fitness overview.</p>
      </div>

      {/* Stats */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
          >
            <div className={`mb-3 inline-flex rounded-xl p-2 ${stat.bg}`}>
              <span className="text-xl">{stat.emoji}</span>
            </div>
            <p className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</p>
            <p className="mt-0.5 text-xs font-semibold text-zinc-400">{stat.label}</p>
            <p className="mt-0.5 text-xs text-zinc-600">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Quick links */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Quick Access
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                href: '/calendar',
                emoji: '📅',
                title: 'Gym Calendar',
                desc: 'Log today\'s session and build your streak.',
                cta: 'Open Calendar',
              },
              {
                href: '/workout-plans',
                emoji: '🏋️',
                title: 'Workout Plans',
                desc: '6 goal-based plans. Log weights and track PRs.',
                cta: 'View Plans',
              },
              {
                href: '/measurements',
                emoji: '📏',
                title: 'Measurements',
                desc: 'Track body weight, fat %, and 8 body measurements.',
                cta: 'Add Measurement',
              },
              {
                href: '/progress',
                emoji: '📊',
                title: 'Progress Charts',
                desc: 'Visualise strength gains and body weight trends over time.',
                cta: 'View Progress',
              },
              {
                href: '/tools',
                emoji: '🧮',
                title: 'Fitness Tools',
                desc: '12 science-based calculators — TDEE, macros, 1RM, and more.',
                cta: 'Open Tools',
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition-all hover:border-orange-500 hover:bg-zinc-800"
              >
                <div className="mb-3 text-2xl">{item.emoji}</div>
                <h3 className="font-bold text-white transition-colors group-hover:text-orange-400">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-zinc-400">{item.desc}</p>
                <p className="mt-3 text-xs font-semibold text-orange-400 opacity-0 transition-opacity group-hover:opacity-100">
                  {item.cta} →
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Recent Workout Logs
          </h2>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            {recentLogs.length === 0 ? (
              <div className="py-6 text-center">
                <p className="text-2xl">🏋️</p>
                <p className="mt-2 text-sm text-zinc-400">No workouts logged yet.</p>
                <Link
                  href="/workout-plans"
                  className="mt-3 inline-block text-xs font-semibold text-orange-400 hover:underline"
                >
                  Start a workout plan →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentLogs.map((log, i) => {
                  const sets = log.sets as SetLog[]
                  const best = sets.reduce(
                    (max, s) => (s.weight > max ? s.weight : max),
                    0
                  )
                  return (
                    <div key={i} className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          {log.exercise_name}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {sets.length} sets · {log.plan_slug}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        {best > 0 && (
                          <p className="text-sm font-bold text-orange-400">{best}kg</p>
                        )}
                        <p className="text-xs text-zinc-600">{formatDate(log.logged_at)}</p>
                      </div>
                    </div>
                  )
                })}
                <Link
                  href="/workout-plans"
                  className="mt-2 block text-center text-xs font-semibold text-zinc-500 hover:text-orange-400 transition-colors"
                >
                  Log a workout →
                </Link>
              </div>
            )}
          </div>

          {/* Upgrade CTA */}
          <div className="mt-4 rounded-2xl border border-zinc-700 bg-gradient-to-br from-zinc-900 to-zinc-950 p-5">
            <p className="text-sm font-bold text-white">Unlock Pro</p>
            <p className="mt-1 text-xs text-zinc-400">
              Progress graphs, AI tips, PDF export.
            </p>
            <Link
              href="/pricing"
              className="mt-3 block rounded-lg bg-orange-500 py-2 text-center text-xs font-bold text-white hover:bg-orange-400 transition-colors"
            >
              View Plans →
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
