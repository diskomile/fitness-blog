'use client'

import { useState } from 'react'
import Link from 'next/link'

type Unit = 'metric' | 'imperial'
type Gender = 'male' | 'female'
type Activity =
  | 'sedentary'
  | 'light'
  | 'moderate'
  | 'active'
  | 'very_active'

const ACTIVITY_LABELS: Record<Activity, string> = {
  sedentary: 'Sedentary (desk job, no exercise)',
  light: 'Lightly active (1-3x/week)',
  moderate: 'Moderately active (3-5x/week)',
  active: 'Very active (6-7x/week)',
  very_active: 'Athlete (2x/day)',
}

const ACTIVITY_MULTIPLIERS: Record<Activity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
}

export default function TdeeCalculator() {
  const [unit, setUnit] = useState<Unit>('metric')
  const [gender, setGender] = useState<Gender>('male')
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [activity, setActivity] = useState<Activity>('moderate')
  const [result, setResult] = useState<null | {
    bmr: number
    tdee: number
    cut: number
    maintain: number
    bulk: number
  }>(null)

  function calculate() {
    const a = parseInt(age)
    let w = parseFloat(weight)
    let h = parseFloat(height)
    if (!a || !w || !h) return

    if (unit === 'imperial') {
      w = w * 0.453592
      h = h * 2.54
    }

    // Mifflin-St Jeor
    const bmr =
      gender === 'male'
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161

    const tdee = Math.round(bmr * ACTIVITY_MULTIPLIERS[activity])
    setResult({
      bmr: Math.round(bmr),
      tdee,
      cut: Math.round(tdee - 500),
      maintain: tdee,
      bulk: Math.round(tdee + 300),
    })
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Unit toggle */}
      <div className="mb-6 flex rounded-lg border border-zinc-700 p-1 w-fit">
        {(['metric', 'imperial'] as Unit[]).map((u) => (
          <button
            key={u}
            onClick={() => { setUnit(u); setResult(null) }}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors capitalize ${
              unit === u
                ? 'bg-orange-500 text-white'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {u}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Gender */}
        <div className="sm:col-span-2 flex gap-3">
          {(['male', 'female'] as Gender[]).map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={`flex-1 rounded-lg border py-3 text-sm font-medium capitalize transition-colors ${
                gender === g
                  ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                  : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
              }`}
            >
              {g === 'male' ? '♂ Male' : '♀ Female'}
            </button>
          ))}
        </div>

        {/* Age */}
        <div>
          <label className="mb-1 block text-sm text-zinc-400">Age (years)</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="25"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-600 focus:border-orange-500 focus:outline-none"
          />
        </div>

        {/* Weight */}
        <div>
          <label className="mb-1 block text-sm text-zinc-400">
            Weight ({unit === 'metric' ? 'kg' : 'lbs'})
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder={unit === 'metric' ? '80' : '176'}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-600 focus:border-orange-500 focus:outline-none"
          />
        </div>

        {/* Height */}
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm text-zinc-400">
            Height ({unit === 'metric' ? 'cm' : 'inches'})
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder={unit === 'metric' ? '180' : '71'}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-600 focus:border-orange-500 focus:outline-none"
          />
        </div>

        {/* Activity */}
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm text-zinc-400">Activity Level</label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value as Activity)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white focus:border-orange-500 focus:outline-none"
          >
            {Object.entries(ACTIVITY_LABELS).map(([val, label]) => (
              <option key={val} value={val}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={calculate}
        className="mt-6 w-full rounded-lg bg-orange-500 py-4 font-bold text-white transition-colors hover:bg-orange-400"
      >
        Calculate My TDEE
      </button>

      {result && (
        <div className="mt-8 space-y-4">
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-center">
            <p className="text-sm text-zinc-500">Basal Metabolic Rate (BMR)</p>
            <p className="text-2xl font-bold text-white">{result.bmr} <span className="text-base font-normal text-zinc-400">kcal/day</span></p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 text-center">
              <p className="text-xs text-blue-400 font-semibold uppercase tracking-wide">Cut</p>
              <p className="mt-1 text-xl font-bold text-white">{result.cut}</p>
              <p className="text-xs text-zinc-500">kcal/day</p>
              <p className="mt-1 text-xs text-zinc-600">~0.5kg/week loss</p>
            </div>
            <div className="rounded-xl border border-orange-500/50 bg-orange-500/10 p-4 text-center">
              <p className="text-xs text-orange-400 font-semibold uppercase tracking-wide">Maintain</p>
              <p className="mt-1 text-xl font-bold text-white">{result.maintain}</p>
              <p className="text-xs text-zinc-500">kcal/day</p>
              <p className="mt-1 text-xs text-zinc-600">Your TDEE</p>
            </div>
            <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-center">
              <p className="text-xs text-green-400 font-semibold uppercase tracking-wide">Bulk</p>
              <p className="mt-1 text-xl font-bold text-white">{result.bulk}</p>
              <p className="text-xs text-zinc-500">kcal/day</p>
              <p className="mt-1 text-xs text-zinc-600">~0.3kg/week gain</p>
            </div>
          </div>
          <p className="text-center text-xs text-zinc-600">
            Want a detailed macro breakdown?{' '}
            <Link href="/tools/macro-calculator" className="text-orange-400 hover:underline">
              Try the Macro Calculator →
            </Link>
          </p>
        </div>
      )}
    </div>
  )
}
