'use client'

import { useState } from 'react'

type Mode = 'wake' | 'bedtime'

// One sleep cycle = 90 minutes
const CYCLE_MIN = 90
const FALL_ASLEEP_MIN = 14 // average time to fall asleep

function addMinutes(base: Date, minutes: number): Date {
  return new Date(base.getTime() + minutes * 60000)
}

function formatTime(d: Date): string {
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true })
    .replace('am', 'AM').replace('pm', 'PM')
}

function getCycleQuality(cycles: number): { label: string; color: string } {
  if (cycles >= 6) return { label: 'Excellent (9h)', color: 'text-green-400' }
  if (cycles === 5) return { label: 'Great (7.5h)', color: 'text-green-400' }
  if (cycles === 4) return { label: 'Good (6h)', color: 'text-yellow-400' }
  if (cycles === 3) return { label: 'Minimum (4.5h)', color: 'text-orange-400' }
  return { label: 'Too little', color: 'text-red-400' }
}

export default function SleepCalculator() {
  const [mode, setMode] = useState<Mode>('wake')
  const [time, setTime] = useState('07:00')

  const [hours, minutes] = time.split(':').map(Number)
  const inputDate = new Date()
  inputDate.setHours(hours, minutes, 0, 0)

  let results: { time: string; cycles: number; hours: string }[] = []

  if (mode === 'wake') {
    // User wants to wake at X — when should they sleep?
    results = [6, 5, 4, 3].map(cycles => {
      const sleepDuration = cycles * CYCLE_MIN
      const bedtime = addMinutes(inputDate, -(sleepDuration + FALL_ASLEEP_MIN))
      // If bedtime is in the future relative to now, it's today; else yesterday
      const h = (cycles * CYCLE_MIN) / 60
      const hLabel = h % 1 === 0 ? `${h}h` : `${Math.floor(h)}h 30min`
      return { time: formatTime(bedtime), cycles, hours: hLabel }
    })
  } else {
    // User wants to sleep at X — when should they wake?
    const actualSleep = addMinutes(inputDate, FALL_ASLEEP_MIN)
    results = [3, 4, 5, 6].map(cycles => {
      const wakeTime = addMinutes(actualSleep, cycles * CYCLE_MIN)
      const h = (cycles * CYCLE_MIN) / 60
      const hLabel = h % 1 === 0 ? `${h}h` : `${Math.floor(h)}h 30min`
      return { time: formatTime(wakeTime), cycles, hours: hLabel }
    })
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="mb-4 flex gap-2">
          <button onClick={() => setMode('wake')}
            className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${mode === 'wake' ? 'bg-orange-500 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'}`}>
            I want to wake at...
          </button>
          <button onClick={() => setMode('bedtime')}
            className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${mode === 'bedtime' ? 'bg-orange-500 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'}`}>
            I&apos;m going to bed at...
          </button>
        </div>

        <div>
          <label className="mb-1 block text-xs text-zinc-400">
            {mode === 'wake' ? 'Wake-up time' : 'Bedtime'}
          </label>
          <input type="time" value={time} onChange={e => setTime(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-orange-500 focus:outline-none" />
        </div>

        <p className="mt-3 text-xs text-zinc-600">
          Based on 90-min sleep cycles + ~14 min to fall asleep.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-zinc-400">
          {mode === 'wake'
            ? `Go to bed at one of these times to wake at ${time.replace(':', ':')} feeling refreshed:`
            : `Wake up at one of these times after going to bed at ${time.replace(':', ':')}:`}
        </h3>

        {results.map(({ time: t, cycles, hours }) => {
          const quality = getCycleQuality(cycles)
          const isBest = cycles === 5
          return (
            <div key={cycles}
              className={`flex items-center justify-between rounded-2xl border p-4 ${isBest ? 'border-orange-500 bg-orange-500/10' : 'border-zinc-800 bg-zinc-900'}`}>
              <div>
                <p className={`text-2xl font-extrabold ${isBest ? 'text-orange-400' : 'text-white'}`}>{t}</p>
                <p className={`text-xs ${quality.color}`}>{quality.label}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white">{cycles} cycles</p>
                <p className="text-xs text-zinc-500">{hours} sleep</p>
                {isBest && <span className="text-xs font-bold text-orange-400">Recommended</span>}
              </div>
            </div>
          )
        })}
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <h3 className="mb-3 text-sm font-bold text-white">Sleep & Muscle Recovery</h3>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li>🧬 <strong className="text-white">Growth hormone</strong> peaks during deep sleep (cycles 1–2). Never skip these.</li>
          <li>🔧 <strong className="text-white">Muscle repair</strong> primarily happens in cycles 3–5 (REM + slow-wave sleep).</li>
          <li>📉 <strong className="text-white">Less than 6h</strong> increases cortisol, reduces testosterone, and impairs protein synthesis.</li>
          <li>📵 <strong className="text-white">No screens</strong> 30–60 min before bed — blue light suppresses melatonin by up to 50%.</li>
          <li>🌡️ <strong className="text-white">Cool room</strong> (16–19°C) significantly improves sleep quality.</li>
        </ul>
      </div>
    </div>
  )
}
