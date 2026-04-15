import type { Metadata } from 'next'
import FaqSchema from '@/components/seo/FaqSchema'

export const metadata: Metadata = {
  title: 'Best Fat Burner Supplements in Europe (2026)',
  description:
    'Honest reviews of the best fat burner supplements available in Europe. We cover what the science actually says, which ingredients work, and which products are worth your money.',
}

const products = [
  {
    name: 'Bulk The Thermogenic',
    badge: 'Best Overall',
    badgeColor: 'bg-orange-500 text-white',
    rating: 4.7,
    price: '~€35',
    caffeine: '200 mg',
    keyIngredients: 'Green tea extract, L-Carnitine, Glucomannan',
    bestFor: 'Most people — solid all-round formula',
    url: 'https://www.bulk.com/eu/thermogenic.html',
    pros: [
      'Well-dosed caffeine (200 mg) without excess',
      'Glucomannan for genuine appetite suppression',
      'L-Carnitine included — great for vegetarians/vegans',
      'Transparent labelling, no proprietary blends',
    ],
    cons: [
      'Not suitable late in the day due to caffeine content',
      'Slightly pricier than entry-level options',
    ],
    review:
      "Bulk's Thermogenic is our top pick because it combines proven thermogenic ingredients with glucomannan — one of the few appetite-suppressing fibres with solid clinical backing (EFSA-approved health claim). The 200 mg caffeine dose hits the sweet spot: noticeable energy without the jittery overload you get from some American-market products. L-Carnitine is a thoughtful addition for anyone eating plant-based.",
  },
  {
    name: 'Myprotein Thermopure',
    badge: 'Best Value',
    badgeColor: 'bg-green-600 text-white',
    rating: 4.4,
    price: '~€25',
    caffeine: '200 mg',
    keyIngredients: 'Green tea extract, BioPerine (black pepper)',
    bestFor: 'Budget-conscious buyers who want results',
    url: 'https://www.myprotein.com/sports-nutrition/thermopure/10530181.html',
    pros: [
      'Excellent price point for a quality formula',
      'BioPerine improves absorption of other ingredients',
      'Simple, clean ingredient list',
      'Widely available across Europe',
    ],
    cons: [
      'No appetite-suppression ingredient (no glucomannan)',
      'Fewer ingredients than premium options',
    ],
    review:
      "Thermopure proves you don't need to spend a fortune to get a functional fat burner. The caffeine + green tea EGCG combo is one of the most replicated thermogenic pairings in the literature, and BioPerine enhances bioavailability across the board. It won't blow your mind, but at €25 it delivers honest, measurable support for your calorie deficit.",
  },
  {
    name: 'Prozis Fat Burner',
    badge: 'Best for Stimulant-Sensitive',
    badgeColor: 'bg-blue-500 text-white',
    rating: 4.1,
    price: '~€22',
    caffeine: '150 mg',
    keyIngredients: 'Chromium, Green coffee bean extract',
    bestFor: 'People sensitive to caffeine or training in the evening',
    url: 'https://www.prozis.com/en/fat-burner',
    pros: [
      'Lower caffeine dose (150 mg) — less likely to disrupt sleep',
      'Chromium helps manage blood sugar and reduce cravings',
      'Green coffee provides chlorogenic acids without heavy stimulation',
      'Affordable entry point',
    ],
    cons: [
      'Milder thermogenic effect than higher-caffeine options',
      'Less comprehensive formula overall',
    ],
    review:
      "If standard fat burners leave you feeling wired or mess with your sleep, this is worth a look. The 150 mg caffeine dose is meaningful but gentler, and chromium picolinate's role in blood glucose regulation can make a real difference for people who struggle with sugar cravings — which is where many fat-loss efforts break down.",
  },
  {
    name: 'Bulk Cutting Edge',
    badge: 'Most Complete',
    badgeColor: 'bg-purple-500 text-white',
    rating: 4.6,
    price: '~€55',
    caffeine: '200 mg',
    keyIngredients: 'Green tea, L-Carnitine, Glucomannan, Chromium, CLA, BioPerine + more',
    bestFor: 'Serious dieters who want every legal advantage',
    url: 'https://www.bulk.com/eu/cutting-edge.html',
    pros: [
      '10+ evidence-backed ingredients in one product',
      'Combines thermogenics, appetite suppression, and metabolism support',
      'Transparent dosing across the full stack',
      "Better value than buying multiple separate supplements",
    ],
    cons: [
      'Most expensive option at ~€55',
      'Overkill for casual users',
    ],
    review:
      "Cutting Edge is Bulk's flagship formula and earns the premium price if you're serious about your cut. Where the standard Thermogenic covers the bases, Cutting Edge builds a comprehensive stack: glucomannan and chromium for appetite and blood sugar, CLA for body composition support, and a full-spectrum green tea dose for EGCG potency. For someone in a structured calorie deficit who is training consistently, this covers every legal angle.",
  },
]

const faqs = [
  {
    question: 'Do fat burners actually work?',
    answer:
      'Fat burners can provide a modest, measurable boost to your results — but only in the context of an existing calorie deficit. Ingredients like caffeine and green tea extract can slightly raise your metabolic rate (by roughly 3–5%), glucomannan can reduce appetite, and chromium may curb cravings. None of these effects are large enough to override a poor diet. Think of a fat burner as a tool that makes your deficit slightly easier to maintain, not a replacement for one.',
  },
  {
    question: 'Are fat burners safe?',
    answer:
      'The products listed here use well-studied ingredients at sensible doses and are safe for healthy adults. However, avoid them if you are pregnant or breastfeeding, have cardiovascular conditions, are sensitive to caffeine, or take prescription medications. Avoid products containing DNP (2,4-dinitrophenol), ephedrine, or high-dose synephrine — these carry serious health risks and some are illegal in Europe.',
  },
  {
    question: 'Can I take a fat burner without exercising?',
    answer:
      'Technically yes, but it is largely pointless. Fat burners amplify an existing calorie deficit; they do not create one. Without exercise and dietary control, the small thermogenic boost from a supplement is easily cancelled out by eating slightly more. Regular resistance training and/or cardio, combined with a moderate calorie deficit, is what produces lasting fat loss.',
  },
  {
    question: 'When is the best time to take a fat burner?',
    answer:
      'Most fat burners are best taken in the morning or 30–45 minutes before training. This aligns the caffeine and thermogenic effect with your most active period and avoids interfering with sleep. Do not take any caffeine-containing supplement within 6 hours of bedtime. If you train in the evening, choose a lower-caffeine option like the Prozis Fat Burner.',
  },
  {
    question: 'How much weight can I lose with a fat burner?',
    answer:
      'Research suggests thermogenic supplements can increase calorie expenditure by roughly 50–100 kcal per day for a typical user — roughly equivalent to a short walk. A well-structured fat-loss phase should target 0.5–1% of bodyweight per week. A fat burner might make that slightly more achievable by reducing appetite and increasing energy for training, but you will not see dramatic results from the supplement alone.',
  },
]

const ingredients = [
  {
    name: 'Caffeine (100–200 mg)',
    desc: 'The most well-researched thermogenic. Caffeine raises metabolic rate via catecholamine release and suppresses appetite short-term. Also improves training performance, which has a compounding effect on fat loss.',
  },
  {
    name: 'Green Tea Extract (EGCG)',
    desc: 'EGCG has a modest but well-documented thermogenic effect, partly by inhibiting the enzyme that breaks down norepinephrine. Meta-analyses show a small but consistent effect on fat oxidation, particularly when combined with caffeine.',
  },
  {
    name: 'L-Carnitine',
    desc: 'Transports long-chain fatty acids into the mitochondria where they are burned for energy. Vegetarians and vegans have lower baseline levels and may see the most benefit. Evidence is mixed overall but meaningful for those with dietary deficiency.',
  },
  {
    name: 'Glucomannan',
    desc: 'A soluble fibre derived from konjac root. When taken with water before a meal, it expands in the stomach, reducing overall calorie intake. EFSA has approved the health claim that glucomannan contributes to weight loss in the context of an energy-restricted diet.',
  },
  {
    name: 'Chromium',
    desc: 'Involved in insulin signalling and glucose metabolism. Evidence suggests it can reduce carbohydrate cravings and improve blood sugar stability — both of which make it easier to sustain a calorie deficit. Best for people who struggle specifically with sugar cravings.',
  },
]

export default function BestFatBurnerPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <FaqSchema faqs={faqs} />

      {/* Disclaimer */}
      <div className="mb-10 rounded-2xl border border-amber-500/30 bg-amber-950/30 px-6 py-5">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 shrink-0 text-2xl">⚠️</span>
          <div>
            <h2 className="mb-2 text-base font-bold text-amber-300">Read this before you buy anything</h2>
            <p className="text-sm leading-relaxed text-amber-100/80">
              Fat burners are supplements — they are not a substitute for diet and exercise.
              The only mechanism that actually burns body fat is a <strong>sustained calorie deficit</strong>: consuming fewer calories than you expend over time. No pill changes that.
              We only cover products with evidence-backed ingredients at safe doses. We do not recommend DNP, ephedrine, or high-dose synephrine.
            </p>
          </div>
        </div>
      </div>

      {/* Hero */}
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-400">
        Supplement Comparison · 2026
      </p>
      <h1 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
        Best Fat Burner Supplements in Europe
      </h1>
      <p className="mb-12 text-lg leading-relaxed text-zinc-400">
        We reviewed the most popular fat burner supplements available to European buyers,
        focusing on transparent ingredient dosing, safety, and what the actual science supports.
        All four picks below use well-studied ingredients at sensible doses — no dangerous stimulants, no proprietary blend hiding.
      </p>

      {/* Comparison Table */}
      <h2 className="mb-5 text-2xl font-bold text-white">Quick Comparison</h2>
      <div className="mb-14 overflow-x-auto rounded-xl border border-zinc-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-900 text-xs uppercase tracking-wider text-zinc-400">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Caffeine</th>
              <th className="px-4 py-3">Key Ingredients</th>
              <th className="px-4 py-3">Best For</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 bg-zinc-950">
            {products.map((p) => (
              <tr key={p.name} className="hover:bg-zinc-900/60 transition-colors">
                <td className="px-4 py-4">
                  <div className="font-semibold text-white">{p.name}</div>
                  <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-bold ${p.badgeColor}`}>{p.badge}</span>
                </td>
                <td className="px-4 py-4 font-semibold text-orange-400">{p.rating} / 5</td>
                <td className="px-4 py-4 text-zinc-300 whitespace-nowrap">{p.price}</td>
                <td className="px-4 py-4 text-zinc-300 whitespace-nowrap">{p.caffeine}</td>
                <td className="px-4 py-4 text-zinc-400 max-w-[200px] text-xs">{p.keyIngredients}</td>
                <td className="px-4 py-4 text-zinc-400 text-xs">{p.bestFor}</td>
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
            <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-extrabold text-white">{p.name}</h3>
                <p className="mt-1 text-sm text-zinc-500">{p.price} · Rating: {p.rating} / 5</p>
              </div>
              <a href={p.url} rel="nofollow noopener sponsored" target="_blank"
                className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-orange-400">
                Check Price →
              </a>
            </div>
            <p className="mb-6 text-base leading-relaxed text-zinc-300">{p.review}</p>
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
          </div>
        ))}
      </div>

      {/* Ingredients That Actually Work */}
      <h2 className="mb-3 text-2xl font-bold text-white">Ingredients That Actually Work</h2>
      <p className="mb-8 text-zinc-400">
        The supplement industry is full of hyped proprietary blends. These are the ingredients with genuine, replicated evidence behind them.
      </p>
      <div className="mb-16 grid gap-4 sm:grid-cols-2">
        {ingredients.map((ing) => (
          <div key={ing.name} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <h3 className="mb-2 text-sm font-bold text-orange-400">{ing.name}</h3>
            <p className="text-sm leading-relaxed text-zinc-300">{ing.desc}</p>
          </div>
        ))}
        {/* Avoid card */}
        <div className="rounded-xl border border-red-900/40 bg-red-950/10 p-5 sm:col-span-2">
          <h3 className="mb-2 text-sm font-bold text-red-400">Avoid: DNP, Ephedrine, High-dose Synephrine</h3>
          <p className="text-sm leading-relaxed text-zinc-300">
            DNP (2,4-dinitrophenol) is a metabolic uncoupler that has killed people — it is illegal and extremely dangerous.
            Ephedrine is banned in most European countries. High-dose synephrine carries cardiovascular risks comparable to ephedrine.
            None of these appear in our recommended products. If a supplement promises dramatic results and these appear on the label, do not buy it.
          </p>
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
        <span className="font-semibold text-zinc-400">Affiliate Disclosure:</span> BurnLab participates in affiliate programmes.
        Some links on this page are affiliate links and we may earn a commission if you purchase through them, at no extra cost to you.
        All products are independently reviewed; commissions do not influence our recommendations.
      </p>
    </main>
  )
}
