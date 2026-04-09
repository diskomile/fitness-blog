import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  const firstName = user.firstName ?? user.emailAddresses[0]?.emailAddress?.split('@')[0] ?? 'there'

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white">
          Welcome back, <span className="text-orange-400">{firstName}</span>
        </h1>
        <p className="mt-1 text-zinc-400">Here&apos;s your fitness hub.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Gym Calendar */}
        <Link
          href="/calendar"
          className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-orange-500"
        >
          <div className="mb-3 text-3xl">📅</div>
          <h2 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
            Gym Calendar
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Track your training sessions and build your streak.
          </p>
        </Link>

        {/* Workout Plans */}
        <Link
          href="/workout-plans"
          className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-orange-500"
        >
          <div className="mb-3 text-3xl">🏋️</div>
          <h2 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
            Workout Plans
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Goal-based plans: bulk, cut, strength, beginner &amp; more.
          </p>
        </Link>

        {/* Calculators */}
        <Link
          href="/tools"
          className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-orange-500"
        >
          <div className="mb-3 text-3xl">🧮</div>
          <h2 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
            Fitness Tools
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            9 science-based calculators and tools.
          </p>
        </Link>

        {/* Measurements */}
        <Link
          href="/measurements"
          className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-orange-500"
        >
          <div className="mb-3 text-3xl">📏</div>
          <h2 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
            Body Measurements
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Track weight, body fat, and body measurements over time.
          </p>
        </Link>
      </div>

      {/* Free plan notice */}
      <div className="mt-10 rounded-2xl border border-zinc-700 bg-zinc-900/50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-white">Free Plan</p>
            <p className="mt-1 text-sm text-zinc-400">
              Upgrade to Pro for mood tracking, weight logs, detailed stats, 15+ exercises per muscle group, and workout GIFs.
            </p>
          </div>
          <button
            disabled
            className="ml-6 shrink-0 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white opacity-60 cursor-not-allowed"
          >
            Coming Soon
          </button>
        </div>
      </div>
    </main>
  )
}
