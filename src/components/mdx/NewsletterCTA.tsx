'use client'

import { useState } from 'react'

export default function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="not-prose my-8 rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-950/30 to-zinc-900 p-6">
      <div className="flex items-start gap-4">
        <span className="text-3xl">📬</span>
        <div className="flex-1">
          <h3 className="text-base font-bold text-white">
            Enjoying this article? Get more like it.
          </h3>
          <p className="mt-1 text-sm text-zinc-400">
            Evidence-based fitness tips, supplement reviews, and workout plans — twice a week, free.
          </p>
          {status === 'success' ? (
            <p className="mt-3 text-sm font-semibold text-green-400">✓ Subscribed! Check your inbox.</p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-400 transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {status === 'loading' ? '...' : 'Subscribe'}
              </button>
            </form>
          )}
          {status === 'error' && (
            <p className="mt-1 text-xs text-red-400">Something went wrong. Try again.</p>
          )}
        </div>
      </div>
    </div>
  )
}
