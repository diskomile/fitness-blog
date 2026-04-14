import type { Metadata } from 'next'
import { SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with the ${SITE_NAME} team — editorial questions, corrections, partnerships, and more.`,
}

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-extrabold text-white">Contact Us</h1>
      <p className="mb-8 text-zinc-400">
        Have a question, found an error, or want to work together? We read every message.
      </p>

      <div className="space-y-4">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-1 font-bold text-white">Editorial & Corrections</h2>
          <p className="mb-3 text-sm text-zinc-400">
            Found an error in an article, or want to suggest a topic? We take accuracy seriously.
          </p>
          <a
            href="mailto:editorial@ironpulse.fit"
            className="text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors"
          >
            editorial@ironpulse.fit
          </a>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-1 font-bold text-white">Partnerships & Affiliate Programmes</h2>
          <p className="mb-3 text-sm text-zinc-400">
            Interested in sponsoring content or setting up an affiliate partnership? Get in touch with details about your product.
          </p>
          <a
            href="mailto:partnerships@ironpulse.fit"
            className="text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors"
          >
            partnerships@ironpulse.fit
          </a>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-1 font-bold text-white">General</h2>
          <p className="mb-3 text-sm text-zinc-400">
            Everything else — account issues, feedback, or just saying hello.
          </p>
          <a
            href="mailto:hello@ironpulse.fit"
            className="text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors"
          >
            hello@ironpulse.fit
          </a>
        </div>
      </div>

      <p className="mt-8 text-xs text-zinc-600">
        We aim to respond within 48 hours on business days.
      </p>
    </main>
  )
}
