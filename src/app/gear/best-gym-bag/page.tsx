import type { Metadata } from 'next'
import Link from 'next/link'
import FaqSchema from '@/components/seo/FaqSchema'

export const metadata: Metadata = {
  title: 'Best Gym Bags 2026 — Top Picks for Every Budget',
  description: 'We compare the best gym bags for serious lifters in 2026. From budget options to premium duffels — find the right bag for your gym kit.',
}

type Product = {
  name: string
  brand: string
  capacity: string
  price: string
  badge?: string | null
  pros: string[]
  cons: string[]
  verdict: string
  affiliateUrl: string
  score: number
}

const products: Product[] = [
  {
    name: 'Defender II Sport Duffel',
    brand: 'Under Armour',
    capacity: '60L',
    price: '£55',
    badge: '🏆 Best Overall',
    pros: ['Huge 60L capacity', 'Separate vented shoe compartment', 'Water-resistant bottom', 'Multiple pockets and organisation', 'Durable UA Storm fabric'],
    cons: ['No dry/wet separation for swimwear', 'Can feel bulky when full'],
    verdict: 'The best all-around gym bag for most people. Enough room for kit, shoes, and supplements. The vented shoe compartment keeps smells separate from your gear.',
    affiliateUrl: 'https://www.amazon.co.uk/s?k=under+armour+defender+ii+sport+duffel&tag=ironpulse02-21',
    score: 9,
  },
  {
    name: 'Endurance Bag 45L',
    brand: 'Gymshark',
    capacity: '45L',
    price: '£45',
    badge: '💪 Best Mid-Range',
    pros: ['Sleek design', 'Padded laptop compartment', 'Wet/dry compartment', 'Comfortable shoulder strap', 'Good size for daily gym use'],
    cons: ['No vented shoe compartment', 'Logo-heavy design not for everyone'],
    verdict: 'A great looking bag with practical features. The wet/dry compartment is useful for sweaty kit. Ideal if you go gym → office → home.',
    affiliateUrl: 'https://www.amazon.co.uk/s?k=gymshark+endurance+gym+bag&tag=ironpulse02-21',
    score: 8,
  },
  {
    name: 'Small Duffel Bag',
    brand: 'Nike',
    capacity: '31L',
    price: '£30',
    badge: '💰 Best Budget',
    pros: ['Very affordable', 'Lightweight', 'Shoe compartment', 'Wide availability', 'Multiple colour options'],
    cons: ['Smaller capacity — not for heavy kit loads', 'Less durable than premium options', 'Basic organisation'],
    verdict: 'The go-to budget option. If you just need to carry kit, shoes, and a towel, this does the job well at a low price.',
    affiliateUrl: 'https://www.amazon.co.uk/s?k=nike+small+duffel+gym+bag&tag=ironpulse02-21',
    score: 7,
  },
  {
    name: 'Pro 9.0 Training Bag',
    brand: 'Adidas',
    capacity: '50L',
    price: '£65',
    badge: null,
    pros: ['Separate shoe compartment', 'Structured base holds shape when empty', 'Side bottle holder', 'Padded handles and shoulder strap'],
    cons: ['More expensive than comparable options', 'No wet/dry compartment'],
    verdict: 'A quality bag with a structured design that holds its shape. Better than the Nike duffel for organisation but pricier. Good if you want durability.',
    affiliateUrl: 'https://www.amazon.co.uk/s?k=adidas+pro+training+duffel+bag&tag=ironpulse02-21',
    score: 8,
  },
  {
    name: 'Transporter Extend Duffel',
    brand: 'OSPREY',
    capacity: '65L',
    price: '£90',
    badge: '🎖 Premium Pick',
    pros: ['Highest quality construction on the list', 'YKK zippers that last years', 'Padded shoulder strap with load-lifters', 'Fully waterproof base', 'Lifetime warranty'],
    cons: ['Most expensive option', 'Overkill for casual gym-goers'],
    verdict: 'If you want a bag that will last 10 years, Osprey\'s build quality is unmatched. The lifetime warranty alone justifies the price for frequent gym-goers.',
    affiliateUrl: 'https://www.amazon.co.uk/s?k=osprey+transporter+duffel+bag&tag=ironpulse02-21',
    score: 9,
  },
]

const faqs = [
  { question: 'How big should a gym bag be?', answer: 'For most gym-goers, 40–50L is the sweet spot. It\'s large enough for kit, shoes, towel, and supplements without being unwieldy. If you swim or bring work clothes, go for 55–65L.' },
  { question: 'Do I need a separate shoe compartment?', answer: 'It\'s worth having. A vented shoe compartment keeps your gym shoes separate from clean kit and reduces smell transfer. Most quality bags in the £40+ range include one.' },
  { question: 'What features actually matter?', answer: 'Shoe compartment, at least one water bottle holder, a key clip inside, and durable zippers. Everything else is nice-to-have. Avoid bags with weak zippers — they fail first.' },
  { question: 'Is a backpack or duffel better for the gym?', answer: 'Duffels are generally better for the gym — easier to pack and access, more space per weight, and most have dedicated shoe compartments. Backpacks are better if you commute by bike or need to carry a laptop.' },
]

export default function BestGymBagPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <FaqSchema faqs={faqs} />
      <Link href="/gear" className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors">
        ← All Gear
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          Best Gym Bags <span className="text-orange-400">2026</span>
        </h1>
        <p className="mt-3 text-zinc-400">
          We compare 5 gym bags across all budgets — from a £30 Nike duffel to a lifetime-warranty Osprey. Find the right one for your kit load.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-zinc-500">
          <span>🗓 Updated April 2026</span>
          <span>🎒 5 bags compared</span>
          <span>💷 Prices in GBP</span>
        </div>
      </div>

      {/* Comparison table */}
      <div className="mb-10 overflow-x-auto rounded-2xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900">
              <th className="px-4 py-3 text-left font-semibold text-zinc-400">Bag</th>
              <th className="px-4 py-3 text-left font-semibold text-zinc-400">Capacity</th>
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
                <p className="text-sm text-zinc-500">{p.brand} · {p.capacity}</p>
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
