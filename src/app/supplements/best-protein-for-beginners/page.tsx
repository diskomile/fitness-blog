import type { Metadata } from 'next'
import Link from 'next/link'
import FaqSchema from '@/components/seo/FaqSchema'

export const metadata: Metadata = {
  title: 'Best Protein Powder for Beginners 2026 — Simple Options Under €30',
  description: 'Not sure where to start with protein powder? We break down the simplest, most effective options for beginners under €30.',
}

type Product = {
  name: string
  brand: string
  type: string
  pricePerServing: string
  proteinPer100g: string
  badge?: string | null
  pros: string[]
  cons: string[]
  verdict: string
  affiliateUrl: string
  score: number
}

const products: Product[] = [
  {
    name: 'Impact Whey Protein',
    brand: 'Myprotein',
    type: 'Whey Concentrate',
    pricePerServing: '€0.55',
    proteinPer100g: '82g',
    badge: '🏆 Best for Beginners',
    pros: [
      'Lowest price per serving in Europe',
      'Easy to find — huge stock always available',
      '30+ flavours — easy to find one you like',
      '82% protein by weight — very good for concentrate',
      'Mixes easily in water or milk',
    ],
    cons: [
      'Not suitable for lactose intolerance',
      'Some flavours are hit or miss',
    ],
    verdict: "The perfect starter protein. Cheap, widely available, tastes decent in most flavours, and delivers solid macros. If you are new to protein powder and unsure where to start, buy a 1kg bag of this in chocolate or vanilla first.",
    affiliateUrl: 'https://www.myprotein.com/sports-nutrition/impact-whey-protein/10530943.html',
    score: 10,
  },
  {
    name: 'Pure Whey Protein',
    brand: 'Bulk',
    type: 'Whey Concentrate',
    pricePerServing: '€0.75',
    proteinPer100g: '80g',
    badge: '💎 Best Quality',
    pros: [
      'Fully transparent ingredient labelling',
      'No artificial sweeteners option available',
      'Creapure creatine option to add',
      'Excellent mixability',
    ],
    cons: [
      'More expensive than Myprotein',
      'Fewer flavour options',
    ],
    verdict: "Bulk is the cleanest beginner option. If you care about ingredient transparency and want a no-nonsense formula, this is worth the extra cost over Myprotein.",
    affiliateUrl: 'https://www.bulk.com/uk/pure-whey-protein.html',
    score: 9,
  },
  {
    name: 'Whey Protein',
    brand: 'Prozis',
    type: 'Whey Concentrate',
    pricePerServing: '€0.65',
    proteinPer100g: '79g',
    badge: null,
    pros: [
      'Good value — especially with discount codes',
      'Wide availability across southern Europe',
      'Multiple sizes (500g trial bags available)',
    ],
    cons: [
      'Not Creapure certified',
      'Less transparent than Bulk',
    ],
    verdict: "A solid mid-range option, especially if you are in Portugal or Spain where Prozis ships fast. Buy during their regular sales for the best value.",
    affiliateUrl: 'https://www.prozis.com/en/protein',
    score: 8,
  },
  {
    name: 'Plant Protein',
    brand: 'Myprotein',
    type: 'Plant-Based (Pea + Rice)',
    pricePerServing: '€0.80',
    proteinPer100g: '74g',
    badge: '🌱 Best Dairy-Free',
    pros: [
      'Lactose-free — suitable for dairy intolerance',
      'Vegan-friendly',
      'Pea + rice blend for complete amino acid profile',
      'Good for those with whey sensitivity',
    ],
    cons: [
      'Lower protein % than whey',
      'Grainier texture than whey',
      'Slightly more expensive',
    ],
    verdict: "If you cannot use whey (dairy intolerance, vegan diet), this is the best plant-based option at this price. The pea + rice blend provides all essential amino acids — a complete protein.",
    affiliateUrl: 'https://www.myprotein.com/sports-nutrition/vegan-protein-blend/12580143.html',
    score: 8,
  },
]

const faqs = [
  {
    q: 'Do I even need protein powder?',
    a: 'No. Whole food protein (chicken, eggs, fish, dairy, legumes) is nutritionally superior to powder. Protein powder is a convenient supplement — useful when you cannot hit your daily protein target from food alone. Most beginners do not need it at all for the first few months.',
  },
  {
    q: 'How much protein do I actually need?',
    a: 'Research consistently shows 1.6–2.2g of protein per kg of bodyweight per day is the effective range for muscle building. A 75kg person needs ~120–165g/day. If you can get that from food, you do not need powder.',
  },
  {
    q: 'When should I drink a protein shake?',
    a: 'Timing matters less than total daily protein. The classic "30-minute post-workout window" is largely overstated. Drink it whenever it is convenient — morning, post-workout, or before bed. Consistency beats timing.',
  },
  {
    q: 'Whey or plant protein — which is better?',
    a: 'Whey has a slightly better amino acid profile and absorbs faster. However, studies show that plant protein produces equivalent muscle gains when consumed in adequate amounts. Choose whey if you tolerate dairy, plant-based if you do not.',
  },
  {
    q: 'Should I buy isolate or concentrate as a beginner?',
    a: 'Concentrate. Isolate is filtered further (90%+ protein, less fat/lactose) but costs 30-50% more. For beginners, the difference in results is zero. Save the money. Upgrade to isolate later if you want to cut calories or you notice bloating from concentrate.',
  },
  {
    q: 'What size bag should I buy first?',
    a: 'Start with 1kg or 2.5kg. Do not commit to a 5kg bag of a flavour you have never tried. Buy small, find a flavour you like, then buy in bulk.',
  },
]

export default function BestProteinForBeginnersPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <FaqSchema faqs={faqs.map(f => ({ question: f.q, answer: f.a }))} />
      <Link href="/supplements" className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors">
        ← All Comparisons
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          Best Protein for <span className="text-orange-400">Beginners</span>
        </h1>
        <p className="mt-3 text-zinc-400">
          No jargon, no confusion. Here are the simplest, most effective protein powders under €30 — and what you actually need to know.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-zinc-500">
          <span>📅 Updated April 2026</span>
          <span>🧪 4 products compared</span>
          <span>💶 Prices in EUR</span>
        </div>
      </div>

      {/* Beginner callout */}
      <div className="mb-8 rounded-2xl border border-green-800 bg-green-900/20 p-5">
        <p className="text-sm font-semibold text-green-300">🌱 New to protein powder? Read this first</p>
        <p className="mt-2 text-sm text-zinc-400">
          Protein powder is <strong className="text-white">just food</strong>. It is convenient, not magic. You do not need a fancy formula with 20 ingredients.
          For beginners, a simple whey concentrate from a reputable brand is all you need. Everything on this page is under €30 for a 1kg bag.
        </p>
      </div>

      {/* Comparison table */}
      <div className="mb-10 overflow-x-auto rounded-2xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">Product</th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400">Type</th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400">Protein/100g</th>
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
                <td className="px-4 py-3 text-center text-xs font-medium text-zinc-300">{p.proteinPer100g}</td>
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
                <p className="text-sm text-zinc-500">{p.brand} · {p.type}</p>
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

      {/* FAQ */}
      <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-6 text-xl font-extrabold text-white">Beginner FAQ</h2>
        <div className="space-y-5">
          {faqs.map((faq) => (
            <div key={faq.q} className="border-b border-zinc-800 pb-5 last:border-0 last:pb-0">
              <p className="mb-2 font-semibold text-white">{faq.q}</p>
              <p className="text-sm text-zinc-400">{faq.a}</p>
            </div>
          ))}
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
