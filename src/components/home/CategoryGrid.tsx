import Link from 'next/link'
import { CATEGORIES, getCategoryColor } from '@/lib/categories'

export default function CategoryGrid() {
  return (
    <section className="border-t border-zinc-800 bg-zinc-950 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-8 text-2xl font-extrabold text-white">Browse by Category</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group flex flex-col items-center rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-center transition-colors hover:border-orange-500/40"
            >
              <span
                className={`mb-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${getCategoryColor(cat.slug)}`}
              >
                {cat.label}
              </span>
              <span className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
                {cat.description.split(',')[0]}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
