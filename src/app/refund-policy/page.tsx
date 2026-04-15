import type { Metadata } from 'next'
import { SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: `Refund Policy for ${SITE_NAME}`,
}

export default function RefundPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-extrabold text-white">Refund Policy</h1>
      <p className="mb-8 text-sm text-zinc-500">Last updated: April 2026</p>

      <div className="prose prose-invert prose-orange max-w-none prose-headings:text-white prose-a:text-orange-400 prose-p:text-zinc-300">

        <h2>Digital Products & Subscriptions</h2>
        <p>
          {SITE_NAME} offers a Pro subscription plan. If you are not satisfied with your purchase, you may request a full refund within <strong>14 days</strong> of your initial payment — no questions asked.
        </p>
        <p>
          To request a refund, contact us at{' '}
          <a href="mailto:hello@burnlab.co.uk">hello@burnlab.co.uk</a> with your order details. Refunds are processed within 5–10 business days to your original payment method.
        </p>

        <h2>Subscription Cancellations</h2>
        <p>
          You may cancel your Pro subscription at any time from your account dashboard. Cancellation takes effect at the end of the current billing period — you will retain Pro access until then. We do not provide partial refunds for unused portions of a billing period beyond the 14-day window.
        </p>

        <h2>Free Plan</h2>
        <p>
          The free plan has no charges and therefore no refund applies.
        </p>

        <h2>Affiliate & Third-Party Products</h2>
        <p>
          {SITE_NAME} links to third-party products via affiliate programmes (e.g. Amazon, Myprotein, Bulk). We do not sell or fulfil these products directly. For refunds on third-party purchases, please contact the retailer directly:
        </p>
        <ul>
          <li><strong>Amazon UK</strong> — standard 30-day return policy</li>
          <li><strong>Myprotein</strong> — 30-day returns policy</li>
          <li><strong>Bulk</strong> — 30-day returns policy</li>
        </ul>

        <h2>Exceptions</h2>
        <p>
          Refunds may be declined if there is evidence of misuse, fraud, or a pattern of repeated refund requests across multiple billing periods.
        </p>

        <h2>Contact</h2>
        <p>
          For any refund requests or questions, contact us at{' '}
          <a href="mailto:hello@burnlab.co.uk">hello@burnlab.co.uk</a>. We aim to respond within 48 hours on business days.
        </p>
      </div>
    </main>
  )
}
