import type { Metadata } from 'next'
import Link from 'next/link'
import FaqSchema from '@/components/seo/FaqSchema'

export const metadata: Metadata = {
  title: 'Best Omega-3 Fish Oil for Athletes 2026 — Reviewed & Compared',
  description: 'Which fish oil supplement is actually worth buying? We compare EPA/DHA doses, purity, and price to find the best omega-3 for athletes.',
}

type Product = {
  name: string
  brand: string
  epa: string
  dha: string
  pricePerServing: string
  badge?: string | null
  pros: string[]
  cons: string[]
  verdict: string
  affiliateUrl: string
  score: number
}

const products: Product[] = [
  {
    name: 'Omega-3',
    brand: 'Bulk',
    epa: '660mg',
    dha: '440mg',
    pricePerServing: '€0.18',
    badge: '🏆 Best Overall',
    pros: [
      'High EPA+DHA per capsule (1100mg combined)',
      'Transparent third-party tested',
      'No fishy aftertaste',
      'Very low price per gram of omega-3',
    ],
    cons: [
      'Only available online',
      '3 capsules per serving for full dose',
    ],
    verdict: "Bulk's fish oil hits the clinical dose of omega-3 at the lowest price in Europe. Third-party tested for purity and heavy metals. The clear first choice.",
    affiliateUrl: 'https://www.bulk.com/uk/omega-3-fish-oil-softgels.html',
    score: 10,
  },
  {
    name: 'Omega-3 1000mg',
    brand: 'Myprotein',
    epa: '300mg',
    dha: '200mg',
    pricePerServing: '€0.08',
    badge: '💰 Best Budget',
    pros: [
      'Cheapest omega-3 per capsule in Europe',
      'Widely available',
      'Decent for maintenance dose',
    ],
    cons: [
      'Low EPA+DHA per capsule (500mg combined)',
      'Need 2-3 capsules for therapeutic dose',
      'Basic quality vs Bulk',
    ],
    verdict: "Fine for a basic maintenance dose if budget is tight. Take 2-3 capsules to reach a useful amount of EPA+DHA. Not ideal for serious athletes who want maximum benefit.",
    affiliateUrl: 'https://www.myprotein.com/sports-nutrition/omega-3/10530671.html',
    score: 7,
  },
  {
    name: 'Triple Strength Omega-3',
    brand: 'Prozis',
    epa: '900mg',
    dha: '600mg',
    pricePerServing: '€0.35',
    badge: '💊 Highest Dose',
    pros: [
      'Highest EPA+DHA per capsule (1500mg combined)',
      'One-capsule full therapeutic dose',
      'Good for people who hate taking multiple pills',
    ],
    cons: [
      'More expensive than Bulk',
      'Larger capsule size',
    ],
    verdict: "If you want maximum omega-3 in one capsule, this is the best option. Pricier than Bulk but convenient for those who struggle with multiple pills.",
    affiliateUrl: 'https://www.prozis.com/en/omega-3',
    score: 8,
  },
  {
    name: 'Vegan Omega-3 (Algae)',
    brand: 'Bulk',
    epa: '150mg',
    dha: '300mg',
    pricePerServing: '€0.45',
    badge: '🌱 Best Vegan',
    pros: [
      'Plant-based — from algae (where fish get omega-3)',
      'No fishy taste or burps',
      'Sustainable source',
      'Suitable for vegans and vegetarians',
    ],
    cons: [
      'Lower EPA than fish-based options',
      'More expensive per mg of omega-3',
    ],
    verdict: "The best option for vegans. Algae oil is the original source of omega-3 — fish just eat algae. Slightly less EPA than fish oil but completely plant-based and sustainable.",
    affiliateUrl: 'https://www.bulk.com/uk/vegan-omega-3.html',
    score: 8,
  },
]

const faqs = [
  {
    question: 'How much omega-3 should athletes take per day?',
    answer: 'Research supports 2-4g of combined EPA+DHA per day for athletes. The minimum effective dose for general health is 1g EPA+DHA. Most fish oil capsules contain 300-500mg combined, so you typically need 2-4 capsules to reach an effective dose.',
  },
  {
    question: 'What is the difference between EPA and DHA?',
    answer: 'EPA (eicosapentaenoic acid) is primarily anti-inflammatory — it reduces muscle soreness and supports cardiovascular health. DHA (docosahexaenoic acid) is critical for brain function and eye health. Both are important. Look for supplements with at least 500mg EPA and 300mg DHA per serving.',
  },
  {
    question: 'Does fish oil help with muscle recovery?',
    answer: "Yes. Studies show that 2-4g of EPA+DHA per day can reduce delayed-onset muscle soreness (DOMS), decrease inflammatory markers after exercise, and improve protein synthesis. It's one of the few supplements with solid research behind it.",
  },
  {
    question: 'When should I take fish oil?',
    answer: "Take fish oil with meals containing fat — this increases absorption significantly. There is no optimal time of day. Taking it with your largest meal is a simple rule to follow.",
  },
  {
    question: 'Can I take too much fish oil?',
    answer: "The European Food Safety Authority considers up to 5g of EPA+DHA per day safe. Very high doses (10g+) may impair immune function. For most athletes, 2-3g per day is the sweet spot — effective without excess.",
  },
]

export default function BestOmega3Page() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <FaqSchema faqs={faqs.map(f => ({ question: f.question, answer: f.answer }))} />

      <Link href="/supplements" className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors">
        ← All Comparisons
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          Best Omega-3 Fish Oil <span className="text-orange-400">for Athletes</span>
        </h1>
        <p className="mt-3 text-zinc-400">
          Most fish oil supplements are underdosed. We find the ones that actually hit the research-backed therapeutic dose.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-zinc-500">
          <span>📅 Updated April 2026</span>
          <span>🧪 4 products compared</span>
          <span>💶 Prices in EUR</span>
        </div>
      </div>

      {/* Science callout */}
      <div className="mb-8 rounded-2xl border border-blue-800 bg-blue-900/20 p-5">
        <p className="text-sm font-semibold text-blue-300">🔬 What the research says</p>
        <p className="mt-2 text-sm text-zinc-400">
          Effective dose: <strong className="text-white">2–4g combined EPA+DHA per day.</strong> Most supermarket fish oil capsules contain only 300mg EPA+DHA — you would need 7–13 capsules to hit the therapeutic dose. Always check the EPA and DHA content, not the total fish oil weight.
        </p>
      </div>

      {/* Comparison table */}
      <div className="mb-10 overflow-x-auto rounded-2xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">Product</th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400">EPA</th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400">DHA</th>
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
                <td className="px-4 py-3 text-center text-xs font-medium text-zinc-300">{p.epa}</td>
                <td className="px-4 py-3 text-center text-xs font-medium text-zinc-300">{p.dha}</td>
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
                    <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-xs font-bold text-orange-400">{p.badge}</span>
                  )}
                </div>
                <p className="text-sm text-zinc-500">{p.brand} · EPA {p.epa} · DHA {p.dha}</p>
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
        <h2 className="mb-6 text-xl font-extrabold text-white">Omega-3 FAQ</h2>
        <div className="space-y-5">
          {faqs.map((faq) => (
            <div key={faq.question} className="border-b border-zinc-800 pb-5 last:border-0 last:pb-0">
              <p className="mb-2 font-semibold text-white">{faq.question}</p>
              <p className="text-sm text-zinc-400">{faq.answer}</p>
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
