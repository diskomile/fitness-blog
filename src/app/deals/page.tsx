import type { Metadata } from 'next'
import Link from 'next/link'
import { promises as fs } from 'fs'
import path from 'path'

export const metadata: Metadata = {
  title: 'Fitness Deals — Best Discounts This Week',
  description: 'Hand-picked fitness deals updated every 3 days. Best prices on protein, creatine, gym gear, and more on Amazon UK.',
}

type Deal = {
  id: string
  name: string
  category: string
  badge: string
  originalPrice: string
  dealPrice: string
  discount: string
  url: string
  description: string
  expires: string
}

type DealsData = {
  last_updated: string
  deals: Deal[]
}

const categoryColors: Record<string, string> = {
  supplements: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  gear: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  nutrition: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  workouts: 'text-green-400 bg-green-400/10 border-green-400/20',
}

async function getDeals(): Promise<DealsData> {
  const filePath = path.join(process.cwd(), 'content', 'deals.json')
  const raw = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(raw)
}

export default async function DealsPage() {
  const { deals, last_updated } = await getDeals()

  const supplements = deals.filter((d) => d.category === 'supplements')
  const gear = deals.filter((d) => d.category === 'gear')
  const other = deals.filter((d) => !['supplements', 'gear'].includes(d.category))

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-sm font-semibold text-orange-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-orange-400" />
          Updated {new Date(last_updated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
        <h1 className="text-4xl font-extrabold text-white">
          This Week&apos;s <span className="text-orange-400">Fitness Deals</span>
        </h1>
        <p className="mt-3 text-zinc-400">
          Hand-picked deals updated every 3 days. All products available on Amazon UK.
        </p>
      </div>

      {/* Supplements */}
      {supplements.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-bold text-white">Supplements</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {supplements.map((deal) => <DealCard key={deal.id} deal={deal} />)}
          </div>
        </section>
      )}

      {/* Gear */}
      {gear.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-bold text-white">Gym Gear</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gear.map((deal) => <DealCard key={deal.id} deal={deal} />)}
          </div>
        </section>
      )}

      {/* Other */}
      {other.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-bold text-white">Nutrition & More</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {other.map((deal) => <DealCard key={deal.id} deal={deal} />)}
          </div>
        </section>
      )}

      {/* Disclaimer */}
      <p className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/60 px-5 py-4 text-xs leading-relaxed text-zinc-500">
        <span className="font-semibold text-zinc-400">Affiliate Disclosure:</span> BurnLab participates in the Amazon Associates programme.
        Prices shown are approximate and may change. Always verify the final price on Amazon before purchasing. We earn a small commission at no extra cost to you.
      </p>
    </main>
  )
}

function DealCard({ deal }: { deal: Deal }) {
  const catStyle = categoryColors[deal.category] ?? categoryColors.supplements

  return (
    <div className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition-colors hover:border-zinc-700">
      {/* Top row */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${catStyle}`}>
          {deal.category}
        </span>
        <span className="rounded-full bg-green-500/15 px-2.5 py-0.5 text-xs font-bold text-green-400">
          -{deal.discount}
        </span>
      </div>

      {/* Name */}
      <h3 className="mb-1 font-bold leading-snug text-white">{deal.name}</h3>
      <p className="mb-4 flex-1 text-sm text-zinc-400">{deal.description}</p>

      {/* Price */}
      <div className="mb-4 flex items-end gap-2">
        <span className="text-2xl font-extrabold text-orange-400">{deal.dealPrice}</span>
        <span className="mb-0.5 text-sm text-zinc-600 line-through">{deal.originalPrice}</span>
      </div>

      {/* Badge + CTA */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-zinc-500">{deal.badge}</span>
        <a
          href={deal.url}
          target="_blank"
          rel="nofollow noopener sponsored"
          className="rounded-lg bg-orange-500 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-orange-400"
        >
          View Deal →
        </a>
      </div>
    </div>
  )
}
