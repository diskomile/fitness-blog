import type { Metadata } from 'next'
import Link from 'next/link'
import FaqSchema from '@/components/seo/FaqSchema'

export const metadata: Metadata = {
  title: 'Best Multivitamin for Athletes 2026 — What You Actually Need',
  description: 'Do athletes need a multivitamin? We compare the top options, break down key nutrients, and explain what actually matters.',
}

type Product = {
  name: string
  brand: string
  servingsPerDay: string
  pricePerMonth: string
  badge?: string | null
  keyNutrients: string[]
  pros: string[]
  cons: string[]
  verdict: string
  affiliateUrl: string
  score: number
}

const products: Product[] = [
  {
    name: 'Complete Multivitamin Complex',
    brand: 'Bulk',
    servingsPerDay: '1 tablet',
    pricePerMonth: '€8',
    badge: '🏆 Best Overall',
    keyNutrients: ['Vitamin D3 1000IU', 'Vitamin K2', 'Magnesium 150mg', 'Zinc 10mg', 'B12 (methylcobalamin)'],
    pros: [
      'Uses bioavailable forms (D3 not D2, methylcobalamin not cyanocobalamin)',
      'Includes Vitamin K2 alongside D3 (important for bone health)',
      'Magnesium at a useful dose',
      'Transparent — full label available',
      'Very affordable',
    ],
    cons: [
      'Iron-free version also available — make sure you get the right one',
      'Some nutrients still below optimal dose (fine for maintenance)',
    ],
    verdict: "Bulk uses the right forms of each vitamin — the detail that separates a good multi from a waste of money. D3 + K2 together, methylcobalamin B12, real zinc. Excellent value.",
    affiliateUrl: 'https://www.bulk.com/uk/complete-multivitamin-complex.html',
    score: 9,
  },
  {
    name: 'Daily Vitamins',
    brand: 'Myprotein',
    servingsPerDay: '1 tablet',
    pricePerMonth: '€5',
    badge: '💰 Cheapest Option',
    keyNutrients: ['Vitamin D 400IU', 'Vitamin C 80mg', 'Zinc 10mg', 'B-complex'],
    pros: [
      'Cheapest multivitamin in Europe',
      'Good for basic micronutrient coverage',
      'Convenient one-tablet dose',
    ],
    cons: [
      'Vitamin D only 400IU — far too low for most people',
      'No Vitamin K2',
      'Uses cheaper vitamin forms (cyanocobalamin B12)',
      'More of a "base coverage" than an athlete-focused formula',
    ],
    verdict: "Fine if budget is the only concern, but the 400IU of Vitamin D is ineffective for most people (deficiency is widespread across Europe). If you buy this, add a separate Vitamin D3 supplement.",
    affiliateUrl: 'https://www.myprotein.com/sports-nutrition/daily-vitamins/10530904.html',
    score: 6,
  },
  {
    name: 'Sport Multi AM/PM',
    brand: 'Bulk',
    servingsPerDay: '4 tablets (2 AM, 2 PM)',
    pricePerMonth: '€18',
    badge: '🎯 Best for Serious Athletes',
    keyNutrients: ['Vitamin D3 2000IU', 'Magnesium 300mg', 'Zinc 20mg', 'Iron 14mg', 'CoQ10', 'Lutein'],
    pros: [
      'Higher doses across all key nutrients',
      'Split AM/PM formula for better absorption',
      'Includes CoQ10 for energy production',
      'Magnesium at therapeutic dose (300mg)',
      'Good Vitamin D dose',
    ],
    cons: [
      'More expensive',
      '4 tablets per day is inconvenient',
      'Contains iron — not suitable for everyone',
    ],
    verdict: "The best option for athletes with high training volume who need more than basic coverage. Higher doses, better absorption, and includes nutrients often left out of budget formulas. Worth it if you train 4+ days per week.",
    affiliateUrl: 'https://www.bulk.com/uk/sport-multi-am-pm.html',
    score: 9,
  },
  {
    name: 'Multivitamin',
    brand: 'Prozis',
    servingsPerDay: '1 tablet',
    pricePerMonth: '€7',
    badge: null,
    keyNutrients: ['Vitamin D3 600IU', 'Vitamin C 80mg', 'Zinc 10mg', 'B-complex'],
    pros: [
      'Good price, especially with Prozis discount codes',
      'Decent base formula',
      'Available across southern Europe',
    ],
    cons: [
      'Vitamin D still too low at 600IU',
      'No K2',
      'Not as comprehensive as Bulk formulas',
    ],
    verdict: "A solid budget option for southern European users who can use Prozis discount codes. Better than Myprotein in terms of D3 dose, but still falls short of Bulk for serious athletes.",
    affiliateUrl: 'https://www.prozis.com/en/multivitamin',
    score: 7,
  },
]

const faqs = [
  {
    question: 'Do athletes actually need a multivitamin?',
    answer: "It depends. Athletes who eat a varied, whole-food diet with plenty of vegetables, protein, and calories often do not need one. However, Vitamin D deficiency affects 40-50% of Europeans regardless of diet, and magnesium is commonly depleted by intense exercise. A basic multi plus standalone Vitamin D3 is a reasonable insurance policy.",
  },
  {
    question: 'What nutrients are most important for athletes?',
    answer: 'Vitamin D3 (1000-3000IU), Magnesium (300-400mg), Zinc (10-20mg), Vitamin K2 (100mcg), and B12 are the nutrients most commonly deficient in athletes. Iron matters for endurance athletes and menstruating women. Most other vitamins and minerals are adequately covered by a normal diet.',
  },
  {
    question: 'What is the difference between Vitamin D2 and D3?',
    answer: 'D3 (cholecalciferol) is 3-4x more effective at raising blood levels of Vitamin D than D2 (ergocalciferol). Always choose D3. Similarly, B12 as methylcobalamin is better absorbed than cyanocobalamin — check the label for the forms used.',
  },
  {
    question: 'When should I take a multivitamin?',
    answer: 'Take fat-soluble vitamins (A, D, E, K) with a meal containing fat for best absorption. Most multivitamins are best taken with your largest meal of the day. If the formula splits into AM/PM doses, follow the label instructions.',
  },
  {
    question: 'Can I take a multivitamin and protein powder at the same time?',
    answer: 'Yes. There is no interaction between a standard multivitamin and protein powder. Take them together with a meal if you prefer — it is simply more convenient.',
  },
]

export default function BestMultivitaminPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <FaqSchema faqs={faqs.map(f => ({ question: f.question, answer: f.answer }))} />

      <Link href="/supplements" className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors">
        ← All Comparisons
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          Best Multivitamin <span className="text-orange-400">for Athletes</span>
        </h1>
        <p className="mt-3 text-zinc-400">
          Most multivitamins use cheap, poorly absorbed forms of vitamins. We break down what actually matters and which products deliver it.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-zinc-500">
          <span>📅 Updated April 2026</span>
          <span>🧪 4 products compared</span>
          <span>💶 Prices in EUR</span>
        </div>
      </div>

      {/* Key info callout */}
      <div className="mb-8 rounded-2xl border border-orange-800 bg-orange-900/20 p-5">
        <p className="text-sm font-semibold text-orange-300">⚡ The form matters more than the dose</p>
        <p className="mt-2 text-sm text-zinc-400">
          Vitamin D3 absorbs 3-4x better than D2. Methylcobalamin B12 is better retained than cyanocobalamin. Magnesium glycinate/malate absorbs better than oxide. A cheap multi with the wrong forms is largely wasted money — check the label before you buy.
        </p>
      </div>

      {/* Comparison table */}
      <div className="mb-10 overflow-x-auto rounded-2xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">Product</th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400">Serving</th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400">Price/Month</th>
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
                <td className="px-4 py-3 text-center text-xs text-zinc-400">{p.servingsPerDay}</td>
                <td className="px-4 py-3 text-center font-bold text-white">{p.pricePerMonth}</td>
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
                <p className="text-sm text-zinc-500">{p.brand} · {p.servingsPerDay} · {p.pricePerMonth}/month</p>
              </div>
              <p className={`text-2xl font-extrabold shrink-0 ${p.score >= 9 ? 'text-orange-400' : p.score >= 7 ? 'text-yellow-400' : 'text-red-400'}`}>
                {p.score}/10
              </p>
            </div>

            <div className="mb-3">
              <p className="mb-1.5 text-xs font-semibold text-zinc-500">KEY NUTRIENTS</p>
              <div className="flex flex-wrap gap-1.5">
                {p.keyNutrients.map(n => (
                  <span key={n} className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-400">{n}</span>
                ))}
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
        <h2 className="mb-6 text-xl font-extrabold text-white">Multivitamin FAQ</h2>
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
