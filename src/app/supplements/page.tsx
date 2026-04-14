import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Supplement Comparisons & Reviews 2026',
  description: 'Honest, evidence-based supplement comparisons. Find the best protein powder, creatine, pre-workout, omega-3, and more — with price-per-serving analysis.',
}

const comparisons = [
  {
    href: '/supplements/best-whey-protein',
    title: 'Best Whey Protein 2026',
    description: 'We compare 6 top whey proteins by price per serving, protein %, ingredients, and taste.',
    icon: '🥛',
    badge: 'Most Popular',
  },
  {
    href: '/supplements/best-creatine',
    title: 'Best Creatine Monohydrate',
    description: 'Creatine monohydrate vs HCl vs ethyl ester — what does the science actually say?',
    icon: '⚡',
    badge: null,
  },
  {
    href: '/supplements/best-pre-workout',
    title: 'Best Pre-Workout Supplements',
    description: 'Side-by-side comparison of stimulant and stim-free pre-workouts with full ingredient breakdown.',
    icon: '🔥',
    badge: null,
  },
  {
    href: '/supplements/best-protein-for-beginners',
    title: 'Best Protein Powder for Beginners',
    description: 'Not sure where to start? We break down the simplest, most effective options under €30.',
    icon: '🌱',
    badge: null,
  },
  {
    href: '/supplements/best-omega-3-fish-oil',
    title: 'Best Omega-3 Fish Oil for Athletes',
    description: 'Most fish oil is underdosed. We find options that actually hit the therapeutic EPA+DHA dose.',
    icon: '🐟',
    badge: 'New',
  },
  {
    href: '/supplements/best-multivitamin',
    title: 'Best Multivitamin for Athletes',
    description: 'The form of each vitamin matters more than the dose. Here is what to actually look for.',
    icon: '💊',
    badge: null,
  },
  {
    href: '/supplements/best-zma-magnesium',
    title: 'Best ZMA & Magnesium Supplements',
    description: 'Magnesium oxide absorbs at 4%. We compare bisglycinate and glycinate products that actually replenish what training depletes.',
    icon: '🌙',
    badge: 'New',
  },
  {
    href: '/supplements/best-fat-burner',
    title: 'Best Fat Burner Supplements',
    description: 'Honest reviews of fat burners that use evidence-backed ingredients at safe doses — no DNP, no ephedrine, no hype.',
    icon: '🔥',
    badge: 'New',
  },
]

export default function SupplementsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          Supplement <span className="text-orange-400">Comparisons</span>
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Honest, evidence-based reviews. Every comparison includes price-per-serving analysis, ingredient breakdowns, and clear winners — no sponsored bias.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {comparisons.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group relative flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-orange-500/50 hover:bg-zinc-800"
          >
            {c.badge && (
              <span className={`absolute right-4 top-4 rounded-full px-2 py-0.5 text-xs font-semibold ${c.badge === 'New' ? 'bg-green-600 text-white' : 'bg-orange-500 text-white'}`}>
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

      <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
        <p className="text-xs text-zinc-500">
          <strong className="text-zinc-400">Affiliate disclosure:</strong> Some links on this page are affiliate links. If you purchase through them, we earn a small commission at no extra cost to you. This never influences our recommendations.
        </p>
      </div>
    </main>
  )
}
