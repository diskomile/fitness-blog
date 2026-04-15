import Link from 'next/link'

const steps = [
  { icon: '🔢', label: 'Calculate calories', href: '/tools/tdee-calculator' },
  { icon: '🥗', label: 'Set your macros', href: '/tools/macro-calculator' },
  { icon: '🏋️', label: 'Pick a workout plan', href: '/workout-plans' },
  { icon: '⚡', label: 'Add creatine', href: '/supplements/best-creatine' },
  { icon: '📊', label: 'Track progress', href: '/workout-log' },
]

export default function BeginnersStrip() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-2xl border border-orange-500/20 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-orange-400">New to fitness?</p>
              <h2 className="text-2xl font-extrabold text-white">Start Here — 5 Steps to Your First Real Results</h2>
            </div>
            <Link
              href="/beginners"
              className="shrink-0 rounded-xl border border-orange-500/40 px-5 py-2 text-sm font-bold text-orange-400 transition-colors hover:bg-orange-500/10"
            >
              Full beginner guide →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-5">
            {steps.map((s, i) => (
              <Link
                key={s.href}
                href={s.href}
                className="flex flex-col items-center rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-center transition-colors hover:border-orange-500/40"
              >
                <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-xs font-extrabold text-white">
                  {i + 1}
                </span>
                <span className="text-xl">{s.icon}</span>
                <span className="mt-2 text-xs font-semibold text-zinc-300">{s.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
