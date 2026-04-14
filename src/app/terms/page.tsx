import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of Service for ${SITE_NAME}`,
}

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-extrabold text-white">Terms of Service</h1>
      <p className="mb-8 text-sm text-zinc-500">Last updated: April 2026</p>

      <div className="prose prose-invert prose-orange max-w-none prose-headings:text-white prose-a:text-orange-400 prose-p:text-zinc-300">
        <p>
          By accessing {SITE_URL}, you agree to be bound by these Terms of Service. If you do not agree, please do not use the Site.
        </p>

        <h2>Use of the Site</h2>
        <p>
          You may use {SITE_NAME} for personal, non-commercial purposes. You agree not to:
        </p>
        <ul>
          <li>Scrape, crawl, or copy content for commercial use without permission</li>
          <li>Attempt to gain unauthorized access to any part of the Site</li>
          <li>Use the Site in a way that could damage or impair its operation</li>
          <li>Violate any applicable laws or regulations</li>
        </ul>

        <h2>Medical Disclaimer</h2>
        <p>
          The content on {SITE_NAME} is for informational and educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider before starting a new fitness programme, diet, or taking supplements — especially if you have any health conditions or injuries.
        </p>

        <h2>User Accounts</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials. You are responsible for all activity that occurs under your account. Notify us immediately if you suspect unauthorised access to your account.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          All content on {SITE_NAME} — including articles, graphics, tools, and code — is owned by {SITE_NAME} or its content partners and is protected by copyright. You may not reproduce, distribute, or create derivative works without written permission.
        </p>

        <h2>Affiliate Links</h2>
        <p>
          This Site contains affiliate links to third-party products. We earn a commission when you make purchases through these links. We are not responsible for third-party sites&apos; content, privacy practices, or product quality.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          {SITE_NAME} is provided &quot;as is&quot; without warranties of any kind. To the fullest extent permitted by law, we disclaim all liability for any damages arising from your use of the Site or its content, including any fitness or nutrition advice.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Your continued use of the Site after changes are posted constitutes acceptance of the new terms.
        </p>

        <h2>Contact</h2>
        <p>
          For questions about these Terms, contact us at{' '}
          <a href="mailto:hello@ironpulse.fit">hello@ironpulse.fit</a>.
        </p>
      </div>
    </main>
  )
}
