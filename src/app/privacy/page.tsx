import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy for ${SITE_NAME}`,
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-extrabold text-white">Privacy Policy</h1>
      <p className="mb-8 text-sm text-zinc-500">Last updated: April 2026</p>

      <div className="prose prose-invert prose-orange max-w-none prose-headings:text-white prose-a:text-orange-400 prose-p:text-zinc-300">
        <p>
          This Privacy Policy describes how {SITE_NAME} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and shares information when you visit {SITE_URL} (the &quot;Site&quot;).
        </p>

        <h2>Information We Collect</h2>
        <h3>Information you provide</h3>
        <ul>
          <li><strong>Email address</strong> — when you subscribe to our newsletter or create an account</li>
          <li><strong>Workout and measurement data</strong> — when you use our workout logger or measurement tracker (this is stored securely and never shared)</li>
        </ul>

        <h3>Information collected automatically</h3>
        <ul>
          <li><strong>Usage data</strong> — pages visited, time spent, referring URLs</li>
          <li><strong>Device data</strong> — browser type, operating system, IP address</li>
          <li><strong>Cookies</strong> — used for authentication and site preferences</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <ul>
          <li>To provide and improve the Site and its features</li>
          <li>To send newsletters if you have subscribed (you can unsubscribe at any time)</li>
          <li>To authenticate your account and protect against fraud</li>
          <li>To analyse usage patterns and improve content</li>
        </ul>

        <h2>Advertising</h2>
        <p>
          We use Google AdSense to display advertisements. Google may use cookies to show ads based on your prior visits to this or other websites. You can opt out of personalised advertising by visiting{' '}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
        </p>

        <h2>Affiliate Links</h2>
        <p>
          Some links on this Site are affiliate links. When you click these and make a purchase, we may earn a commission. This does not affect the price you pay or our editorial recommendations.
        </p>

        <h2>Third-Party Services</h2>
        <ul>
          <li><strong>Clerk</strong> — authentication (see <a href="https://clerk.com/privacy" target="_blank" rel="noopener noreferrer">Clerk Privacy Policy</a>)</li>
          <li><strong>Supabase</strong> — database for user data (see <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">Supabase Privacy Policy</a>)</li>
          <li><strong>Google AdSense</strong> — advertising</li>
          <li><strong>Google Analytics</strong> — usage analytics (if enabled)</li>
        </ul>

        <h2>Data Retention</h2>
        <p>
          We retain your data for as long as your account is active or as needed to provide services. You may request deletion of your account and data at any time by contacting us.
        </p>

        <h2>Your Rights</h2>
        <p>
          Depending on your location, you may have the right to access, correct, or delete your personal data. To exercise these rights, contact us at{' '}
          <a href="mailto:hello@burnlab.co.uk">hello@burnlab.co.uk</a>.
        </p>

        <h2>Children</h2>
        <p>
          This Site is not directed at children under 13. We do not knowingly collect personal information from children under 13.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page with an updated date.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about this Privacy Policy, contact us at{' '}
          <a href="mailto:hello@burnlab.co.uk">hello@burnlab.co.uk</a>.
        </p>
      </div>
    </main>
  )
}
