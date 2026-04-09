import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Best Pre-Workout Supplements 2026 — Full Ingredient Breakdown',
  description: 'Side-by-side comparison of stimulant and stim-free pre-workouts. We break down caffeine, citrulline, beta-alanine, and what actually works.',
}

type Product = {
  name: string
  brand: string
  type: string
  pricePerServing: string
  caffeine: string
  badge?: string | null
  pros: string[]
  cons: string[]
  verdict: string
  affiliateUrl: string
  score: number
}

const products: Product[] = [
  {
    name: 'THE Pre-Workout',
    brand: 'Bulk',
    type: 'Stimulant',
    pricePerServing: '€1.20',
    caffeine: '200mg',
    badge: '🏆 Best Overall',
    pros: [
      'Full clinical doses — no underdosing',
      '6g citrulline malate for pumps',
      '3.2g beta-alanine for endurance',
      '200mg caffeine — clean energy, no crash',
      'Transparent labelling — no proprietary blends',
    ],
    cons: [
      'Beta-alanine causes tingling (harmless but annoying for some)',
      'Slightly more expensive than basic options',
    ],
    verdict: "Bulk pre-workout is the gold standard for transparent, clinically-dosed formulas in Europe. Every ingredient is at an effective dose — no label padding. If you want one pre-workout that actually does what it claims, this is it.",
    affiliateUrl: 'https://www.bulk.com/uk/the-pre-workout.html',
    score: 10,
  },
  {
    name: 'Pre-Workout',
    brand: 'Myprotein',
    type: 'Stimulant',
    pricePerServing: '€0.85',
    caffeine: '200mg',
    badge: '💰 Best Budget',
    pros: [
      'Cheapest effective pre-workout in Europe',
      'Multiple flavours available',
      'Contains citrulline and beta-alanine',
      'Frequent 30-40% sales',
    ],
    cons: [
      'Some ingredients slightly underdosed vs clinical studies',
      'Proprietary blend — exact amounts unclear',
    ],
    verdict: "If budget is your priority, Myprotein delivers solid energy and pumps at the lowest price point. Not quite as well-dosed as Bulk, but hard to beat at this price — especially on sale.",
    affiliateUrl: 'https://www.myprotein.com/sports-nutrition/pre-workout/10530718.html',
    score: 8,
  },
  {
    name: 'THE Pump (Stim-Free)',
    brand: 'Bulk',
    type: 'Stimulant-Free',
    pricePerServing: '€1.10',
    caffeine: '0mg',
    badge: '🌙 Best Stim-Free',
    pros: [
      'Take it any time — even evening sessions',
      '8g citrulline malate — higher than most stimulant versions',
      'No caffeine tolerance buildup',
      'Great for people sensitive to stimulants',
    ],
    cons: [
      'No energy boost — just pumps and performance',
      'Not ideal if you train early morning and need alertness',
    ],
    verdict: "The best stim-free option on the market. Loaded with pump-focused ingredients at proper doses. Perfect for evening training or if you have cycled off caffeine.",
    affiliateUrl: 'https://www.bulk.com/uk/the-pump.html',
    score: 9,
  },
  {
    name: 'Pre-Workout Extreme',
    brand: 'Prozis',
    type: 'Stimulant',
    pricePerServing: '€1.00',
    caffeine: '250mg',
    badge: null,
    pros: [
      'Higher caffeine dose for experienced users',
      'Widely available in southern Europe',
      'Includes taurine and L-tyrosine for focus',
    ],
    cons: [
      'Too much caffeine for beginners (250mg)',
      'Less transparent than Bulk',
      'Can cause anxiety/jitteriness',
    ],
    verdict: "Decent option for experienced users in southern Europe. The 250mg caffeine is too high for beginners. Wait for Prozis discount codes and it becomes good value.",
    affiliateUrl: 'https://www.prozis.com/en/pre-workout',
    score: 7,
  },
  {
    name: 'C4 Original',
    brand: 'Cellucor',
    type: 'Stimulant',
    pricePerServing: '€1.50',
    caffeine: '150mg',
    badge: '⚠️ Overhyped',
    pros: [
      'Extremely well-known brand',
      'Widely available (Amazon, sports stores)',
      'Moderate caffeine — less likely to cause jitters',
    ],
    cons: [
      'Most ingredients are severely underdosed',
      'Only 1g citrulline (clinical dose is 6-8g)',
      'Relies heavily on marketing, not formula',
      'Expensive for what you get',
    ],
    verdict: "C4 is one of the most popular pre-workouts in the world — and one of the most underdosed. At 1g citrulline you are paying premium prices for sub-effective doses. The energy comes from caffeine. Just drink a coffee instead.",
    affiliateUrl: 'https://www.amazon.com/s?k=c4+pre+workout&tag=ironpulse08-20',
    score: 5,
  },
]

const ingredients = [
  {
    name: 'Caffeine',
    effectiveDose: '150–200mg',
    whatItDoes: 'Increases alertness, reduces perceived effort, improves power output by ~3-5%',
    verdict: 'The most evidence-backed ingredient. Effective. Tolerance builds quickly — cycle off for 2 weeks every 2 months.',
  },
  {
    name: 'Citrulline Malate',
    effectiveDose: '6–8g',
    whatItDoes: 'Increases blood flow (pumps), delays fatigue, improves endurance',
    verdict: 'Highly effective at proper doses. Most budget pre-workouts use 1–2g — too low to work. Check the label.',
  },
  {
    name: 'Beta-Alanine',
    effectiveDose: '3.2g',
    whatItDoes: 'Buffers lactic acid, delays muscular fatigue in high-rep training',
    verdict: 'Causes skin tingling (paresthesia) — harmless but common. Effective for high-rep sets and cardio.',
  },
  {
    name: 'L-Tyrosine',
    effectiveDose: '1–2g',
    whatItDoes: 'Supports dopamine production, improves focus under stress',
    verdict: 'Useful in higher doses. Most pre-workouts add 100–500mg — too low for meaningful effect.',
  },
  {
    name: 'Taurine',
    effectiveDose: '1–2g',
    whatItDoes: 'Reduces oxidative stress, may reduce muscle soreness',
    verdict: 'Modest benefits. Often added in functional doses — one of the safer supporting ingredients.',
  },
]

export default function BestPreWorkoutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/supplements" className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors">
        ← All Comparisons
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          Best Pre-Workout <span className="text-orange-400">2026</span>
        </h1>
        <p className="mt-3 text-zinc-400">
          We break down the ingredients that actually work, compare real formulas, and cut through the marketing hype.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-zinc-500">
          <span>📅 Updated April 2026</span>
          <span>🧪 5 products compared</span>
          <span>💶 Prices in EUR</span>
        </div>
      </div>

      {/* Warning callout */}
      <div className="mb-8 rounded-2xl border border-yellow-800 bg-yellow-900/20 p-5">
        <p className="text-sm font-semibold text-yellow-300">⚠️ The pre-workout problem</p>
        <p className="mt-2 text-sm text-zinc-400">
          90% of pre-workouts use <strong className="text-white">proprietary blends</strong> — ingredients listed without individual doses.
          A product can claim to contain 6g citrulline but only have 500mg. Always choose products with <strong className="text-white">fully transparent labelling</strong>.
        </p>
      </div>

      {/* Comparison table */}
      <div className="mb-10 overflow-x-auto rounded-2xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">Product</th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400">Type</th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400">Caffeine</th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400">Price/Serving</th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400">Score</th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 bg-zinc-950">
            {products.map((p) => (
              <tr key={p.name} className={p.score >= 9 ? 'bg-orange-500/5' : ''}>
                <td className="px-4 py-3">
                  <p className="font-semibold text-white">{p.name}</p>
                  <p className="text-xs text-zinc-500">{p.brand}</p>
                </td>
                <td className="px-4 py-3 text-center text-xs text-zinc-400">{p.type}</td>
                <td className="px-4 py-3 text-center text-xs font-medium text-zinc-300">{p.caffeine}</td>
                <td className="px-4 py-3 text-center font-bold text-white">{p.pricePerServing}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`font-bold ${p.score >= 9 ? 'text-orange-400' : p.score >= 7 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {p.score}/10
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <a href={p.affiliateUrl} target="_blank" rel="nofollow noopener sponsored"
                    className="rounded-lg bg-orange-500 px-3 py-1 text-xs font-bold text-white hover:bg-orange-400 transition-colors">
                    Buy
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detailed reviews */}
      <div className="space-y-6">
        <h2 className="text-xl font-extrabold text-white">Detailed Reviews</h2>
        {products.map((p, i) => (
          <div key={p.name} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-zinc-500">#{i + 1}</span>
                  <h3 className="text-lg font-extrabold text-white">{p.name}</h3>
                  {p.badge && (
                    <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-xs font-bold text-orange-400">
                      {p.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-500">{p.brand} · {p.type} · {p.caffeine} caffeine</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-2xl font-extrabold ${p.score >= 9 ? 'text-orange-400' : p.score >= 7 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {p.score}/10
                </p>
                <p className="text-xs text-zinc-500">{p.pricePerServing}/serving</p>
              </div>
            </div>
            <div className="mb-4 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="mb-1 text-xs font-semibold text-green-400">✓ Pros</p>
                <ul className="space-y-1">{p.pros.map(pro => <li key={pro} className="text-xs text-zinc-400">• {pro}</li>)}</ul>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold text-red-400">✗ Cons</p>
                <ul className="space-y-1">{p.cons.map(con => <li key={con} className="text-xs text-zinc-400">• {con}</li>)}</ul>
              </div>
            </div>
            <p className="mb-4 border-l-2 border-orange-500 pl-3 text-sm text-zinc-400">{p.verdict}</p>
            <a href={p.affiliateUrl} target="_blank" rel="nofollow noopener sponsored"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-400 transition-colors">
              Check Price →
            </a>
          </div>
        ))}
      </div>

      {/* Ingredient breakdown */}
      <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-6 text-xl font-extrabold text-white">Ingredient Guide: What Works</h2>
        <div className="space-y-4">
          {ingredients.map((ing) => (
            <div key={ing.name} className="border-b border-zinc-800 pb-4 last:border-0 last:pb-0">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <p className="font-bold text-white">{ing.name}</p>
                <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">Effective: {ing.effectiveDose}</span>
              </div>
              <p className="text-xs text-zinc-500 mb-1">{ing.whatItDoes}</p>
              <p className="text-xs text-zinc-400">{ing.verdict}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Usage guide */}
      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-4 text-xl font-extrabold text-white">How to Use Pre-Workout</h2>
        <div className="space-y-3 text-sm text-zinc-400">
          <p><strong className="text-white">Timing:</strong> Take 20–30 minutes before training. Caffeine peaks in blood at ~45 minutes.</p>
          <p><strong className="text-white">Tolerance:</strong> Cycle off caffeine for 1–2 weeks every 2–3 months. Your baseline sensitivity drops significantly without breaks.</p>
          <p><strong className="text-white">Beginners:</strong> Start with half a serving to assess tolerance. 200mg caffeine is a lot if you&apos;re not used to it.</p>
          <p><strong className="text-white">Evening training:</strong> Use a stim-free pre-workout if you train within 6 hours of bedtime. Caffeine&apos;s half-life is 5–6 hours.</p>
          <p><strong className="text-white">Food:</strong> Pre-workout on an empty stomach hits harder but may cause nausea. Have a small snack 30–60 minutes before if needed.</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
        <p className="text-xs text-zinc-500">
          <strong className="text-zinc-400">Affiliate disclosure:</strong> Some links are affiliate links. We earn a small commission at no extra cost to you.
        </p>
      </div>
    </main>
  )
}
