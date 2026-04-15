import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Best Gym Gear & Equipment Reviews 2026',
  description: 'Honest gym gear reviews and comparisons. Find the best gym shoes, bags, water bottles, resistance bands, and more — with UK prices and Amazon links.',
}

const comparisons = [
  {
    href: '/gear/best-gym-shoes',
    title: 'Best Gym Shoes 2026',
    description: 'From lifting shoes with raised heels to cross-trainers. We compare 5 options for every training style and budget.',
    icon: '👟',
    badge: 'New',
  },
  {
    href: '/gear/best-gym-bag',
    title: 'Best Gym Bags 2026',
    description: 'From a £30 Nike duffel to a lifetime-warranty Osprey. Find the right size and features for your kit load.',
    icon: '🎒',
    badge: 'New',
  },
  {
    href: '/gear/best-water-bottle',
    title: 'Best Gym Water Bottles 2026',
    description: 'Insulated vs plastic, 1L vs 2L — we compare the best water bottles for training across all budgets.',
    icon: '💧',
    badge: 'New',
  },
]

const comingSoon = [
  { title: 'Best Resistance Bands', icon: '💪' },
  { title: 'Best Foam Rollers', icon: '🔵' },
  { title: 'Best Lifting Belts', icon: '🏋️' },
  { title: 'Best Wrist Wraps & Straps', icon: '🤝' },
  { title: 'Best Fitness Trackers', icon: '⌚' },
  { title: 'Best Home Gym Equipment', icon: '🏠' },
]

export default function GearPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          Gym Gear <span className="text-orange-400">Reviews</span>
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Honest comparisons with UK prices. Every guide covers multiple options across budgets — no sponsored picks, no filler.
        </p>
      </div>

      <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {comparisons.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group relative flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-orange-500/50 hover:bg-zinc-800"
          >
            {c.badge && (
              <span className="absolute right-4 top-4 rounded-full bg-green-600 px-2 py-0.5 text-xs font-semibold text-white">
                {c.badge}
              </span>
            )}
            <span className="mb-3 text-4xl">{c.icon}</span>
            <h2 className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-orange-400">
              {c.title}
            </h2>
            <p className="flex-1 text-sm text-zinc-400">{c.description}</p>
            <span className="mt-4 text-sm font-semibold text-orange-400 opacity-0 transition-opacity group-hover:opacity-100">
              Read comparison →
            </span>
          </Link>
        ))}
      </div>

      {/* Coming soon */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="mb-4 text-lg font-bold text-white">Coming Soon</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {comingSoon.map((c) => (
            <div key={c.title} className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
              <span className="text-xl">{c.icon}</span>
              <span className="text-sm text-zinc-400">{c.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
        <p className="text-xs text-zinc-500">
          <strong className="text-zinc-400">Affiliate disclosure:</strong> Some links on this page are affiliate links. If you purchase through them, we earn a small commission at no extra cost to you. This never influences our recommendations.
        </p>
      </div>
    </main>
  )
}
