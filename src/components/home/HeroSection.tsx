import Link from 'next/link'

const stats = [
  { value: '50+', label: 'Articles' },
  { value: '12', label: 'Free Tools' },
  { value: '6', label: 'Workout Plans' },
  { value: '100%', label: 'Free to Start' },
]

const features = [
  {
    icon: '📰',
    title: 'Daily Fitness Articles',
    desc: 'Evidence-based articles on workouts, nutrition, and supplements — published every 2 days.',
  },
  {
    icon: '🧮',
    title: '12 Free Calculators',
    desc: 'TDEE, macros, 1RM, BMI, strength standards, sleep, water, heart rate zones, and more.',
  },
  {
    icon: '🏋️',
    title: 'Workout Plans + Logger',
    desc: '6 goal-based plans. Log your weights and reps directly in the app — for free.',
  },
  {
    icon: '📅',
    title: 'Gym Calendar',
    desc: 'Track every training session, build streaks, and visualise your consistency.',
  },
  {
    icon: '📏',
    title: 'Measurement Tracker',
    desc: 'Log weight, body fat %, and 8 body measurements. Watch yourself progress.',
  },
  {
    icon: '💊',
    title: 'Supplement Guides',
    desc: 'Honest, price-per-serving comparisons of the best supplements in Europe.',
  },
]

export default function HeroSection() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-800 bg-zinc-950 py-24 sm:py-32">
        {/* Grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #f97316 1px, transparent 1px), linear-gradient(to bottom, #f97316 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-sm font-medium text-orange-400">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
            Evidence-Based Fitness — Free Forever
          </div>

          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Train Smarter.{' '}
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              Get Results.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Science-backed guides, free fitness tools, workout plans with logging,
            and a full training tracker — all in one place, no credit card needed.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/sign-up"
              className="rounded-xl bg-orange-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-orange-400 hover:shadow-orange-400/30"
            >
              Start for Free →
            </Link>
            <Link
              href="/blog"
              className="rounded-xl border border-zinc-700 px-8 py-3.5 text-sm font-bold text-zinc-300 transition-all hover:border-zinc-500 hover:text-white"
            >
              Read Articles
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 py-4">
                <p className="text-2xl font-extrabold text-orange-400">{s.value}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-zinc-800 bg-zinc-950 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Everything you need to{' '}
              <span className="text-orange-400">reach your goals</span>
            </h2>
            <p className="mt-3 text-zinc-400">
              No subscriptions required for the core features. Just sign up and go.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-zinc-600 hover:bg-zinc-800"
              >
                <div className="mb-4 inline-flex rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-2xl transition-colors group-hover:border-orange-500/30 group-hover:bg-orange-500/10">
                  {f.icon}
                </div>
                <h3 className="mb-2 font-bold text-white">{f.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="border-b border-zinc-800 bg-zinc-950 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white">
            Free to start.{' '}
            <span className="text-orange-400">Pro when you&apos;re ready.</span>
          </h2>
          <p className="mt-3 text-zinc-400">No credit card needed. Cancel anytime.</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-7 text-left">
              <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                Free Forever
              </p>
              <p className="mt-2 text-4xl font-extrabold text-white">€0</p>
              <ul className="mt-5 space-y-2.5 text-sm text-zinc-400">
                {[
                  'Blog & articles',
                  '12 fitness tools',
                  'Gym calendar & streak',
                  '6 workout plans + logger',
                  'Body measurement tracker',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-green-400">✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/sign-up"
                className="mt-6 block rounded-xl border border-zinc-700 py-3 text-center text-sm font-bold text-white transition-colors hover:border-zinc-500"
              >
                Get Started Free →
              </Link>
            </div>

            <div className="relative rounded-2xl border border-orange-500 bg-gradient-to-br from-orange-500/10 to-zinc-900 p-7 text-left">
              <div className="absolute -top-3 left-6">
                <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
                  MOST POPULAR
                </span>
              </div>
              <p className="text-sm font-semibold uppercase tracking-wider text-orange-400">Pro</p>
              <div className="mt-2 flex items-end gap-1">
                <p className="text-4xl font-extrabold text-white">€9.99</p>
                <p className="mb-1 text-sm text-zinc-500">/month</p>
              </div>
              <ul className="mt-5 space-y-2.5 text-sm text-zinc-400">
                {[
                  'Everything in Free',
                  'Progress graphs & analytics',
                  'AI-powered training tips',
                  'PDF workout export',
                  'Priority support',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-orange-400">✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing"
                className="mt-6 block rounded-xl bg-orange-500 py-3 text-center text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:bg-orange-400"
              >
                See Full Plan →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
