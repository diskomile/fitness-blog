import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing — Free & Pro Plans',
  description: 'IronPulse Fitness is free to use. Upgrade to Pro for workout logging, advanced analytics, exercise GIFs, and more.',
}

const freeFeatures = [
  { label: '12 fitness calculators & tools', included: true },
  { label: 'Full blog access (new articles every 2 days)', included: true },
  { label: 'Gym Calendar — track sessions & streak', included: true },
  { label: '6 goal-based workout plans', included: true },
  { label: '3 exercises per workout day', included: true },
  { label: 'Body measurement tracker', included: true },
  { label: 'Supplement comparison guides', included: true },
  { label: 'Newsletter', included: true },
  { label: 'Workout log (weights & reps)', included: false },
  { label: 'Mood & muscle group tracking', included: false },
  { label: '15+ exercises per day with video GIFs', included: false },
  { label: 'Progress graphs & analytics', included: false },
  { label: 'PDF workout export', included: false },
  { label: 'AI-powered training tips', included: false },
]

const proFeatures = [
  { label: 'Everything in Free', included: true },
  { label: 'Workout log — track weights, sets & reps', included: true },
  { label: 'Mood & muscle group tracking per session', included: true },
  { label: '15+ exercises per day with video GIFs', included: true },
  { label: 'Progress graphs & analytics', included: true },
  { label: 'PDF workout export', included: true },
  { label: 'AI-powered personalised training tips', included: true },
  { label: 'Priority support', included: true },
]

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-white">
          Simple, <span className="text-orange-400">Honest</span> Pricing
        </h1>
        <p className="mt-3 text-lg text-zinc-400">
          Most features are completely free. Upgrade for the full experience.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Free */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Free Forever</p>
            <p className="mt-2 text-5xl font-extrabold text-white">€0</p>
            <p className="mt-1 text-zinc-500">No credit card required</p>
          </div>
          <Link href="/sign-up"
            className="mb-8 block w-full rounded-xl border border-zinc-700 py-3 text-center text-sm font-bold text-white hover:border-zinc-500 transition-colors">
            Get Started Free →
          </Link>
          <ul className="space-y-3">
            {freeFeatures.map((f) => (
              <li key={f.label} className="flex items-start gap-3">
                <span className={`mt-0.5 shrink-0 text-sm ${f.included ? 'text-green-400' : 'text-zinc-700'}`}>
                  {f.included ? '✓' : '✗'}
                </span>
                <span className={`text-sm ${f.included ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  {f.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pro */}
        <div className="relative rounded-2xl border border-orange-500 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="rounded-full bg-orange-500 px-4 py-1 text-xs font-bold text-white">
              MOST POPULAR
            </span>
          </div>
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-orange-400">Pro</p>
            <div className="mt-2 flex items-end gap-2">
              <p className="text-5xl font-extrabold text-white">€9.99</p>
              <p className="mb-1 text-zinc-500">/month</p>
            </div>
            <p className="mt-1 text-zinc-500">Cancel anytime</p>
          </div>
          <button disabled
            className="mb-8 block w-full rounded-xl bg-orange-500 py-3 text-center text-sm font-bold text-white opacity-60 cursor-not-allowed">
            Coming Soon
          </button>
          <ul className="space-y-3">
            {proFeatures.map((f) => (
              <li key={f.label} className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 text-sm text-orange-400">✓</span>
                <span className="text-sm text-zinc-300">{f.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-16">
        <h2 className="mb-6 text-center text-2xl font-extrabold text-white">
          Frequently Asked Questions
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { q: 'Is the free plan really free forever?', a: 'Yes. The core blog, calculators, gym calendar, and workout plans are permanently free. No hidden fees, no time limits.' },
            { q: 'When will Pro launch?', a: 'We\'re currently building Pro features. Sign up free now and you\'ll be notified when Pro launches.' },
            { q: 'What payment methods will you accept?', a: 'Credit/debit cards and major European payment methods via Stripe.' },
            { q: 'Can I cancel anytime?', a: 'Yes. Cancel with one click from your dashboard. You\'ll keep access until the end of your billing period.' },
          ].map(({ q, a }) => (
            <div key={q} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <p className="font-semibold text-white">{q}</p>
              <p className="mt-2 text-sm text-zinc-400">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
