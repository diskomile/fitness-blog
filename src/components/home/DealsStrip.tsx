import Link from 'next/link'
import { promises as fs } from 'fs'
import path from 'path'

type Deal = {
  id: string
  name: string
  dealPrice: string
  originalPrice: string
  discount: string
  url: string
  category: string
}

async function getTopDeals(): Promise<Deal[]> {
  try {
    const filePath = path.join(process.cwd(), 'content', 'deals.json')
    const raw = await fs.readFile(filePath, 'utf-8')
    const data = JSON.parse(raw)
    return (data.deals as Deal[]).slice(0, 3)
  } catch {
    return []
  }
}

export default async function DealsStrip() {
  const deals = await getTopDeals()
  if (deals.length === 0) return null

  return (
    <section className="border-y border-zinc-800 bg-zinc-900/50 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <h2 className="text-lg font-extrabold text-white">This Week&apos;s Deals</h2>
          </div>
          <Link href="/deals" className="text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors">
            View all deals →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {deals.map((deal) => (
            <a
              key={deal.id}
              href={deal.url}
              target="_blank"
              rel="nofollow noopener sponsored"
              className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 transition-colors hover:border-green-500/40"
            >
              <div className="min-w-0 flex-1 pr-3">
                <p className="truncate text-sm font-semibold text-white">{deal.name}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-base font-extrabold text-orange-400">{deal.dealPrice}</span>
                  <span className="text-xs text-zinc-600 line-through">{deal.originalPrice}</span>
                </div>
              </div>
              <span className="shrink-0 rounded-full bg-green-500/15 px-2 py-0.5 text-xs font-bold text-green-400">
                -{deal.discount}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
