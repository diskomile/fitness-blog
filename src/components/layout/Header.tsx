'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useUser, UserButton, SignInButton } from '@clerk/nextjs'
import { SITE_NAME } from '@/lib/constants'
import { CATEGORIES } from '@/lib/categories'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isSignedIn } = useUser()

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-extrabold text-white hover:text-orange-400 transition-colors">
          <span className="text-orange-400">Iron</span>Pulse
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/blog" className="text-sm text-zinc-400 hover:text-white transition-colors">
            Articles
          </Link>
          <Link href="/tools" className="text-sm text-zinc-400 hover:text-white transition-colors">
            Tools
          </Link>
          <Link href="/supplements" className="text-sm text-zinc-400 hover:text-white transition-colors">
            Supplements
          </Link>

          {/* Categories dropdown */}
          <div className="group relative">
            <button className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors">
              Categories
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="invisible absolute left-0 top-full mt-2 w-48 rounded-xl border border-zinc-700 bg-zinc-900 p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
              {CATEGORIES.map((cat) => (
                <Link key={cat.slug} href={`/category/${cat.slug}`}
                  className="block rounded-lg px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/pricing" className="text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors">
            Pricing
          </Link>

          {/* Auth */}
          {isSignedIn ? (
            <div className="group relative flex items-center gap-3">
              {/* App dropdown */}
              <div className="relative">
                <button className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors">
                  My App
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div className="invisible absolute right-0 top-full mt-2 w-44 rounded-xl border border-zinc-700 bg-zinc-900 p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
                  {[
                    { href: '/dashboard', label: '🏠 Dashboard' },
                    { href: '/calendar', label: '📅 Gym Calendar' },
                    { href: '/workout-plans', label: '🏋️ Workout Plans' },
                    { href: '/measurements', label: '📏 Measurements' },
                    { href: '/progress', label: '📊 Progress' },
                  ].map((item) => (
                    <Link key={item.href} href={item.href}
                      className="block rounded-lg px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <UserButton />
            </div>
          ) : (
            <SignInButton mode="modal">
              <button className="rounded-lg bg-orange-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-orange-400 transition-colors">
                Sign In
              </button>
            </SignInButton>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-zinc-800 bg-zinc-950 px-4 py-4 md:hidden">
          {[
            { href: '/blog', label: 'Articles' },
            { href: '/tools', label: 'Tools' },
            { href: '/supplements', label: 'Supplements' },
            { href: '/pricing', label: 'Pricing', orange: true },
          ].map((item) => (
            <Link key={item.href} href={item.href}
              className={`block py-2 text-sm ${item.orange ? 'font-semibold text-orange-400' : 'text-zinc-400 hover:text-white'}`}
              onClick={() => setMobileOpen(false)}>
              {item.label}
            </Link>
          ))}

          <div className="mt-2 border-t border-zinc-800 pt-2">
            <p className="mb-2 text-xs uppercase tracking-wider text-zinc-600">Categories</p>
            {CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={`/category/${cat.slug}`}
                className="block py-2 text-sm text-zinc-400 hover:text-white"
                onClick={() => setMobileOpen(false)}>
                {cat.label}
              </Link>
            ))}
          </div>

          {isSignedIn && (
            <div className="mt-2 border-t border-zinc-800 pt-2">
              <p className="mb-2 text-xs uppercase tracking-wider text-zinc-600">My App</p>
              {[
                { href: '/dashboard', label: '🏠 Dashboard' },
                { href: '/calendar', label: '📅 Gym Calendar' },
                { href: '/workout-plans', label: '🏋️ Workout Plans' },
                { href: '/measurements', label: '📏 Measurements' },
                { href: '/progress', label: '📊 Progress' },
              ].map((item) => (
                <Link key={item.href} href={item.href}
                  className="block py-2 text-sm text-zinc-400 hover:text-white"
                  onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          <div className="mt-4 border-t border-zinc-800 pt-4">
            {isSignedIn ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <button className="w-full rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-400 transition-colors">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
