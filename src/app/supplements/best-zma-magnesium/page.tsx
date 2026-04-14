import type { Metadata } from 'next'
import FaqSchema from '@/components/seo/FaqSchema'

export const metadata: Metadata = {
  title: 'Best ZMA & Magnesium Supplements in Europe (2026)',
  description:
    'Compare the best ZMA and magnesium supplements available in Europe. Expert reviews of Bulk ZMA, Myprotein ZMA, Prozis Magnesium Bisglycinate, and more — ranked by form, bioavailability, and value.',
}

const products = [
  {
    name: 'Bulk ZMA',
    badge: 'Best Overall',
    badgeColor: 'bg-orange-500 text-white',
    rating: '4.8',
    price: '~€15 / 90 caps',
    zinc: '10 mg',
    magnesium: '150 mg bisglycinate',
    form: 'Bisglycinate',
    url: 'https://www.bulk.com/eu/zma.html',
    pros: [
      'Magnesium bisglycinate for superior absorption',
      'Clean label — no fillers or proprietary blends',
      'Optimal zinc dose (10 mg), well within safe range',
      'Includes 3.5 mg B6 (P-5-P form) to aid mineral uptake',
    ],
    cons: [
      'Magnesium dose (150 mg) is on the lower end',
      'Capsule size is relatively large',
    ],
    description:
      'A well-dosed, transparent ZMA formula using magnesium bisglycinate — the most bioavailable form. At €15 for 90 capsules it sits at a sweet spot of quality and price. The P-5-P B6 form is a thoughtful upgrade over the standard pyridoxine HCl used by most budget brands.',
  },
  {
    name: 'Myprotein ZMA',
    badge: 'Best Value',
    badgeColor: 'bg-blue-500 text-white',
    rating: '4.3',
    price: '~€12 / 90 caps',
    zinc: '7.5 mg',
    magnesium: '135 mg oxide',
    form: 'Oxide',
    url: 'https://www.myprotein.com/sports-nutrition/zma/10530743.html',
    pros: [
      'Lowest price per serving in this comparison',
      'Widely available across Europe',
      'Reliable brand with consistent manufacturing standards',
    ],
    cons: [
      'Magnesium oxide absorbs at roughly 4% — very poorly',
      'Lower zinc dose than competitors',
      'Standard B6 form — not the active P-5-P',
    ],
    description:
      'A budget-friendly entry into ZMA supplementation. The zinc dose is adequate, but it uses magnesium oxide — a cheaper form with very low gut absorption. Fine as a short-term option if you\'re new to ZMA, but upgrade to bisglycinate when your budget allows.',
  },
  {
    name: 'Prozis Magnesium Bisglycinate',
    badge: 'Best Pure Magnesium',
    badgeColor: 'bg-purple-500 text-white',
    rating: '4.6',
    price: '~€16 / 60 caps',
    zinc: '—',
    magnesium: '300 mg bisglycinate',
    form: 'Bisglycinate',
    url: 'https://www.prozis.com/en-eu/magnesium-bisglycinate',
    pros: [
      'High-dose magnesium (300 mg elemental) per serving',
      'Bisglycinate form — gentle on digestion, highly absorbed',
      'No zinc — ideal if you already supplement zinc separately',
    ],
    cons: [
      'Not a true ZMA formula (no zinc or B6)',
      'Higher cost per capsule than combo products',
    ],
    description:
      'Pure magnesium bisglycinate without zinc — ideal for those who already get sufficient zinc from diet or a multivitamin, or who want to dose each mineral independently. The 300 mg elemental dose covers the full recommended daily target in one serving.',
  },
  {
    name: 'Bulk Magnesium Glycinate',
    badge: 'Most Bioavailable',
    badgeColor: 'bg-green-600 text-white',
    rating: '4.7',
    price: '~€18 / 90 caps',
    zinc: '—',
    magnesium: '400 mg glycinate',
    form: 'Glycinate',
    url: 'https://www.bulk.com/eu/magnesium-glycinate.html',
    pros: [
      '400 mg elemental magnesium — the full recommended daily dose',
      'Glycinate chelate maximises absorption with minimal GI effect',
      'Well-suited to high-volume athletes with large sweat losses',
    ],
    cons: [
      'No zinc or B6 — not a ZMA formula',
      'Priciest option in the comparison',
    ],
    description:
      'The highest elemental magnesium dose in this comparison, delivered in glycinate form. If you sweat heavily during training and suspect magnesium is a limiting factor in your sleep or recovery, this is the most direct solution.',
  },
]

const faqs = [
  {
    question: 'Does ZMA increase testosterone?',
    answer:
      'ZMA does not directly raise testosterone in people who are already replete in zinc and magnesium. However, athletes and heavy exercisers often deplete these minerals through sweat, and deficiency is associated with suppressed testosterone. Restoring optimal levels can normalise testosterone back to its natural baseline — this is not the same as a pharmacological boost. Studies in zinc-deficient populations do show meaningful increases, but well-nourished individuals see modest or no effect.',
  },
  {
    question: 'What is the difference between magnesium glycinate and magnesium oxide?',
    answer:
      'Magnesium oxide is the cheapest and most common form, but it has very poor bioavailability — studies suggest only around 4% is absorbed. The rest passes through and can cause a laxative effect. Magnesium glycinate (also called bisglycinate) is chelated to the amino acid glycine, which dramatically improves absorption and is far gentler on the digestive system. For sleep support and genuine mineral repletion, glycinate or bisglycinate forms are strongly preferred.',
  },
  {
    question: 'Should I take ZMA or just plain magnesium?',
    answer:
      'It depends on your goals. ZMA combines zinc, magnesium, and B6, making it convenient if you are deficient in multiple minerals — common in athletes. If you are already zinc-sufficient but low in magnesium, a standalone magnesium glycinate product gives you a higher magnesium dose without unnecessary zinc. Excess zinc (above 40 mg/day from all sources) can interfere with copper absorption, so it is worth checking your total intake before stacking products.',
  },
  {
    question: 'When should I take ZMA?',
    answer:
      'Take ZMA 30–60 minutes before bed on an empty stomach. Calcium competes with both zinc and magnesium for absorption, so avoid dairy or calcium-containing supplements close to your ZMA dose. The magnesium component also promotes muscle relaxation and improved sleep onset, making bedtime the ideal window.',
  },
  {
    question: 'Can I take ZMA with creatine?',
    answer:
      'Yes — there is no meaningful interaction between ZMA and creatine. They work through entirely different pathways: creatine supports phosphocreatine resynthesis for short-burst power, while ZMA replenishes micronutrients involved in hormonal and enzymatic processes. You can take creatine at any time of day alongside ZMA at night without issue.',
  },
]

export default function BestZmaMagnesiumPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <FaqSchema faqs={faqs} />

      {/* Hero */}
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-400">
        Supplement Comparison · 2026
      </p>
      <h1 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
        Best ZMA & Magnesium Supplements in Europe
      </h1>
      <p className="mb-8 text-lg leading-relaxed text-zinc-400">
        Athletes lose zinc and magnesium through sweat with every session. Left unaddressed,
        these deficiencies quietly suppress sleep quality, recovery, and hormonal function.
        We compared the top European ZMA and magnesium products to find which forms, doses,
        and brands are actually worth your money.
      </p>

      {/* Why It Matters callout */}
      <div className="mb-12 rounded-2xl border border-indigo-500/30 bg-indigo-950/30 px-6 py-6">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-indigo-300">
          Why It Matters
        </h2>
        <ul className="space-y-2.5 text-sm leading-relaxed text-indigo-100/80">
          <li><span className="font-semibold text-indigo-200">Sweat losses are real:</span> A single hard training session can deplete 3–4 mg of zinc and up to 80 mg of magnesium — amounts that add up fast across a training week.</li>
          <li><span className="font-semibold text-indigo-200">Form matters enormously:</span> Magnesium oxide absorbs at roughly 4%. Bisglycinate and glycinate forms absorb at 4–5× that rate with no GI side effects.</li>
          <li><span className="font-semibold text-indigo-200">Sleep & testosterone link:</span> Zinc is a co-factor in testosterone synthesis; magnesium supports GABA pathways linked to deep sleep. Both deficiencies compound each other's effects.</li>
          <li><span className="font-semibold text-indigo-200">Timing is everything:</span> Take on an empty stomach 30–60 min before bed — calcium blocks absorption, so skip the dairy at that window.</li>
        </ul>
      </div>

      {/* Comparison Table */}
      <h2 className="mb-5 text-2xl font-bold text-white">Quick Comparison</h2>
      <div className="mb-14 overflow-x-auto rounded-xl border border-zinc-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-900 text-xs uppercase tracking-wider text-zinc-400">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Zinc</th>
              <th className="px-4 py-3">Magnesium</th>
              <th className="px-4 py-3">Form</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 bg-zinc-950">
            {products.map((p) => (
              <tr key={p.name} className="hover:bg-zinc-900/60 transition-colors">
                <td className="px-4 py-4">
                  <a href={p.url} rel="nofollow noopener sponsored" target="_blank"
                    className="font-semibold text-orange-400 hover:underline">{p.name}</a>
                  <span className={`ml-2 rounded-full px-2 py-0.5 text-xs font-bold ${p.badgeColor}`}>{p.badge}</span>
                </td>
                <td className="px-4 py-4 font-semibold text-orange-400">{p.rating} / 5</td>
                <td className="px-4 py-4 text-zinc-300">{p.price}</td>
                <td className="px-4 py-4 text-zinc-300">{p.zinc}</td>
                <td className="px-4 py-4 text-zinc-300">{p.magnesium}</td>
                <td className="px-4 py-4 text-zinc-300">{p.form}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detailed Reviews */}
      <h2 className="mb-8 text-2xl font-bold text-white">Detailed Reviews</h2>
      <div className="mb-16 space-y-8">
        {products.map((p, idx) => (
          <div key={p.name} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
            <div className="mb-1 flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">#{idx + 1}</span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${p.badgeColor}`}>{p.badge}</span>
            </div>
            <h3 className="mb-1 text-xl font-extrabold text-white">{p.name}</h3>
            <p className="mb-4 text-sm text-zinc-500">{p.price} · Rating: {p.rating} / 5</p>
            <p className="mb-6 text-base leading-relaxed text-zinc-300">{p.description}</p>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-green-400">Pros</p>
                <ul className="space-y-1.5">
                  {p.pros.map((pro) => (
                    <li key={pro} className="flex gap-2 text-sm text-zinc-300">
                      <span className="mt-0.5 shrink-0 text-green-400">✓</span>{pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-red-400">Cons</p>
                <ul className="space-y-1.5">
                  {p.cons.map((con) => (
                    <li key={con} className="flex gap-2 text-sm text-zinc-300">
                      <span className="mt-0.5 shrink-0 text-red-400">✗</span>{con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6">
              <a href={p.url} rel="nofollow noopener sponsored" target="_blank"
                className="inline-block rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-orange-400">
                Check Price →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* What to Look For */}
      <h2 className="mb-6 text-2xl font-bold text-white">What to Look For</h2>
      <div className="mb-16 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="mb-3 text-base font-bold text-orange-400">Magnesium Form</h3>
            <p className="mb-2 text-sm leading-relaxed text-zinc-300">In descending order of bioavailability and gut tolerance:</p>
            <ol className="space-y-1 text-sm text-zinc-300">
              <li><span className="font-semibold text-zinc-100">1. Glycinate / Bisglycinate</span> — best absorbed, no laxative effect</li>
              <li><span className="font-semibold text-zinc-100">2. Malate</span> — good absorption, may support energy</li>
              <li><span className="font-semibold text-zinc-100">3. Citrate</span> — decent absorption, mild laxative at high doses</li>
              <li><span className="font-semibold text-zinc-100">4. Oxide</span> — avoid for supplementation purposes</li>
            </ol>
          </div>
          <div>
            <h3 className="mb-3 text-base font-bold text-orange-400">Zinc Dose</h3>
            <p className="text-sm leading-relaxed text-zinc-300">
              The optimal supplemental zinc dose is <span className="font-semibold text-zinc-100">10–25 mg/day</span>.
              The EU tolerable upper intake level is 25 mg/day from supplements; the absolute upper limit across all sources is 40 mg/day.
              Higher doses chronically deplete copper, an essential co-factor for immune function and collagen synthesis.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-base font-bold text-orange-400">Magnesium Dose</h3>
            <p className="text-sm leading-relaxed text-zinc-300">
              Target <span className="font-semibold text-zinc-100">300–400 mg elemental magnesium</span> per day from all sources.
              Athletes training 5+ sessions per week should aim for the upper end.
              ZMA products typically deliver 150–200 mg; standalone glycinate products often provide the full dose in one serving.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-base font-bold text-orange-400">B6 Form</h3>
            <p className="text-sm leading-relaxed text-zinc-300">
              Standard B6 (pyridoxine HCl) works, but the activated form{' '}
              <span className="font-semibold text-zinc-100">P-5-P (pyridoxal-5-phosphate)</span>{' '}
              is used directly without conversion — beneficial for those with MTHFR variants or compromised B6 metabolism.
              Bulk ZMA uses P-5-P; most budget products use pyridoxine HCl.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <h2 className="mb-6 text-2xl font-bold text-white">Frequently Asked Questions</h2>
      <div className="mb-12 space-y-4">
        {faqs.map((faq) => (
          <details key={faq.question} className="group rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4">
            <summary className="cursor-pointer list-none text-base font-semibold text-zinc-100 group-open:text-orange-400">
              {faq.question}
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">{faq.answer}</p>
          </details>
        ))}
      </div>

      {/* Disclosure */}
      <p className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-5 py-4 text-xs leading-relaxed text-zinc-500">
        <span className="font-semibold text-zinc-400">Affiliate Disclosure:</span> IronPulse participates in affiliate programmes.
        Some links on this page are affiliate links and we may earn a commission if you purchase through them, at no extra cost to you.
        All products are independently reviewed; commissions do not influence our recommendations.
      </p>
    </main>
  )
}
