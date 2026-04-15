import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'About BurnLab',
  description: `Learn about ${SITE_NAME} — our mission, editorial standards, and the team behind the evidence-based fitness content.`,
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl">About BurnLab</h1>
      <p className="mb-8 text-lg text-zinc-400">{SITE_DESCRIPTION}</p>

      <div className="prose prose-invert prose-orange max-w-none prose-headings:text-white prose-a:text-orange-400">
        <h2>Our Mission</h2>
        <p>
          BurnLab exists because fitness information on the internet is overwhelmingly bad. Too much of it is anecdote dressed up as science, supplement marketing disguised as advice, and clickbait that wastes your time.
        </p>
        <p>
          We write articles grounded in peer-reviewed research and practical experience. Every recommendation we make is one we&apos;d give to a friend — honest about limitations, clear about tradeoffs, and never influenced by who&apos;s paying us.
        </p>

        <h2>What We Cover</h2>
        <ul>
          <li><strong>Workouts</strong> — Training programs with progressive overload built in, not random circuit routines</li>
          <li><strong>Nutrition</strong> — Practical macro targets, meal planning, and diet strategy backed by evidence</li>
          <li><strong>Supplements</strong> — Honest reviews with price-per-serving analysis and ingredient breakdowns</li>
          <li><strong>Gear</strong> — Home gym equipment and fitness gear worth buying</li>
          <li><strong>Free Tools</strong> — 12 calculators covering TDEE, macros, 1RM, strength standards, and more</li>
        </ul>

        <h2>Editorial Standards</h2>
        <p>
          Every article on BurnLab goes through a consistent process:
        </p>
        <ul>
          <li>Claims are tied to primary research where possible, not just other fitness blogs</li>
          <li>Supplement reviews always include price-per-serving and ingredient dose analysis</li>
          <li>Product recommendations are never determined by affiliate commission rates</li>
          <li>We clearly disclose when links are affiliate links</li>
        </ul>

        <h2>Affiliate Disclosure</h2>
        <p>
          BurnLab participates in affiliate programs, including the Amazon Associates programme. When you click a product link and make a purchase, we may earn a small commission at no additional cost to you. This helps fund the site and keeps all tools and content free.
        </p>
        <p>
          Our affiliate relationships do not influence our editorial recommendations. We recommend products we believe are genuinely good, and we note when we find better value elsewhere.
        </p>

        <h2>Contact</h2>
        <p>
          For editorial questions, corrections, or partnership enquiries, reach us at:{' '}
          <a href="mailto:hello@ironpulse.fit">hello@ironpulse.fit</a>
        </p>
      </div>

      <div className="mt-10 flex gap-4">
        <Link href="/blog" className="text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors">
          Read our articles →
        </Link>
        <Link href="/tools" className="text-sm text-zinc-400 hover:text-white transition-colors">
          Free tools →
        </Link>
      </div>
    </main>
  )
}
