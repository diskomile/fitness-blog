'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function CheckoutButton() {
  const { isSignedIn } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    if (!isSignedIn) {
      router.push('/sign-in?redirect=/pricing')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="mb-8 block w-full rounded-xl bg-orange-500 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? 'Redirecting…' : 'Upgrade to Pro →'}
    </button>
  )
}
