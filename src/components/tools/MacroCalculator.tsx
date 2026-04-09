'use client'

import { useState } from 'react'

type Goal = 'cut' | 'maintain' | 'bulk'

const GOAL_CONFIG: Record<Goal, { label: string; proteinRatio: number; fatRatio: number; calAdjust: number; color: string }> = {
  cut: { label: '🔥 Cut (Lose Fat)', proteinRatio: 1.0, fatRatio: 0.25, calAdjust: -500, color: 'blue' },
  maintain: { label: '⚖️ Maintain', proteinRatio: 0.85, fatRatio: 0.28, calAdjust: 0, color: 'orange' },
  bulk: { label: '💪 Bulk (Gain Muscle)', proteinRatio: 0.9, fatRatio: 0.28, calAdjust: 300, color: 'green' },
}

export default function MacroCalculator() {
  const [tdee, setTdee] = useState('')
  const [weight, setWeight] = useState('')
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg')
  const [goal, setGoal] = useState<Goal>('maintain')
  const [result, setResult] = useState<null | {
    calories: number
    protein: number
    fat: number
    carbs: number
  }>(null)

  function calculate() {
    let t = parseFloat(tdee)
    let w = parseFloat(weight)
    if (!t || !w) return

    if (unit === 'lbs') w = w * 0.453592

    const config = GOAL_CONFIG[goal]
    const calories = Math.round(t + config.calAdjust)
    const protein = Math.round(w * config.proteinRatio * 2.205) // g per lb
    const fat = Math.round((calories * config.fatRatio) / 9)
    const carbCals = calories - protein * 4 - fat * 9
    const carbs = Math.round(carbCals / 4)

    setResult({ calories, protein, fat, carbs: Math.max(0, carbs) })
  }

  const colorMap = { blue: 'border-blue-500/40 bg-blue-500/10 text-blue-400', orange: 'border-orange-500/40 bg-orange-500/10 text-orange-400', green: 'border-green-500/40 bg-green-500/10 text-green-400' }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      {/* Goal */}
      <div>
        <label className="mb-2 block text-sm text-zinc-400">Your Goal</label>
        <div className="grid grid-cols-3 gap-3">
          {(Object.keys(GOAL_CONFIG) as Goal[]).map((g) => (
            <button
              key={g}
              onClick={() => setGoal(g)}
              className={`rounded-lg border py-3 text-sm font-medium transition-colors ${
                goal === g
                  ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                  : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
              }`}
            >
              {GOAL_CONFIG[g].label}
            </button>
          ))}
        </div>
      </div>

      {/* TDEE */}
      <div>
        <label className="mb-1 block text-sm text-zinc-400">
          Your TDEE (kcal/day){' '}
          <a href="/tools/tdee-calculator" className="text-orange-400 hover:underline text-xs">
            Don't know it? Calculate here →
          </a>
        </label>
        <input
          type="number"
          value={tdee}
          onChange={(e) => setTdee(e.target.value)}
          placeholder="2500"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-600 focus:border-orange-500 focus:outline-none"
        />
      </div>

      {/* Weight */}
      <div>
        <label className="mb-1 block text-sm text-zinc-400">Your Weight</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder={unit === 'kg' ? '80' : '176'}
            className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-600 focus:border-orange-500 focus:outline-none"
          />
          <div className="flex rounded-lg border border-zinc-700 p-1">
            {(['kg', 'lbs'] as const).map((u) => (
              <button
                key={u}
                onClick={() => setUnit(u)}
                className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                  unit === u ? 'bg-orange-500 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full rounded-lg bg-orange-500 py-4 font-bold text-white transition-colors hover:bg-orange-400"
      >
        Calculate My Macros
      </button>

      {result && (
        <div className="mt-6 space-y-3">
          <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-4 text-center">
            <p className="text-sm text-zinc-500">Daily Calories ({GOAL_CONFIG[goal].label})</p>
            <p className="text-3xl font-extrabold text-white">{result.calories} <span className="text-base font-normal text-zinc-400">kcal</span></p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Protein', value: result.protein, cal: result.protein * 4, color: 'text-red-400', bg: 'border-red-500/30 bg-red-500/10' },
              { label: 'Carbs', value: result.carbs, cal: result.carbs * 4, color: 'text-yellow-400', bg: 'border-yellow-500/30 bg-yellow-500/10' },
              { label: 'Fat', value: result.fat, cal: result.fat * 9, color: 'text-blue-400', bg: 'border-blue-500/30 bg-blue-500/10' },
            ].map((m) => (
              <div key={m.label} className={`rounded-xl border p-4 text-center ${m.bg}`}>
                <p className={`text-xs font-semibold uppercase tracking-wide ${m.color}`}>{m.label}</p>
                <p className="mt-1 text-2xl font-bold text-white">{m.value}g</p>
                <p className="text-xs text-zinc-500">{m.cal} kcal</p>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-400">
            <p className="font-semibold text-white mb-1">Quick tips for {goal}:</p>
            {goal === 'cut' && <p>Prioritize protein to preserve muscle. Aim for 3-4 meals/day and track every meal.</p>}
            {goal === 'maintain' && <p>Hit your protein target daily. Adjust calories by ±100 based on weekly weight trend.</p>}
            {goal === 'bulk' && <p>Eat in a lean surplus. Track weekly weight — aim for 0.25-0.5kg gain per week.</p>}
          </div>
        </div>
      )}
    </div>
  )
}
