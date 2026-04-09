'use client'

import { useState } from 'react'

type Variant = 'inline' | 'card'

export default function NewsletterForm({ variant = 'card' }: { variant?: Variant }) {
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
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        {status === 'success' ? (
          <p className="text-sm text-green-400">✓ You&apos;re subscribed!</p>
        ) : (
          <>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-400 transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? '...' : 'Subscribe'}
            </button>
          </>
        )}
      </form>
    )
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 text-center">
      <div className="mb-2 text-4xl">💪</div>
      <h2 className="text-2xl font-extrabold text-white">
        Get Free Fitness Tips
      </h2>
      <p className="mt-2 text-zinc-400">
        Evidence-based articles, supplement reviews, and workout plans — delivered every 2 days. No spam, ever.
      </p>

      {status === 'success' ? (
        <div className="mt-6 rounded-xl border border-green-800 bg-green-900/20 p-4">
          <p className="font-semibold text-green-400">✓ You&apos;re in! Check your inbox for a welcome email.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white hover:bg-orange-400 transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? 'Subscribing...' : 'Get Free Tips →'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="mt-2 text-xs text-red-400">Something went wrong. Please try again.</p>
      )}

      <p className="mt-3 text-xs text-zinc-600">
        Join free. Unsubscribe anytime.
      </p>
    </div>
  )
}
