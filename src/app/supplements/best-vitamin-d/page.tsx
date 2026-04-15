import type { Metadata } from 'next'
import Link from 'next/link'
import FaqSchema from '@/components/seo/FaqSchema'

export const metadata: Metadata = {
  title: 'Best Vitamin D Supplements 2026 — D3 vs D2, Dosage & Reviews',
  description: 'Most people in the UK are vitamin D deficient. We compare the best vitamin D3 supplements by dose, form, and price per serving.',
}

type Product = {
  name: string
  brand: string
  dose: string
  form: string
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
    name: 'Vitamin D3 4000 IU',
    brand: 'Bulk',
    dose: '4000 IU',
    form: 'D3 (Cholecalciferol)',
    pricePerServing: '£0.04',
    badge: '🏆 Best Value',
    pros: ['4000 IU — clinically relevant dose', 'D3 form (superior to D2)', 'Extremely affordable', 'Softgel for better absorption with fat', 'Transparent labelling'],
    cons: ['No K2 included', 'Plain capsule — no additional cofactors'],
    verdict: 'The best value vitamin D3 on the market. 4000 IU D3 in a softgel is exactly what most adults in the UK need, especially in winter. Nothing unnecessary, nothing missing.',
    affiliateUrl: 'https://www.amazon.co.uk/s?k=bulk+vitamin+d3+4000iu+softgels&tag=ironpulse02-21',
    score: 10,
  },
  {
    name: 'Vitamin D3 + K2',
    brand: 'Myprotein',
    dose: '2500 IU D3 + 50mcg K2',
    form: 'D3 + MK-7 K2',
    pricePerServing: '£0.10',
    badge: '💎 Best Combined',
    pros: ['Includes K2 (MK-7) for calcium regulation', 'D3 + K2 synergy is well-researched', 'Good dose of both vitamins', 'Easy one-capsule solution'],
    cons: ['More expensive than plain D3', 'Lower D3 dose (2500 IU vs 4000 IU)'],
    verdict: 'If you want D3 and K2 together, this is the best value option. K2 helps direct calcium to bones rather than arteries — a useful addition for athletes over 30.',
    affiliateUrl: 'https://www.amazon.co.uk/s?k=myprotein+vitamin+d3+k2+tablets&tag=ironpulse02-21',
    score: 9,
  },
  {
    name: 'Vitamin D3 2000 IU',
    brand: 'NOW Foods',
    dose: '2000 IU',
    form: 'D3 (Cholecalciferol)',
    pricePerServing: '£0.06',
    badge: null,
    pros: ['Reputable brand with third-party testing', 'GMP certified facility', 'Softgel for good absorption', 'Widely available in UK'],
    cons: ['2000 IU may be insufficient for deficient adults', 'No K2 included'],
    verdict: 'A solid, trustworthy D3 from a well-respected brand. The 2000 IU dose is the minimum effective dose — fine for maintenance but consider 4000 IU if you\'re deficient.',
    affiliateUrl: 'https://www.amazon.co.uk/dp/B0019LRY2A?tag=ironpulse02-21',
    score: 8,
  },
  {
    name: 'Ultra Vitamin D',
    brand: 'Solgar',
    dose: '2200 IU',
    form: 'D3 (Cholecalciferol)',
    pricePerServing: '£0.18',
    badge: '🌿 Premium Pick',
    pros: ['Premium brand, 60+ years of quality', 'Third-party tested', 'Non-GMO, gluten-free', 'Trusted by healthcare professionals'],
    cons: ['Most expensive on this list', 'No K2', 'Dose could be higher for deficiency correction'],
    verdict: 'Solgar\'s quality is unquestionable. If you prioritise a brand trusted by doctors and prefer premium supplements, this is a reliable choice — though you pay a premium.',
    affiliateUrl: 'https://www.amazon.co.uk/s?k=solgar+vitamin+d3+2200iu&tag=ironpulse02-21',
    score: 7,
  },
]

const faqs = [
  { question: 'How much vitamin D do I need?', answer: 'The NHS recommends 400 IU daily as a minimum. Most vitamin D researchers suggest 2000–4000 IU daily for adults, especially in the UK where sunlight exposure is insufficient for 6+ months of the year. Get your levels tested to know your specific needs.' },
  { question: 'Should I take D3 or D2?', answer: 'Always D3 (cholecalciferol). D3 raises blood levels of 25(OH)D approximately twice as effectively as D2, and the effects last longer. There is no reason to choose D2 unless you are strictly vegan (D2 is plant-derived).' },
  { question: 'Do I need vitamin K2 with vitamin D?', answer: 'It is not essential but beneficial. Vitamin K2 helps activate proteins that direct calcium to bones and teeth rather than soft tissues. If you take high-dose D3 long-term, adding K2 (especially MK-7 form) is a sensible precaution.' },
  { question: 'When should I take vitamin D?', answer: 'Take vitamin D with your largest meal of the day, ideally one that contains fat. Vitamin D is fat-soluble, so absorption is significantly better with dietary fat. Morning is preferred for circadian rhythm benefits.' },
  { question: 'Can I get enough vitamin D from sunlight in the UK?', answer: 'From October to March, UV-B radiation in the UK is too weak to stimulate vitamin D production regardless of sun exposure. Supplementation is recommended for virtually everyone in the UK during autumn and winter.' },
]

export default function BestVitaminDPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <FaqSchema faqs={faqs} />
      <Link href="/supplements" className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors">
        ← All Comparisons
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          Best Vitamin D Supplements <span className="text-orange-400">2026</span>
        </h1>
        <p className="mt-3 text-zinc-400">
          Over 50% of UK adults are vitamin D deficient. We compare the best D3 supplements by dose, form, and price — so you know exactly what to buy.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-zinc-500">
          <span>🗓 Updated April 2026</span>
          <span>💊 4 products compared</span>
          <span>💷 Prices in GBP</span>
        </div>
      </div>

      {/* Why D3 matters */}
      <div className="mb-10 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
        <h2 className="mb-2 font-bold text-white">Why Vitamin D Matters for Athletes</h2>
        <p className="text-sm text-zinc-400">Vitamin D receptors are found in muscle tissue. Research shows deficiency is linked to reduced muscle strength, slower recovery, higher injury risk, and impaired testosterone production. In the UK, sunlight is insufficient to maintain adequate levels from October to March — supplementation is not optional for serious athletes.</p>
      </div>

      {/* Comparison table */}
      <div className="mb-10 overflow-x-auto rounded-2xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900">
              <th className="px-4 py-3 text-left font-semibold text-zinc-400">Product</th>
              <th className="px-4 py-3 text-left font-semibold text-zinc-400">Dose & Form</th>
              <th className="px-4 py-3 text-left font-semibold text-zinc-400">Price/Serving</th>
              <th className="px-4 py-3 text-left font-semibold text-zinc-400">Score</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={p.name} className={`border-b border-zinc-800 ${i % 2 === 0 ? 'bg-zinc-950' : 'bg-zinc-900/50'}`}>
                <td className="px-4 py-3 font-medium text-white">
                  {p.name}
                  <span className="ml-2 text-xs text-zinc-500">{p.brand}</span>
                </td>
                <td className="px-4 py-3 text-zinc-400">{p.dose}</td>
                <td className="px-4 py-3 font-semibold text-orange-400">{p.pricePerServing}</td>
                <td className="px-4 py-3 font-bold text-orange-400">{p.score}/10</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product cards */}
      <div className="space-y-6">
        {products.map((p) => (
          <div key={p.name} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                {p.badge && (
                  <span className="mb-2 inline-block rounded-full bg-orange-500/20 px-3 py-0.5 text-xs font-bold text-orange-400">
                    {p.badge}
                  </span>
                )}
                <h2 className="text-xl font-extrabold text-white">{p.name}</h2>
                <p className="text-sm text-zinc-500">{p.brand} · {p.form}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-orange-400">{p.pricePerServing}</p>
                <p className="text-xs text-zinc-500">per serving · {p.score}/10</p>
              </div>
            </div>

            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-green-400">Pros</p>
                <ul className="space-y-1">
                  {p.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="mt-0.5 text-green-400">✓</span>{pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-400">Cons</p>
                <ul className="space-y-1">
                  {p.cons.map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="mt-0.5 text-red-400">✗</span>{con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mb-4 rounded-xl bg-zinc-800/60 px-4 py-3 text-sm text-zinc-300">
              <span className="font-semibold text-white">Verdict: </span>{p.verdict}
            </p>

            <a
              href={p.affiliateUrl}
              target="_blank"
              rel="nofollow noopener sponsored"
              className="inline-block rounded-xl bg-orange-500 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-orange-400"
            >
              Buy on Amazon →
            </a>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="mt-14">
        <h2 className="mb-6 text-2xl font-extrabold text-white">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map(({ question, answer }) => (
            <div key={question} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <p className="font-semibold text-white">{question}</p>
              <p className="mt-2 text-sm text-zinc-400">{answer}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900/60 px-5 py-4 text-xs leading-relaxed text-zinc-500">
        <span className="font-semibold text-zinc-400">Affiliate Disclosure:</span> BurnLab participates in the Amazon Associates programme. Some links are affiliate links — we earn a small commission at no extra cost to you.
      </p>
    </main>
  )
}
