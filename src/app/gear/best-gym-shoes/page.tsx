import type { Metadata } from 'next'
import Link from 'next/link'
import FaqSchema from '@/components/seo/FaqSchema'

export const metadata: Metadata = {
  title: 'Best Gym Shoes 2026 — Lifting, Training & Running',
  description: 'We compare the best gym shoes for lifting, cross-training, and cardio. Find the right shoe for your training style with our in-depth 2026 guide.',
}

type Product = {
  name: string
  brand: string
  bestFor: string
  price: string
  heelDrop: string
  badge?: string | null
  pros: string[]
  cons: string[]
  verdict: string
  affiliateUrl: string
  score: number
}

const products: Product[] = [
  {
    name: 'Romaleos 4',
    brand: 'Nike',
    bestFor: 'Olympic lifting & squats',
    price: '£199',
    heelDrop: '20mm raised heel',
    badge: '🏆 Best for Lifting',
    pros: ['Rigid TPU heel for maximum stability', '20mm heel elevation improves squat depth', 'Dual strap system locks foot down', 'Used by competitive powerlifters and weightlifters'],
    cons: ['Expensive', 'Not suitable for cardio or running', 'Heavy'],
    verdict: 'The gold standard for Olympic lifting and heavy squats. If you squat heavy and want every advantage, Romaleos 4 is worth the investment.',
    affiliateUrl: 'https://www.amazon.co.uk/s?k=nike+romaleos+4+weightlifting+shoes&tag=ironpulse02-21',
    score: 9,
  },
  {
    name: 'Metcon 9',
    brand: 'Nike',
    bestFor: 'Cross-training & WODs',
    price: '£130',
    heelDrop: '4mm',
    badge: '💪 Best All-Rounder',
    pros: ['Flat, stable base for lifting', 'Durable enough for rope climbs', 'Responsive for box jumps and sprints', 'Wide forefoot for natural foot splay'],
    cons: ['Not ideal for heavy Olympic lifting', 'Slightly stiff for long runs'],
    verdict: 'The best all-around training shoe. Stable enough for deadlifts, flexible enough for HIIT, and durable enough for CrossFit. 95% of gym-goers should start here.',
    affiliateUrl: 'https://www.amazon.co.uk/s?k=nike+metcon+9+training+shoes&tag=ironpulse02-21',
    score: 9,
  },
  {
    name: 'Nano X4',
    brand: 'Reebok',
    bestFor: 'CrossFit & functional training',
    price: '£120',
    heelDrop: '4mm',
    badge: null,
    pros: ['Excellent lateral stability', 'Breathable Flexweave upper', 'Good grip on gym floors', 'Wide toe box'],
    cons: ['Slightly less durable than Metcon', 'Less responsive than dedicated running shoes'],
    verdict: 'Reebok\'s answer to the Metcon. Slightly more comfortable for all-day wear, with a wider toe box. Great for CrossFit and functional training.',
    affiliateUrl: 'https://www.amazon.co.uk/s?k=reebok+nano+x4+training+shoes&tag=ironpulse02-21',
    score: 8,
  },
  {
    name: 'Chuck Taylor All Star',
    brand: 'Converse',
    bestFor: 'Deadlifts & powerlifting',
    price: '£55',
    heelDrop: '0mm (flat)',
    badge: '💰 Best Budget',
    pros: ['Completely flat — ideal for deadlifts', 'Very affordable', 'Durable canvas upper', 'Widely available'],
    cons: ['Zero cushioning', 'No lateral support', 'Not suitable for cardio', 'Can be uncomfortable for long sessions'],
    verdict: 'The deadlifter\'s secret weapon. The flat sole means no energy is lost in a cushioned midsole. Not glamorous, but many serious powerlifters use these for pulls.',
    affiliateUrl: 'https://www.amazon.co.uk/s?k=converse+chuck+taylor+all+star+low+top&tag=ironpulse02-21',
    score: 8,
  },
  {
    name: 'Adipower Weightlifting 3',
    brand: 'Adidas',
    bestFor: 'Olympic lifting',
    price: '£170',
    heelDrop: '21mm raised heel',
    badge: null,
    pros: ['21mm heel — highest elevation available', 'TPU heel for rigidity', 'Lightweight for a lifting shoe', 'Strap closure system'],
    cons: ['Very expensive', 'Niche use case — only for lifting', 'Less widely available in UK'],
    verdict: 'A serious competitor to the Romaleos for Olympic lifting. The 21mm heel is the highest on this list. Worth considering if you prefer Adidas fit.',
    affiliateUrl: 'https://www.amazon.co.uk/s?k=adidas+adipower+weightlifting+shoes&tag=ironpulse02-21',
    score: 8,
  },
]

const faqs = [
  { question: 'Do I need special shoes for the gym?', answer: 'Not necessarily, but the right shoe makes a big difference. Running shoes have too much cushioning for lifting — the soft sole compresses under heavy load, reducing stability and power transfer. A flat or raised-heel shoe is better for most gym work.' },
  { question: 'What is heel drop and why does it matter?', answer: 'Heel drop is the height difference between the heel and toe of the shoe. A raised heel (like the Romaleos at 20mm) helps you squat deeper with an upright torso. A flat shoe (0–4mm) is better for deadlifts and general training.' },
  { question: 'Can I use running shoes for lifting?', answer: 'You can, but they are not ideal. The cushioned midsole in running shoes compresses under load, creating an unstable base. For deadlifts and squats, a flat or raised heel shoe will improve your performance and reduce injury risk.' },
  { question: 'What shoes are best for beginners?', answer: 'The Nike Metcon or Reebok Nano are the best starting points for most beginners. They work well for both lifting and conditioning, so you don\'t need multiple pairs.' },
]

export default function BestGymShoesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <FaqSchema faqs={faqs} />
      <Link href="/gear" className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors">
        ← All Gear
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          Best Gym Shoes <span className="text-orange-400">2026</span>
        </h1>
        <p className="mt-3 text-zinc-400">
          The wrong shoe can cost you stability, power, and even cause injury. We compare 5 top options for lifting, cross-training, and cardio.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-zinc-500">
          <span>🗓 Updated April 2026</span>
          <span>👟 5 shoes compared</span>
          <span>💷 Prices in GBP</span>
        </div>
      </div>

      {/* Comparison table */}
      <div className="mb-10 overflow-x-auto rounded-2xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900">
              <th className="px-4 py-3 text-left font-semibold text-zinc-400">Shoe</th>
              <th className="px-4 py-3 text-left font-semibold text-zinc-400">Best For</th>
              <th className="px-4 py-3 text-left font-semibold text-zinc-400">Price</th>
              <th className="px-4 py-3 text-left font-semibold text-zinc-400">Heel Drop</th>
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
                <td className="px-4 py-3 text-zinc-400">{p.bestFor}</td>
                <td className="px-4 py-3 text-orange-400 font-semibold">{p.price}</td>
                <td className="px-4 py-3 text-zinc-400">{p.heelDrop}</td>
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
                <p className="text-sm text-zinc-500">{p.brand} · {p.bestFor}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-orange-400">{p.price}</p>
                <p className="text-xs text-zinc-500">{p.heelDrop}</p>
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
