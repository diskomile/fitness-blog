import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Best Creatine Monohydrate 2026 — Comparison & Review',
  description: 'Creatine monohydrate vs HCl vs ethyl ester — what does the science say? We compare the best creatine supplements by price, purity, and evidence.',
}

type Product = {
  name: string
  brand: string
  type: string
  pricePerServing: string
  purity: string
  badge?: string | null
  pros: string[]
  cons: string[]
  verdict: string
  affiliateUrl: string
  score: number
}

const products: Product[] = [
  {
    name: 'Creatine Monohydrate',
    brand: 'Myprotein',
    type: 'Monohydrate',
    pricePerServing: '€0.20',
    purity: '99.9%',
    badge: '🏆 Best Value',
    pros: ['Cheapest creatine in Europe', 'Creapure® certified option available', 'Unflavoured — mixes with anything', 'Massive research backing'],
    cons: ['May cause minor bloating in some people', 'Takes 1–2 weeks to see effects'],
    verdict: 'The best creatine you can buy, period. Monohydrate is the most researched sports supplement in history. Myprotein\'s price is unbeatable — especially in bulk.',
    affiliateUrl: 'https://www.myprotein.com/sports-nutrition/creatine-monohydrate/10852501.html',
    score: 10,
  },
  {
    name: 'Essential Creatine Monohydrate',
    brand: 'Bulk',
    type: 'Monohydrate (Creapure®)',
    pricePerServing: '€0.35',
    purity: '99.99%',
    badge: '💎 Highest Purity',
    pros: ['Creapure® certified — highest purity available', 'Transparent sourcing', 'No fillers whatsoever', 'Micronised for better mixing'],
    cons: ['More expensive than Myprotein', 'Still just monohydrate — same effect'],
    verdict: 'If you want absolute purity and Creapure® certification (the gold standard for creatine), Bulk\'s version is excellent. Worth it for peace of mind.',
    affiliateUrl: 'https://www.bulk.com/uk/essential-creatine-monohydrate.html',
    score: 9,
  },
  {
    name: 'Creatine Monohydrate',
    brand: 'Prozis',
    type: 'Monohydrate',
    pricePerServing: '€0.25',
    purity: '99%',
    badge: null,
    pros: ['Good value', 'Widely available in southern Europe', 'Frequent discount codes'],
    cons: ['Not Creapure® certified', 'Less transparent sourcing'],
    verdict: 'Solid mid-range option. Wait for Prozis sales (20–30% off regularly) and you\'ll get excellent value.',
    affiliateUrl: 'https://www.prozis.com/en/creatine',
    score: 8,
  },
  {
    name: 'Creatine HCl',
    brand: 'Various',
    type: 'Hydrochloride',
    pricePerServing: '€0.80',
    purity: '—',
    badge: '⚠️ Overhyped',
    pros: ['Better solubility in water', 'Smaller dose needed (1–2g vs 5g)', 'Less water retention'],
    cons: ['3–4× more expensive than monohydrate', 'Far less research than monohydrate', 'No proven performance advantage over monohydrate'],
    verdict: 'Marketed aggressively but the science doesn\'t back the premium. A well-designed study showed no significant difference vs monohydrate. Save your money.',
    affiliateUrl: 'https://www.amazon.com/s?k=creatine+hcl&tag=ironpulse08-20',
    score: 6,
  },
  {
    name: 'Creatine Ethyl Ester',
    brand: 'Various',
    type: 'Ethyl Ester',
    pricePerServing: '€0.90',
    purity: '—',
    badge: '❌ Skip This',
    pros: ['Better absorption claimed by manufacturers'],
    cons: ['Research shows it\'s converted to creatinine (waste product) faster', 'Worse than monohydrate in head-to-head studies', 'Most expensive option', 'No proven benefits'],
    verdict: 'The science is clear: creatine ethyl ester is inferior to monohydrate. A 2009 study showed monohydrate outperformed it significantly. Avoid.',
    affiliateUrl: 'https://www.amazon.com/s?k=creatine+ethyl+ester&tag=ironpulse08-20',
    score: 4,
  },
]

export default function BestCreatinePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/supplements" className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors">
        ← All Comparisons
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          Best Creatine <span className="text-orange-400">2026</span>
        </h1>
        <p className="mt-3 text-zinc-400">
          Creatine is the most researched sports supplement in existence. Here&apos;s what the science actually says — and which form you should buy.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-zinc-500">
          <span>📅 Updated April 2026</span>
          <span>🧪 5 products compared</span>
          <span>💶 Prices in EUR</span>
        </div>
      </div>

      {/* Science callout */}
      <div className="mb-8 rounded-2xl border border-blue-800 bg-blue-900/20 p-5">
        <p className="text-sm font-semibold text-blue-300">🧬 What the science says</p>
        <p className="mt-2 text-sm text-zinc-400">
          Creatine monohydrate has 500+ peer-reviewed studies backing it. It increases phosphocreatine stores in muscles, improving power output by 5–15% and supporting lean mass gains. Every other form of creatine (HCl, ethyl ester, buffered) claims to be superior — none have proven it in independent research.
        </p>
      </div>

      {/* Comparison table */}
      <div className="mb-10 overflow-x-auto rounded-2xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">Product</th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400">Type</th>
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

      {/* Dosing guide */}
      <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-4 text-xl font-extrabold text-white">How to Take Creatine</h2>
        <div className="space-y-3 text-sm text-zinc-400">
          <p><strong className="text-white">Daily dose:</strong> 3–5g of creatine monohydrate per day. That&apos;s it. Timing doesn&apos;t matter — consistency does.</p>
          <p><strong className="text-white">Loading phase (optional):</strong> 20g/day for 5–7 days to saturate muscles faster. Then drop to 3–5g/day. You&apos;ll reach the same saturation either way — loading just gets you there in a week instead of 3–4 weeks.</p>
          <p><strong className="text-white">With or without food:</strong> Either works. Taking it post-workout with carbs and protein may improve uptake slightly — but the effect is minor.</p>
          <p><strong className="text-white">Water intake:</strong> Drink an extra 500ml–1L of water daily when on creatine. It draws water into muscle cells.</p>
          <p><strong className="text-white">Do you need to cycle off?</strong> No. Long-term creatine use (years) has shown no adverse effects in healthy individuals.</p>
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
