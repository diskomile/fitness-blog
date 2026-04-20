'use client'

import { useState } from 'react'

type Props = {
  name: string
  muscle: string
  tip: string
  gifUrl?: string
}

// YouTube video IDs for each exercise — from established fitness channels
const YOUTUBE_IDS: Record<string, string> = {
  // Squat University, Alan Thrall, Jeff Nippard
  'Barbell Squat':             'ultJ3KAGbCE',
  'Barbell Back Squat':        'ultJ3KAGbCE',
  'Pause Squat':               'ultJ3KAGbCE',
  'Front Squat':               'uYumuL_G_V0',
  'Hack Squat':                'DcFIndbdEzQ',
  'Leg Press':                 'IZxyjW7MPJQ',
  'Bulgarian Split Squat':     '2C-uNgKwPLE',
  'Walking Lunge':             'L8fvypPrv1s',
  'Step-Up':                   'WCFCdxzFBa4',
  'Box Jump':                  'NBY9-kTuHEk',
  // Bench & Push
  'Barbell Bench Press':       'vcBig73ojpE',
  'Dumbbell Bench Press':      'VmB1G1K7v94',
  'Incline Dumbbell Press':    'DbFgADa2PL8',
  'Incline Cable Fly':         'Iwe6AmxVf7o',
  'Cable Fly':                 'Iwe6AmxVf7o',
  'Dumbbell Fly':              'eozdVDA78K0',
  'Close-Grip Bench Press':    'nEF0bv2FW7s',
  'Dips':                      'yN6Q1UI_xb0',
  'Weighted Dip':              'yN6Q1UI_xb0',
  'Push-Up Variation':         '0pkjOk0EiAk',
  // Deadlift
  'Conventional Deadlift':     'op9kVnSso6Q',
  'Romanian Deadlift':         'JCXUYuzwNrM',
  'Trap Bar Deadlift':         'iN-mDHH1kZM',
  'Barbell Row':               'kBWAon7ItDw',
  // Back & Pull
  'Pull-Up':                   'eGo4IYlbE5g',
  'Weighted Pull-Up':          'eGo4IYlbE5g',
  'Lat Pulldown':              'CAwf7n6Luuc',
  'Seated Cable Row':          'GZbfZ033f74',
  'Chest-Supported Row':       'hBIoW6-FUSA',
  'Dumbbell Row':              'roCP2sC2ZBE',
  'Face Pull':                 'HSoHeSjMGDY',
  'Reverse Fly':               'RkBOFbH3M0o',
  'Meadows Row':               'roCP2sC2ZBE',
  // Shoulders
  'Overhead Press':            'F3QY5vMz_6I',
  'Arnold Press':              'vj2w851ZHRM',
  'Cable Lateral Raise':       'PPRMfGIqFzg',
  'Lateral Raise Drop Set':    'PPRMfGIqFzg',
  'Landmine Press':            'xIqGRmTMkUE',
  // Arms
  'EZ-Bar Curl':               'zG2i9C_ld7k',
  'Hammer Curl':               'CFBZ4jN1CMI',
  'Incline Curl':              'soxrZlIl35U',
  'Reverse Curl':              'nwMNZkMQd-E',
  'Tricep Pushdown':           'vB5OHsJ3EME',
  'Skull Crusher':             'd_KZxkY_0cM',
  'Overhead Tricep Extension': 'nRiJVZDpdL0',
  // Legs
  'Leg Curl':                  'ELOCsoDSmrg',
  'Leg Extension':             'YyvSfVjQeL0',
  'Standing Calf Raise':       'JbyjNymZOt0',
  'Hip Thrust':                'SEdqd1n0cvg',
  // Core & Conditioning
  'Hanging Leg Raise':         'hdng3Nm1x_E',
  'Plank':                     'ASdvN_XEl_c',
  'Power Clean':               'RlJ-ytbT7oU',
  'Kettlebell Swing':          'sSESeQAir2M',
  'Battle Ropes':              'lFCQXE3ygWQ',
  'Burpee':                    'TU8QYVW0gDU',
  'Rowing Machine':            'H0r_DsM1QeE',
  "Farmer's Carry":            'wOKNHnYgwIU',
  'Sled Push':                 'WGYH9jMXb0Y',
}

export default function ExerciseHowToModal({ name, muscle, tip, gifUrl }: Props) {
  const [open, setOpen] = useState(false)

  const videoId = YOUTUBE_IDS[name]
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(name + ' proper form tutorial')}`

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
            className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden"
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

            {/* Video */}
            {videoId ? (
              <div className="aspect-video w-full bg-zinc-950">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1`}
                  title={`How to do ${name}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ) : gifUrl ? (
              <div className="bg-zinc-950">
                <img src={gifUrl} alt={`How to do ${name}`} className="w-full" loading="lazy" />
              </div>
            ) : (
              <div className="mx-5 mb-3 flex h-40 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950">
                <a
                  href={youtubeSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-500 transition-colors"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Watch Tutorial on YouTube
                </a>
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
