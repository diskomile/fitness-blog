import Link from 'next/link'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'
import { CATEGORIES } from '@/lib/categories'
import NewsletterForm from '@/components/newsletter/NewsletterForm'

const supplementLinks = [
  { href: '/supplements/best-whey-protein', label: 'Best Whey Protein' },
  { href: '/supplements/best-creatine', label: 'Best Creatine' },
  { href: '/supplements/best-pre-workout', label: 'Best Pre-Workout' },
  { href: '/supplements/best-omega-3-fish-oil', label: 'Best Omega-3' },
  { href: '/supplements/best-zma-magnesium', label: 'Best ZMA & Magnesium' },
  { href: '/supplements/best-fat-burner', label: 'Best Fat Burner' },
]

const toolLinks = [
  { href: '/tools/tdee-calculator', label: 'TDEE Calculator' },
  { href: '/tools/macro-calculator', label: 'Macro Calculator' },
  { href: '/tools/one-rep-max-calculator', label: '1RM Calculator' },
  { href: '/tools/bmi-calculator', label: 'BMI Calculator' },
  { href: '/tools/strength-standards', label: 'Strength Standards' },
  { href: '/tools', label: 'All Tools →' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-14">
      <div className="mx-auto max-w-6xl px-4">
        {/* Newsletter strip */}
        <div className="mb-12 rounded-2xl border border-orange-500/20 bg-orange-500/5 px-6 py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-bold text-white">Get evidence-based fitness tips</p>
              <p className="text-sm text-zinc-400">Supplement reviews, workout guides & tool updates. Twice a week. Free.</p>
            </div>
            <div className="sm:w-80 shrink-0">
              <NewsletterForm variant="inline" />
            </div>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-xl font-extrabold text-white hover:text-orange-400 transition-colors">
              <span className="text-orange-400">Iron</span>Pulse
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500">{SITE_DESCRIPTION}</p>
            <div className="mt-5 flex gap-4">
              <Link href="/blog" className="text-xs text-zinc-600 hover:text-orange-400 transition-colors">Articles</Link>
              <Link href="/tools" className="text-xs text-zinc-600 hover:text-orange-400 transition-colors">Tools</Link>
              <Link href="/supplements" className="text-xs text-zinc-600 hover:text-orange-400 transition-colors">Supplements</Link>
              <Link href="/pricing" className="text-xs text-zinc-600 hover:text-orange-400 transition-colors">Pricing</Link>
            </div>
            <p className="mt-5 text-xs text-zinc-700">
              * As an Amazon Associate we earn from qualifying purchases.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Categories
            </h3>
            <ul className="space-y-2.5">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`}
                    className="text-sm text-zinc-500 hover:text-orange-400 transition-colors">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Supplements */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Supplements
            </h3>
            <ul className="space-y-2.5">
              {supplementLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-sm text-zinc-500 hover:text-orange-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Free Tools
            </h3>
            <ul className="space-y-2.5">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className={`text-sm transition-colors ${link.label.includes('→') ? 'font-semibold text-orange-400 hover:text-orange-300' : 'text-zinc-500 hover:text-orange-400'}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-800 pt-6">
          <p className="text-xs text-zinc-600">© {year} {SITE_NAME}. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/about" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">About</Link>
            <Link href="/contact" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Contact</Link>
            <Link href="/privacy" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Terms</Link>
            <Link href="/sitemap.xml" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Sitemap</Link>
            <Link href="/pricing" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Pricing</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
