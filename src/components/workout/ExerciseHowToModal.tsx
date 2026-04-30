'use client'

import { useState } from 'react'

type Props = {
  name: string
  muscle: string
  tip: string
  image1?: string | null
  image2?: string | null
  description?: string | null
}

export default function ExerciseHowToModal({ name, muscle, tip, image1, image2, description }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-zinc-300 transition-colors hover:border-orange-500/50 hover:text-orange-400"
      >
        <span>▶</span> How to
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 p-5 pb-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-orange-400">{muscle}</p>
                <h3 className="text-xl font-extrabold text-white">{name}</h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="mt-1 shrink-0 text-zinc-500 hover:text-white transition-colors text-lg leading-none"
              >
                ✕
              </button>
            </div>

            {/* Animated exercise images */}
            {image1 ? (
              <div className="relative bg-white overflow-hidden" style={{ height: '220px' }}>
                {/* CSS animation: alternates between frame 1 and frame 2 */}
                <style>{`
                  @keyframes exerciseFrame1 {
                    0%, 45% { opacity: 1; }
                    50%, 95% { opacity: 0; }
                    100% { opacity: 1; }
                  }
                  @keyframes exerciseFrame2 {
                    0%, 45% { opacity: 0; }
                    50%, 95% { opacity: 1; }
                    100% { opacity: 0; }
                  }
                `}</style>
                <img
                  src={image1}
                  alt={`${name} — start position`}
                  className="absolute inset-0 w-full h-full object-contain p-3"
                  style={{ animation: image2 ? 'exerciseFrame1 2s ease-in-out infinite' : 'none' }}
                />
                {image2 && (
                  <img
                    src={image2}
                    alt={`${name} — end position`}
                    className="absolute inset-0 w-full h-full object-contain p-3"
                    style={{ animation: 'exerciseFrame2 2s ease-in-out infinite', opacity: 0 }}
                  />
                )}
                <div className="absolute bottom-2 right-2 rounded-md bg-black/40 px-2 py-0.5 text-xs text-white/70">
                  CC-BY-SA · wger.de
                </div>
              </div>
            ) : (
              <div className="mx-5 mb-3 flex h-36 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950">
                <p className="text-sm text-zinc-600">No animation available</p>
              </div>
            )}

            {/* Description */}
            {description && (
              <div className="px-5 pt-3">
                <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
              </div>
            )}

            {/* Tip */}
            <div className="p-5 pt-3">
              <div className="rounded-xl bg-zinc-800/60 px-4 py-3">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-orange-400">Key tip</p>
                <p className="text-sm text-zinc-300">💡 {tip}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
