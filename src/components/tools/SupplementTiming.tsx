'use client'

import { useState } from 'react'

type Supplement = {
  name: string
  emoji: string
  timing: (workoutHour: number, goal: string) => string
  notes: string
  evidence: 'Strong' | 'Moderate' | 'Limited'
}

const EVIDENCE_COLORS = {
  Strong: 'text-green-400 bg-green-400/10',
  Moderate: 'text-yellow-400 bg-yellow-400/10',
  Limited: 'text-zinc-400 bg-zinc-400/10',
}

function formatTime(hour: number): string {
  const h = Math.floor(hour)
  const m = Math.round((hour - h) * 60)
  const period = h >= 12 ? 'PM' : 'AM'
  const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h
  return `${displayH}:${m.toString().padStart(2, '0')} ${period}`
}

const SUPPLEMENTS: Supplement[] = [
  {
    name: 'Creatine Monohydrate',
    emoji: '⚡',
    timing: (wh) => {
      // Post-workout is slightly better, but timing matters less than consistency
      const post = wh + 0.25
      return `Post-workout (~${formatTime(post)}) or any consistent time daily. Timing matters less than daily consistency.`
    },
    notes: '3–5g daily. Load with 20g/day for 5–7 days if you want faster saturation.',
    evidence: 'Strong',
  },
  {
    name: 'Caffeine / Pre-Workout',
    emoji: '☕',
    timing: (wh) => {
      const take = wh - 0.5
      return `${formatTime(take)} — 30 min before training. Avoid if workout is within 6h of bedtime.`
    },
    notes: '3–6mg per kg bodyweight. Cycle off for 1–2 weeks every 2 months to avoid tolerance.',
    evidence: 'Strong',
  },
  {
    name: 'Whey Protein',
    emoji: '🥛',
    timing: (wh) => {
      const post = wh + 0.25
      return `${formatTime(post)} — within 2h post-workout is ideal but total daily protein matters more.`
    },
    notes: '20–40g per serving. Aim for 1.6–2.2g protein per kg bodyweight total per day.',
    evidence: 'Strong',
  },
  {
    name: 'Beta-Alanine',
    emoji: '🔥',
    timing: (wh) => {
      const take = wh - 0.5
      return `${formatTime(take)} — 30–45 min pre-workout. Tingling (paresthesia) is normal and harmless.`
    },
    notes: '3.2–6.4g daily. Benefits are cumulative — consistent daily dosing matters most.',
    evidence: 'Moderate',
  },
  {
    name: 'Vitamin D3',
    emoji: '☀️',
    timing: () => 'With your largest meal of the day. D3 is fat-soluble — take with food containing fat.',
    notes: '1000–4000 IU daily. Most people in Northern Europe are deficient. Pair with K2 (100mcg).',
    evidence: 'Strong',
  },
  {
    name: 'Omega-3 / Fish Oil',
    emoji: '🐟',
    timing: () => 'With meals — split dose morning and evening to reduce fishy aftertaste.',
    notes: '2–3g combined EPA+DHA daily. Look for triglyceride form for better absorption.',
    evidence: 'Moderate',
  },
  {
    name: 'Magnesium',
    emoji: '🌙',
    timing: () => '30–60 min before bed. Helps sleep quality and muscle recovery.',
    notes: '300–400mg magnesium glycinate or bisglycinate (better absorbed than oxide). Avoid oxide form.',
    evidence: 'Moderate',
  },
  {
    name: 'BCAA / EAA',
    emoji: '💊',
    timing: (wh) => {
      const take = wh - 0.25
      return `${formatTime(take)} — during or around training. Only useful if you train fasted or under-eat protein.`
    },
    notes: 'If you hit your daily protein target, BCAAs add no benefit. Focus on whole protein sources first.',
    evidence: 'Limited',
  },
]

export default function SupplementTiming() {
  const [workoutTime, setWorkoutTime] = useState('18:00')
  const [goal, setGoal] = useState('general')

  const [hours, minutes] = workoutTime.split(':').map(Number)
  const workoutHour = hours + minutes / 60

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-4 font-bold text-white">Your Schedule</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-zinc-400">Workout time</label>
            <input
              type="time"
              value={workoutTime}
              onChange={(e) => setWorkoutTime(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-400">Primary goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"
            >
              <option value="general">General fitness</option>
              <option value="bulk">Muscle gain</option>
              <option value="cut">Fat loss</option>
              <option value="strength">Strength</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {SUPPLEMENTS.map((supp) => (
          <div key={supp.name} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{supp.emoji}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white">{supp.name}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${EVIDENCE_COLORS[supp.evidence]}`}>
                      {supp.evidence} evidence
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-orange-400">
                    🕐 {supp.timing(workoutHour, goal)}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">{supp.notes}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-zinc-600">
        Timing recommendations are evidence-based guidelines. Consult a healthcare professional before starting any supplement protocol.
      </p>
    </div>
  )
}
