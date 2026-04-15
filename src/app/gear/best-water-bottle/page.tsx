import type { Metadata } from 'next'
import Link from 'next/link'
import FaqSchema from '@/components/seo/FaqSchema'

export const metadata: Metadata = {
  title: 'Best Gym Water Bottles 2026 — Insulated, Large & Leak-Proof',
  description: 'We compare the best water bottles for the gym in 2026. Find the right size, material, and features for your training needs.',
}

type Product = {
  name: string
  brand: string
  capacity: string
  price: string
  material: string
  badge?: string | null
  pros: string[]
  cons: string[]
  verdict: string
  affiliateUrl: string
  score: number
}

const products: Product[] = [
  {
    name: 'Chug Jug 2.2L',
    brand: 'Hydracy',
    capacity: '2.2L',
    price: '£18',
    material: 'BPA-free Tritan',
    badge: '🏆 Best Overall',
    pros: ['2.2L keeps you hydrated through the longest sessions', 'Time marker motivates consistent sipping', 'Leak-proof lid', 'Dishwasher safe', 'Very affordable'],
    cons: ['Plastic — not insulated', 'Too large for some gym bags', 'Can look bulky'],
    verdict: 'The best value gym water bottle. The time markers are more motivating than you\'d expect, and 2.2L means you rarely need to refill. A staple for serious gym-goers.',
    affiliateUrl: 'https://www.amazon.co.uk/s?k=hydracy+2.2l+water+bottle+time+marker&tag=ironpulse02-21',
    score: 9,
  },
  {
    name: 'Chug Cap Water Bottle 32oz',
    brand: 'Hydro Flask',
    capacity: '946ml (32oz)',
    price: '£38',
    material: 'Stainless steel (insulated)',
    badge: '🌡 Best Insulated',
    pros: ['Keeps drinks cold 24 hours, hot 12 hours', 'Premium stainless steel build', 'Powder coat grip is excellent', 'Won\'t sweat on gym floor', 'Lifetime warranty'],
    cons: ['Expensive for a water bottle', 'Heavier than plastic options', 'Smaller capacity than budget picks'],
    verdict: 'If you want cold water after an hour of training, nothing beats Hydro Flask insulation. Worth it if you train outdoors or in warm gyms.',
    affiliateUrl: 'https://www.amazon.co.uk/s?k=hydro+flask+32oz+chug+cap+water+bottle&tag=ironpulse02-21',
    score: 9,
  },
  {
    name: 'ActiveFlow 1L Bottle',
    brand: 'Myprotein',
    capacity: '1L',
    price: '£12',
    material: 'BPA-free plastic',
    badge: '💰 Best Budget',
    pros: ['Cheapest option on the list', 'Flip-top lid for one-handed drinking', 'Leak-proof', 'Lightweight', 'Gym branding minimal'],
    cons: ['Only 1L — may need refilling mid-session', 'Not insulated', 'Less durable than premium options'],
    verdict: 'The no-frills option. If you just need something functional that fits in your bag, this works fine. Not exciting, but at £12 there is nothing to complain about.',
    affiliateUrl: 'https://www.amazon.co.uk/s?k=myprotein+1l+water+bottle&tag=ironpulse02-21',
    score: 7,
  },
  {
    name: 'Stanley Quencher H2.0 40oz',
    brand: 'Stanley',
    capacity: '1.18L (40oz)',
    price: '£35',
    material: 'Stainless steel (insulated)',
    badge: null,
    pros: ['Excellent insulation', 'Comfortable handle', 'Fits in car cup holder', 'Wide mouth for ice', 'Lifetime warranty'],
    cons: ['Very trendy — may feel like a fashion item', 'Handle can get in the way in bags', 'Expensive'],
    verdict: 'Genuinely good insulation and build quality beyond the hype. The handle makes it easy to carry between equipment. Good pick if you want something that lasts.',
    affiliateUrl: 'https://www.amazon.co.uk/s?k=stanley+quencher+40oz+tumbler&tag=ironpulse02-21',
    score: 8,
  },
  {
    name: 'Nalgene Wide Mouth 1L',
    brand: 'Nalgene',
    capacity: '1L',
    price: '£15',
    material: 'Tritan (BPA-free)',
    badge: '🔒 Most Durable',
    pros: ['Nearly indestructible — drop-tested', 'Wide mouth easy to clean', 'BPA-free Tritan plastic', 'Dishwasher safe', 'Used by outdoor athletes worldwide'],
    cons: ['Not insulated', 'No built-in handle or loop', 'Basic design'],
    verdict: 'The toughest plastic bottle on the list. Nalgene has a cult following among hikers and athletes for its durability. Will outlast any other plastic bottle.',
    affiliateUrl: 'https://www.amazon.co.uk/s?k=nalgene+wide+mouth+1l+water+bottle&tag=ironpulse02-21',
    score: 8,
  },
]

const faqs = [
  { question: 'How much water should I drink during a workout?', answer: 'A general guideline is 500–750ml per hour of moderate exercise. In hot conditions or for high-intensity training, aim for 750ml–1L per hour. Urine colour is a good guide — pale yellow means well hydrated.' },
  { question: 'Do I need an insulated bottle for the gym?', answer: 'Not essential, but nice to have. If you train for under an hour in an air-conditioned gym, a standard plastic bottle is fine. If sessions are longer or you train outdoors, insulation keeps water cold throughout.' },
  { question: 'What size water bottle should I get?', answer: 'For most gym sessions (60–90 minutes), 1L is enough. If you do longer sessions or want to track daily hydration, 2L+ bottles with time markers are more convenient.' },
  { question: 'Are plastic water bottles safe?', answer: 'BPA-free plastic (Tritan) is considered safe by food safety authorities. If you\'re concerned, stainless steel bottles like Hydro Flask eliminate any plastic contact with your water entirely.' },
]

export default function BestWaterBottlePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <FaqSchema faqs={faqs} />
      <Link href="/gear" className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors">
        ← All Gear
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          Best Gym Water Bottles <span className="text-orange-400">2026</span>
        </h1>
        <p className="mt-3 text-zinc-400">
          From a £12 functional pick to a lifetime-warranty Hydro Flask — we compare 5 gym water bottles across size, insulation, and value.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-zinc-500">
          <span>🗓 Updated April 2026</span>
          <span>💧 5 bottles compared</span>
          <span>💷 Prices in GBP</span>
        </div>
      </div>

      {/* Comparison table */}
      <div className="mb-10 overflow-x-auto rounded-2xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900">
              <th className="px-4 py-3 text-left font-semibold text-zinc-400">Bottle</th>
              <th className="px-4 py-3 text-left font-semibold text-zinc-400">Capacity</th>
              <th className="px-4 py-3 text-left font-semibold text-zinc-400">Material</th>
              <th className="px-4 py-3 text-left font-semibold text-zinc-400">Price</th>
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
                <td className="px-4 py-3 text-zinc-400">{p.capacity}</td>
                <td className="px-4 py-3 text-zinc-400">{p.material}</td>
                <td className="px-4 py-3 text-orange-400 font-semibold">{p.price}</td>
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
                <p className="text-sm text-zinc-500">{p.brand} · {p.capacity} · {p.material}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-orange-400">{p.price}</p>
                <p className="text-xs text-zinc-500">{p.score}/10</p>
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
              View on Amazon →
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
