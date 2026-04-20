'use client'

import { useState } from 'react'

type Props = {
  name: string
  muscle: string
  tip: string
  gifUrl?: string
}

type VideoClip = { id: string; start: number; end: number }

// YouTube clips — looped 4-6 second movement clips, GIF-like experience
const CLIPS: Record<string, VideoClip> = {
  'Barbell Squat':             { id: 'ultJ3KAGbCE', start: 28, end: 34 },
  'Barbell Back Squat':        { id: 'ultJ3KAGbCE', start: 28, end: 34 },
  'Pause Squat':               { id: 'ultJ3KAGbCE', start: 28, end: 34 },
  'Front Squat':               { id: 'uYumuL_G_V0', start: 20, end: 26 },
  'Hack Squat':                { id: 'DcFIndbdEzQ', start: 18, end: 24 },
  'Leg Press':                 { id: 'IZxyjW7MPJQ', start: 15, end: 22 },
  'Bulgarian Split Squat':     { id: '2C-uNgKwPLE', start: 20, end: 27 },
  'Walking Lunge':             { id: 'L8fvypPrv1s', start: 12, end: 18 },
  'Step-Up':                   { id: 'WCFCdxzFBa4', start: 10, end: 16 },
  'Box Jump':                  { id: 'NBY9-kTuHEk', start: 12, end: 18 },
  'Barbell Bench Press':       { id: 'vcBig73ojpE', start: 25, end: 32 },
  'Dumbbell Bench Press':      { id: 'VmB1G1K7v94', start: 18, end: 25 },
  'Incline Dumbbell Press':    { id: 'DbFgADa2PL8', start: 15, end: 22 },
  'Incline Cable Fly':         { id: 'Iwe6AmxVf7o', start: 10, end: 17 },
  'Cable Fly':                 { id: 'Iwe6AmxVf7o', start: 10, end: 17 },
  'Dumbbell Fly':              { id: 'eozdVDA78K0', start: 12, end: 18 },
  'Close-Grip Bench Press':    { id: 'nEF0bv2FW7s', start: 20, end: 27 },
  'Dips':                      { id: 'yN6Q1UI_xb0', start: 15, end: 22 },
  'Weighted Dip':              { id: 'yN6Q1UI_xb0', start: 15, end: 22 },
  'Push-Up Variation':         { id: '0pkjOk0EiAk', start: 10, end: 16 },
  'Conventional Deadlift':     { id: 'op9kVnSso6Q', start: 30, end: 37 },
  'Romanian Deadlift':         { id: 'JCXUYuzwNrM', start: 20, end: 27 },
  'Trap Bar Deadlift':         { id: 'iN-mDHH1kZM', start: 18, end: 25 },
  'Barbell Row':               { id: 'kBWAon7ItDw', start: 20, end: 27 },
  'Pull-Up':                   { id: 'eGo4IYlbE5g', start: 15, end: 22 },
  'Weighted Pull-Up':          { id: 'eGo4IYlbE5g', start: 15, end: 22 },
  'Lat Pulldown':              { id: 'CAwf7n6Luuc', start: 18, end: 25 },
  'Seated Cable Row':          { id: 'GZbfZ033f74', start: 15, end: 22 },
  'Chest-Supported Row':       { id: 'hBIoW6-FUSA', start: 12, end: 19 },
  'Dumbbell Row':              { id: 'roCP2sC2ZBE', start: 15, end: 22 },
  'Face Pull':                 { id: 'HSoHeSjMGDY', start: 20, end: 27 },
  'Reverse Fly':               { id: 'RkBOFbH3M0o', start: 12, end: 18 },
  'Meadows Row':               { id: 'roCP2sC2ZBE', start: 15, end: 22 },
  'Overhead Press':            { id: 'F3QY5vMz_6I', start: 22, end: 29 },
  'Arnold Press':              { id: 'vj2w851ZHRM', start: 15, end: 22 },
  'Cable Lateral Raise':       { id: 'PPRMfGIqFzg', start: 12, end: 18 },
  'Lateral Raise Drop Set':    { id: 'PPRMfGIqFzg', start: 12, end: 18 },
  'Landmine Press':            { id: 'xIqGRmTMkUE', start: 10, end: 17 },
  'EZ-Bar Curl':               { id: 'zG2i9C_ld7k', start: 15, end: 22 },
  'Hammer Curl':               { id: 'CFBZ4jN1CMI', start: 12, end: 18 },
  'Incline Curl':              { id: 'soxrZlIl35U', start: 15, end: 22 },
  'Reverse Curl':              { id: 'nwMNZkMQd-E', start: 10, end: 16 },
  'Tricep Pushdown':           { id: 'vB5OHsJ3EME', start: 15, end: 22 },
  'Skull Crusher':             { id: 'd_KZxkY_0cM', start: 18, end: 25 },
  'Overhead Tricep Extension': { id: 'nRiJVZDpdL0', start: 12, end: 19 },
  'Leg Curl':                  { id: 'ELOCsoDSmrg', start: 12, end: 19 },
  'Leg Extension':             { id: 'YyvSfVjQeL0', start: 10, end: 17 },
  'Standing Calf Raise':       { id: 'JbyjNymZOt0', start: 12, end: 18 },
  'Hip Thrust':                { id: 'SEdqd1n0cvg', start: 20, end: 27 },
  'Hanging Leg Raise':         { id: 'hdng3Nm1x_E', start: 12, end: 19 },
  'Plank':                     { id: 'ASdvN_XEl_c', start: 10, end: 16 },
  'Power Clean':               { id: 'RlJ-ytbT7oU', start: 25, end: 32 },
  'Kettlebell Swing':          { id: 'sSESeQAir2M', start: 18, end: 25 },
  'Battle Ropes':              { id: 'lFCQXE3ygWQ', start: 10, end: 17 },
  'Burpee':                    { id: 'TU8QYVW0gDU', start: 10, end: 17 },
  'Rowing Machine':            { id: 'H0r_DsM1QeE', start: 15, end: 22 },
  "Farmer's Carry":            { id: 'wOKNHnYgwIU', start: 10, end: 17 },
  'Sled Push':                 { id: 'WGYH9jMXb0Y', start: 10, end: 17 },
}

function buildEmbedUrl(clip: VideoClip): string {
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    loop: '1',
    playlist: clip.id,       // required for loop
    start: String(clip.start),
    end: String(clip.end),
    controls: '0',
    modestbranding: '1',
    rel: '0',
    disablekb: '1',
  })
  return `https://www.youtube.com/embed/${clip.id}?${params.toString()}`
}

export default function ExerciseHowToModal({ name, muscle, tip, gifUrl }: Props) {
  const [open, setOpen] = useState(false)

  const clip = CLIPS[name]
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

            {/* Looping clip */}
            {clip ? (
              <div className="aspect-video w-full bg-zinc-950 pointer-events-none">
                <iframe
                  width="100%"
                  height="100%"
                  src={buildEmbedUrl(clip)}
                  title={`How to do ${name}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                  className="w-full h-full"
                />
              </div>
            ) : gifUrl ? (
              <div className="bg-zinc-950">
                <img src={gifUrl} alt={`How to do ${name}`} className="w-full" loading="lazy" />
              </div>
            ) : (
              <div className="mx-5 mb-3 flex h-36 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950">
                <a
                  href={youtubeSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-500 transition-colors"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Watch on YouTube
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
