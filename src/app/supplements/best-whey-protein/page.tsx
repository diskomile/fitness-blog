import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Best Whey Protein 2026 — Comparison & Review',
  description: 'We compare the 6 best whey protein powders by price per serving, protein %, taste, and ingredients. Find the best value whey for your goals.',
}

type Product = {
  name: string
  brand: string
  pricePerServing: string
  proteinPct: string
  servingSize: string
  flavours: string
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
    pricePerServing: '€0.55',
    proteinPct: '80%',
    servingSize: '25g',
    flavours: '50+',
    badge: '🏆 Best Value',
    pros: ['Cheapest per serving in Europe', '80%+ protein per serving', '50+ flavours', 'Mixes well'],
    cons: ['Some flavours are hit or miss', 'Contains sucralose'],
    verdict: 'The go-to choice for most lifters. Unbeatable price-to-quality ratio, especially when bought in bulk during sales (30–40% off regularly).',
    affiliateUrl: 'https://www.myprotein.com/sports-nutrition/impact-whey-protein/10530943.html',
    score: 9,
  },
  {
    name: 'Complete Whey Protein',
    brand: 'Bulk',
    pricePerServing: '€0.65',
    proteinPct: '82%',
    servingSize: '30g',
    flavours: '20+',
    badge: '💪 Best Quality',
    pros: ['Highest protein % on the list', 'Clean ingredients', 'Great texture', 'Transparent labelling'],
    cons: ['Fewer flavours than Myprotein', 'Slightly more expensive'],
    verdict: 'Best ingredient quality at this price point. Bulk is transparent about sourcing and avoids unnecessary fillers. Worth the small premium.',
    affiliateUrl: 'https://www.bulk.com/uk/protein/whey-protein/',
    score: 9,
  },
  {
    name: 'Whey Protein 80',
    brand: 'Prozis',
    pricePerServing: '€0.60',
    proteinPct: '79%',
    servingSize: '25g',
    flavours: '30+',
    badge: null,
    pros: ['Strong in southern Europe', 'Frequent discount codes', 'Good taste profile'],
    cons: ['Slightly lower protein % than competitors', 'Shipping slower to some countries'],
    verdict: 'Solid mid-range option. Prozis runs aggressive promotions — wait for a sale and you\'ll get excellent value, especially in Spain, Portugal, and Italy.',
    affiliateUrl: 'https://www.amazon.co.uk/s?k=prozis+whey+protein+80&tag=ironpulse02-21',
    score: 8,
  },
  {
    name: 'Gold Standard 100% Whey',
    brand: 'Optimum Nutrition',
    pricePerServing: '€1.40',
    proteinPct: '79%',
    servingSize: '30.4g',
    flavours: '20+',
    badge: '⭐ Most Trusted',
    pros: ['Industry gold standard for 20+ years', 'Incredible mixability', 'Third-party tested', 'Available everywhere'],
    cons: ['Most expensive on the list', 'Same protein % as cheaper options'],
    verdict: 'The most trusted whey in the world. You\'re paying a premium for the brand and consistency. Great if you want zero risk — but objectively not the best value.',
    affiliateUrl: 'https://www.amazon.co.uk/s?k=optimum+nutrition+gold+standard+whey&tag=ironpulse02-21',
    score: 8,
  },
  {
    name: 'Whey Protein Concentrate',
    brand: 'iHerb / Now Sports',
    pricePerServing: '€0.75',
    proteinPct: '75%',
    servingSize: '33g',
    flavours: '5',
    badge: null,
    pros: ['Ships globally', 'Unflavoured option great for cooking', 'No artificial sweeteners'],
    cons: ['Lowest protein % per serving', 'Very limited flavours', 'Short cookie window for affiliate'],
    verdict: 'Good option if you want unflavoured whey or live outside standard European shipping zones. Not the best protein % but clean ingredients.',
    affiliateUrl: 'https://www.amazon.co.uk/s?k=now+sports+whey+protein+concentrate&tag=ironpulse02-21',
    score: 7,
  },
  {
    name: 'Whey Protein Professional',
    brand: 'Scitec Nutrition',
    pricePerServing: '€0.70',
    proteinPct: '78%',
    servingSize: '30g',
    flavours: '25+',
    badge: null,
    pros: ['Popular in Eastern Europe', 'Wide flavour range', 'Good availability'],
    cons: ['Proprietary blend concerns', 'Inconsistent quality across batches'],
    verdict: 'A popular choice in Eastern European markets. Decent option but lacks the transparency of Bulk or the value of Myprotein.',
    affiliateUrl: 'https://www.amazon.co.uk/s?k=scitec+nutrition+whey+protein&tag=ironpulse02-21',
    score: 7,
  },
]

export default function BestWheyProteinPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/supplements" className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors">
        ← All Comparisons
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          Best Whey Protein <span className="text-orange-400">2026</span>
        </h1>
        <p className="mt-3 text-zinc-400">
          We tested and compared 6 of the most popular whey proteins available in Europe. Every product was evaluated on protein percentage, price per serving, ingredient quality, and taste.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-zinc-500">
          <span>📅 Updated April 2026</span>
          <span>🧪 6 products compared</span>
          <span>💶 Prices in EUR</span>
        </div>
      </div>

      {/* Quick comparison table */}
      <div className="mb-10 overflow-x-auto rounded-2xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">Product</th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400">Price/Serving</th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400">Protein %</th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400">Score</th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 bg-zinc-950">
            {products.map((p) => (
              <tr key={p.name} className={p.badge?.includes('Best') ? 'bg-orange-500/5' : ''}>
                <td className="px-4 py-3">
                  <p className="font-semibold text-white">{p.name}</p>
                  <p className="text-xs text-zinc-500">{p.brand}</p>
                </td>
                <td className="px-4 py-3 text-center font-bold text-white">{p.pricePerServing}</td>
                <td className="px-4 py-3 text-center text-zinc-300">{p.proteinPct}</td>
                <td className="px-4 py-3 text-center">
                  <span className="font-bold text-orange-400">{p.score}/10</span>
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
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-zinc-500">#{i + 1}</span>
                  <h3 className="text-lg font-extrabold text-white">{p.name}</h3>
                  {p.badge && (
                    <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-xs font-bold text-orange-400">
                      {p.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-500">{p.brand}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-extrabold text-orange-400">{p.score}/10</p>
                <p className="text-xs text-zinc-500">{p.pricePerServing}/serving</p>
              </div>
            </div>

            <div className="mb-4 grid grid-cols-3 gap-3 text-center text-xs">
              <div className="rounded-lg bg-zinc-800 px-2 py-2">
                <p className="text-zinc-500">Protein</p>
                <p className="font-bold text-white">{p.proteinPct}</p>
              </div>
              <div className="rounded-lg bg-zinc-800 px-2 py-2">
                <p className="text-zinc-500">Serving</p>
                <p className="font-bold text-white">{p.servingSize}</p>
              </div>
              <div className="rounded-lg bg-zinc-800 px-2 py-2">
                <p className="text-zinc-500">Flavours</p>
                <p className="font-bold text-white">{p.flavours}</p>
              </div>
            </div>

            <div className="mb-4 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="mb-1 text-xs font-semibold text-green-400">✓ Pros</p>
                <ul className="space-y-1">
                  {p.pros.map((pro) => (
                    <li key={pro} className="text-xs text-zinc-400">• {pro}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold text-red-400">✗ Cons</p>
                <ul className="space-y-1">
                  {p.cons.map((con) => (
                    <li key={con} className="text-xs text-zinc-400">• {con}</li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mb-4 text-sm text-zinc-400 border-l-2 border-orange-500 pl-3">{p.verdict}</p>

            <a href={p.affiliateUrl} target="_blank" rel="nofollow noopener sponsored"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-400 transition-colors">
              Check Price →
            </a>
          </div>
        ))}
      </div>

      {/* Buying guide */}
      <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-4 text-xl font-extrabold text-white">How to Choose Whey Protein</h2>
        <div className="space-y-3 text-sm text-zinc-400">
          <p><strong className="text-white">Protein % per serving:</strong> Look for 75%+ protein by weight. Anything lower usually has more fillers, sugars, or fat padding out the serving size.</p>
          <p><strong className="text-white">Concentrate vs Isolate:</strong> Concentrate (WPC) is cheaper and contains slightly more fat/lactose. Isolate (WPI) is purer (90%+ protein) and better for lactose intolerance — but 30–50% more expensive. For most people, WPC is fine.</p>
          <p><strong className="text-white">Price per serving not price per kg:</strong> Always compare cost-per-30g serving, not the headline kilo price. Serving sizes vary wildly (25g to 40g).</p>
          <p><strong className="text-white">Third-party testing:</strong> If you compete in tested sports, look for Informed Sport or NSF Certified badges. For recreational lifters, it&apos;s less critical.</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
        <p className="text-xs text-zinc-500">
          <strong className="text-zinc-400">Affiliate disclosure:</strong> Some links on this page are affiliate links. We earn a small commission if you purchase through them, at no extra cost to you. This never influences our recommendations.
        </p>
      </div>
    </main>
  )
}
