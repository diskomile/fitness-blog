import type { Metadata } from 'next'
import Link from 'next/link'
import FaqSchema from '@/components/seo/FaqSchema'

export const metadata: Metadata = {
  title: 'Best Casein Protein 2026 — Slow-Release Protein for Overnight Recovery',
  description: 'Casein digests slowly over 5–7 hours, making it ideal before bed. We compare the best micellar casein supplements by price, protein %, and taste.',
}

type Product = {
  name: string
  brand: string
  proteinPerServing: string
  servingSize: string
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
    name: 'Micellar Casein',
    brand: 'Bulk',
    proteinPerServing: '24g',
    servingSize: '30g',
    pricePerServing: '£0.65',
    badge: '🏆 Best Value',
    pros: ['True micellar casein (not calcium caseinate)', '24g protein per 30g serving', 'Extremely affordable for a quality casein', 'Mixes well despite thick texture', 'Transparent labelling, no proprietary blends'],
    cons: ['Thicker texture than whey — takes some getting used to', 'Fewer flavour options than whey'],
    verdict: 'The best value casein on the market. Bulk uses true micellar casein (not cheaper calcium caseinate) at a price that makes nightly use affordable. If you want to optimise overnight recovery without spending much, this is the one.',
    affiliateUrl: 'https://www.amazon.co.uk/s?k=bulk+micellar+casein+protein&tag=ironpulse02-21',
    score: 10,
  },
  {
    name: 'Gold Standard 100% Casein',
    brand: 'Optimum Nutrition',
    proteinPerServing: '24g',
    servingSize: '34g',
    pricePerServing: '£1.05',
    badge: '💎 Most Trusted',
    pros: ['Established brand with decades of quality', 'Third-party Informed Sport certified', 'Excellent mixability for a casein', 'Available in multiple flavours', 'Widely stocked in UK'],
    cons: ['More expensive than own-brand alternatives', 'No fibre added'],
    verdict: 'ON Gold Standard is the benchmark casein. If you want a tried-and-tested product from a brand trusted by professional athletes, and quality certification matters to you, this is the safest choice.',
    affiliateUrl: 'https://www.amazon.co.uk/s?k=optimum+nutrition+gold+standard+casein&tag=ironpulse02-21',
    score: 9,
  },
  {
    name: 'Slow-Release Casein',
    brand: 'Myprotein',
    proteinPerServing: '23g',
    servingSize: '33g',
    pricePerServing: '£0.75',
    badge: null,
    pros: ['Good protein yield per serving', 'Competitive price', 'Regularly on promotion', 'Multiple flavours available', 'Convenient 2.5kg bags for bulk buying'],
    cons: ['Slightly lower protein % than competitors', 'Quality varies batch to batch based on user reports', 'Customer service can be inconsistent'],
    verdict: 'Myprotein casein is solid, especially on sale. Buy it during their regular 35-40% off promotions and the price-per-serving drops significantly. Not quite as reliable as ON but a decent budget option.',
    affiliateUrl: 'https://www.amazon.co.uk/s?k=myprotein+slow+release+casein&tag=ironpulse02-21',
    score: 8,
  },
  {
    name: 'Elite Casein',
    brand: 'Dymatize',
    proteinPerServing: '25g',
    servingSize: '36g',
    pricePerServing: '£1.15',
    badge: '🌟 Best Taste',
    pros: ['25g protein — highest on this list', 'Excellent flavour (Chocolate Cake is outstanding)', 'Informed Sport certified', 'Good amino acid profile', 'Less chalky than most casein powders'],
    cons: ['Most expensive on this list', 'Less well-known in UK compared to US market'],
    verdict: 'Dymatize Elite Casein stands out for taste and protein content. If you struggle with the bland or chalky flavour of other caseins, this is worth the premium. Chocolate Cake flavour is genuinely enjoyable as a pre-bed shake.',
    affiliateUrl: 'https://www.amazon.co.uk/s?k=dymatize+elite+casein+protein&tag=ironpulse02-21',
    score: 8,
  },
]

const faqs = [
  { question: 'What is casein protein and how is it different from whey?', answer: 'Casein is the primary protein in milk, making up about 80% of milk protein (whey is the other 20%). Unlike whey, which digests rapidly (2–3 hours), casein forms a gel in the stomach and digests slowly over 5–7 hours, providing a sustained amino acid release. This makes it ideal for fasting periods like sleep.' },
  { question: 'Should I take casein before bed?', answer: 'Yes — this is the primary use case. Research (notably van Loon et al.) shows 40g of casein before sleep significantly increases overnight muscle protein synthesis compared to placebo. For anyone serious about muscle building or retention, a pre-bed casein shake is one of the most well-supported nutrition strategies.' },
  { question: 'What is micellar casein vs calcium caseinate?', answer: 'Micellar casein is the native, undenatured form of casein that digests slowly (5–7 hours) — this is what you want. Calcium caseinate is a processed form that digests faster (closer to 3 hours) and is less effective for overnight use. Always check the ingredient list for "micellar casein."' },
  { question: 'Can I use casein as my only protein supplement?', answer: 'You can, but most people use whey post-workout for fast absorption and casein pre-bed for slow release. If you only want one protein supplement, whey is more versatile. Casein excels specifically in situations requiring slow amino acid release.' },
  { question: 'How much casein should I take before bed?', answer: 'Research typically uses 40g doses. Most products provide 24–25g per scoop, so 1.5–2 scoops gives you the studied dose. If you had a large protein meal close to bed, a single scoop (24–25g) is sufficient.' },
]

export default function BestCaseinProteinPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <FaqSchema faqs={faqs} />
      <Link href="/supplements" className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors">
        ← All Comparisons
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          Best Casein Protein <span className="text-orange-400">2026</span>
        </h1>
        <p className="mt-3 text-zinc-400">
          Casein digests over 5–7 hours — making it the ideal pre-bed protein for overnight muscle recovery. We compare the best micellar casein supplements by protein content, quality, and price per serving.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-zinc-500">
          <span>🗓 Updated April 2026</span>
          <span>🥛 4 products compared</span>
          <span>💷 Prices in GBP</span>
        </div>
      </div>

      {/* Why casein matters */}
      <div className="mb-10 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
        <h2 className="mb-2 font-bold text-white">Why Casein Protein Matters for Athletes</h2>
        <p className="text-sm text-zinc-400">Muscle protein synthesis continues during sleep — but only if amino acids are available. Casein's slow digestion means amino acids trickle into your bloodstream for up to 7 hours, preventing catabolism during your longest daily fast. A 2012 study by van Loon et al. showed 40g pre-sleep casein increased overnight protein synthesis by 22% compared to placebo. For anyone in a calorie deficit or training hard, this is one of the most cost-effective interventions available.</p>
      </div>

      {/* Comparison table */}
      <div className="mb-10 overflow-x-auto rounded-2xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900">
              <th className="px-4 py-3 text-left font-semibold text-zinc-400">Product</th>
              <th className="px-4 py-3 text-left font-semibold text-zinc-400">Protein/Serving</th>
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
                <td className="px-4 py-3 text-zinc-400">{p.proteinPerServing}</td>
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
                <p className="text-sm text-zinc-500">{p.brand} · {p.servingSize} serving · {p.proteinPerServing} protein</p>
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
