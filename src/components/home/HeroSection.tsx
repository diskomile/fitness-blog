import Link from 'next/link'

export default function HeroSection() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-800 bg-zinc-950 py-20 sm:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #f97316 1px, transparent 1px), linear-gradient(to bottom, #f97316 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="mb-4 inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1 text-sm font-medium text-orange-400">
            Evidence-Based Fitness
          </div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Train Smarter.{' '}
            <span className="text-orange-400">Get Results.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Science-backed workout guides, honest supplement reviews, free fitness tools,
            and a training tracker — all in one place.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/sign-up"
              className="rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-400"
            >
              Start for Free
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:border-orange-500/50 hover:text-orange-400"
            >
              See Plans →
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-600">
            <span>✓ Free forever plan</span>
            <span>✓ No credit card required</span>
            <span>✓ 12 free fitness tools</span>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="border-b border-zinc-800 bg-zinc-950 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-10 text-center text-2xl font-extrabold text-white">
            Everything you need to <span className="text-orange-400">reach your goals</span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: '📰',
                title: 'Daily Fitness Articles',
                desc: 'AI-generated, evidence-based articles on workouts, nutrition, and supplements — published every 2 days.',
              },
              {
                icon: '🧮',
                title: '12 Free Calculators',
                desc: 'TDEE, macros, 1RM, BMI, strength standards, sleep, water, heart rate zones, and more.',
              },
              {
                icon: '🏋️',
                title: 'Workout Plans',
                desc: '6 goal-based plans: Beginner, Bulk, Cut, Strength, Conditioning, and Advanced.',
              },
              {
                icon: '📅',
                title: 'Gym Calendar',
                desc: 'Track every training session, build streaks, and see your consistency over time.',
              },
              {
                icon: '📏',
                title: 'Measurement Tracker',
                desc: 'Log weight, body fat %, and 8 body measurements. See your progress over time.',
              },
              {
                icon: '💊',
                title: 'Supplement Reviews',
                desc: 'Honest, price-per-serving comparisons of the best supplements available in Europe.',
              },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                <div className="mb-3 text-3xl">{f.icon}</div>
                <h3 className="mb-1 font-bold text-white">{f.title}</h3>
                <p className="text-sm text-zinc-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="border-b border-zinc-800 bg-zinc-950 py-14">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-extrabold text-white">
            Free to start. <span className="text-orange-400">Pro when you&apos;re ready.</span>
          </h2>
          <p className="mt-3 text-zinc-400">No credit card needed. Upgrade anytime.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-left">
              <p className="text-lg font-extrabold text-white">Free</p>
              <p className="mt-1 text-3xl font-extrabold text-white">€0</p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                <li>✓ Blog & articles</li>
                <li>✓ 12 fitness tools</li>
                <li>✓ Gym calendar & streak</li>
                <li>✓ 6 workout plans</li>
                <li>✓ Body measurements</li>
              </ul>
              <Link href="/sign-up"
                className="mt-5 block rounded-xl border border-zinc-700 py-2.5 text-center text-sm font-bold text-white hover:border-zinc-500 transition-colors">
                Get Started →
              </Link>
            </div>
            <div className="rounded-2xl border border-orange-500/50 bg-orange-500/5 p-6 text-left">
              <p className="text-lg font-extrabold text-white">Pro</p>
              <p className="mt-1 text-3xl font-extrabold text-white">€9.99<span className="text-base font-normal text-zinc-500">/mo</span></p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                <li>✓ Everything in Free</li>
                <li>✓ Workout log</li>
                <li>✓ 15+ exercises + GIFs</li>
                <li>✓ Progress graphs</li>
                <li>✓ PDF export</li>
              </ul>
              <Link href="/pricing"
                className="mt-5 block rounded-xl bg-orange-500 py-2.5 text-center text-sm font-bold text-white hover:bg-orange-400 transition-colors">
                See Full Plan →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
