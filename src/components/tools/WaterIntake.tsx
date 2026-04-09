'use client'

import { useState } from 'react'

type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
type Climate = 'cool' | 'moderate' | 'hot'

const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary:   'Sedentary (desk job, no exercise)',
  light:       'Lightly active (1–2 workouts/week)',
  moderate:    'Moderately active (3–4 workouts/week)',
  active:      'Active (5+ workouts/week)',
  very_active: 'Very active (athlete / physical job)',
}

const ACTIVITY_MULTIPLIER: Record<ActivityLevel, number> = {
  sedentary:   0,
  light:       300,
  moderate:    500,
  active:      700,
  very_active: 1000,
}

const CLIMATE_EXTRA: Record<Climate, number> = {
  cool: 0,
  moderate: 200,
  hot: 500,
}

export default function WaterIntake() {
  const [weight, setWeight] = useState('')
  const [activity, setActivity] = useState<ActivityLevel>('moderate')
  const [climate, setClimate] = useState<Climate>('moderate')

  const w = parseFloat(weight)
  let totalMl: number | null = null
  let fromFood = 0
  let toDrink = 0

  if (w > 0) {
    // Base: 35ml per kg
    const base = w * 35
    const activityExtra = ACTIVITY_MULTIPLIER[activity]
    const climateExtra = CLIMATE_EXTRA[climate]
    totalMl = base + activityExtra + climateExtra
    fromFood = Math.round(totalMl * 0.2) // ~20% from food
    toDrink = Math.round(totalMl - fromFood)
  }

  const glasses = toDrink > 0 ? Math.round(toDrink / 250) : 0
  const bottles = toDrink > 0 ? (toDrink / 1000).toFixed(1) : '0'

  // Hourly schedule (8am–10pm = 14 hours)
  const schedule = toDrink > 0 ? [
    { time: '7:00 AM',  amount: '500ml', note: 'Wake up — rehydrate after sleep' },
    { time: '9:00 AM',  amount: `${Math.round(toDrink * 0.1)}ml`, note: 'Mid-morning' },
    { time: '11:00 AM', amount: `${Math.round(toDrink * 0.1)}ml`, note: 'Before lunch' },
    { time: '1:00 PM',  amount: `${Math.round(toDrink * 0.1)}ml`, note: 'With lunch' },
    { time: '3:00 PM',  amount: `${Math.round(toDrink * 0.1)}ml`, note: 'Afternoon' },
    { time: '5:00 PM',  amount: `${Math.round(toDrink * 0.15)}ml`, note: 'Pre/during workout' },
    { time: '7:00 PM',  amount: `${Math.round(toDrink * 0.1)}ml`, note: 'Post-workout' },
    { time: '9:00 PM',  amount: `${Math.round(toDrink * 0.05)}ml`, note: 'Evening (don\'t overdo before bed)' },
  ] : []

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-4 font-bold text-white">Your Details</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs text-zinc-400">Weight (kg)</label>
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="e.g. 80"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-orange-500 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-400">Climate</label>
            <select value={climate} onChange={e => setClimate(e.target.value as Climate)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-orange-500 focus:outline-none">
              <option value="cool">❄️ Cool / indoors</option>
              <option value="moderate">🌤 Moderate</option>
              <option value="hot">☀️ Hot / humid</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-2 block text-xs text-zinc-400">Activity level</label>
          <div className="space-y-2">
            {(Object.keys(ACTIVITY_LABELS) as ActivityLevel[]).map((a) => (
              <button key={a} onClick={() => setActivity(a)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${activity === a ? 'bg-orange-500 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'}`}>
                {ACTIVITY_LABELS[a]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {totalMl !== null && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-center">
              <p className="text-3xl font-extrabold text-blue-400">{(totalMl / 1000).toFixed(1)}L</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-zinc-400">Total daily need</p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-center">
              <p className="text-3xl font-extrabold text-white">{(toDrink / 1000).toFixed(1)}L</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-zinc-400">To drink</p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-center">
              <p className="text-3xl font-extrabold text-white">{glasses}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-zinc-400">Glasses (250ml)</p>
            </div>
          </div>

          {/* Visual glasses */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <h3 className="mb-3 text-sm font-bold text-white">Daily drinking schedule</h3>
            <div className="space-y-2">
              {schedule.map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-20 shrink-0 text-xs text-orange-400">{s.time}</span>
                  <span className="w-16 shrink-0 text-xs font-bold text-white">{s.amount}</span>
                  <span className="text-xs text-zinc-500">{s.note}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-zinc-600">
              💡 Urine colour is the best hydration indicator — pale yellow = well hydrated, dark = drink more.
            </p>
          </div>
        </>
      )}

      {totalMl === null && (
        <div className="rounded-2xl border border-dashed border-zinc-700 p-8 text-center">
          <p className="text-zinc-500">Enter your weight to calculate daily water intake</p>
        </div>
      )}
    </div>
  )
}
