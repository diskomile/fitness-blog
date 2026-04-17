'use client'

import { useState } from 'react'

type Props = {
  name: string
  muscle: string
  tip: string
  gifUrl?: string
}

export default function ExerciseHowToModal({ name, muscle, tip, gifUrl }: Props) {
  const [open, setOpen] = useState(false)

  const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(name + ' proper form tutorial')}`

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-zinc-300 transition-colors hover:border-orange-500/50 hover:text-orange-400"
      >
        <span>▶</span> How to
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-zinc-500 hover:text-white transition-colors"
            >
              ✕
            </button>

            {/* Header */}
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-orange-400">{muscle}</p>
              <h3 className="text-xl font-extrabold text-white">{name}</h3>
            </div>

            {/* GIF or placeholder */}
            {gifUrl ? (
              <div className="mb-4 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
                <img
                  src={gifUrl}
                  alt={`How to do ${name}`}
                  className="w-full"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="mb-4 flex h-40 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950">
                <p className="text-sm text-zinc-600">Animation coming soon</p>
              </div>
            )}

            {/* Tip */}
            <div className="mb-5 rounded-xl bg-zinc-800/60 px-4 py-3">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-orange-400">Key tip</p>
              <p className="text-sm text-zinc-300">💡 {tip}</p>
            </div>

            {/* YouTube CTA */}
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-red-500"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Watch Tutorial on YouTube
            </a>
          </div>
        </div>
      )}
    </>
  )
}
