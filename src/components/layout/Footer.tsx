import Link from 'next/link'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'
import { CATEGORIES } from '@/lib/categories'
import NewsletterForm from '@/components/newsletter/NewsletterForm'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-12">
      <div className="mx-auto max-w-6xl px-4">
        {/* Newsletter strip */}
        <div className="mb-12">
          <NewsletterForm variant="inline" />
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-xl font-extrabold text-white">
              <span className="text-orange-400">Iron</span>Pulse
            </Link>
            <p className="mt-3 text-sm text-zinc-500 max-w-sm">{SITE_DESCRIPTION}</p>
            <p className="mt-4 text-xs text-zinc-600">
              * As an Amazon Associate we earn from qualifying purchases.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Categories
            </h3>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-zinc-500 hover:text-orange-400 transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Site
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-zinc-500 hover:text-orange-400 transition-colors">
                  All Articles
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="text-sm text-zinc-500 hover:text-orange-400 transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-800 pt-6 text-center text-xs text-zinc-600">
          © {year} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
