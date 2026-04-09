'use client'

import { useState } from 'react'

type Goal = 'cut' | 'bulk'

export default function BulkCutTimeline() {
  const [goal, setGoal] = useState<Goal>('cut')
  const [currentWeight, setCurrentWeight] = useState('')
  const [targetWeight, setTargetWeight] = useState('')
  const [targetDate, setTargetDate] = useState('')

  const cw = parseFloat(currentWeight)
  const tw = parseFloat(targetWeight)
  const diff = Math.abs(tw - cw)

  let weeks = 0
  let dailyCalories = 0
  let weeklyChange = 0
  let feasible = true
  let warning = ''

  if (cw > 0 && tw > 0 && targetDate) {
    const today = new Date()
    const end = new Date(targetDate)
    weeks = Math.max(1, Math.round((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 7)))
    weeklyChange = diff / weeks

    if (goal === 'cut') {
      if (weeklyChange > 1.0) {
        feasible = false
        warning = 'Too aggressive — max safe fat loss is ~0.5–1% of bodyweight per week.'
      } else if (weeklyChange > 0.75) {
        warning = 'Aggressive cut — achievable but you may lose some muscle. Prioritise protein (2.2g/kg).'
      }
      // ~7700 kcal per kg of fat
      dailyCalories = Math.round((weeklyChange * 7700) / 7)
    } else {
      if (weeklyChange > 0.5) {
        feasible = false
        warning = 'Too aggressive — max lean muscle gain is ~0.25–0.5kg/week for most people.'
      }
      dailyCalories = Math.round((weeklyChange * 7700) / 7)
    }
  }

  const hasResult = cw > 0 && tw > 0 && targetDate && weeks > 0

  // Generate monthly milestones
  const milestones: { month: string; weight: number }[] = []
  if (hasResult) {
    const kgPerWeek = goal === 'cut' ? -weeklyChange : weeklyChange
    for (let w = 0; w <= weeks; w += 4) {
      const d = new Date()
      d.setDate(d.getDate() + w * 7)
      milestones.push({
        month: d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        weight: Math.round((cw + kgPerWeek * w) * 10) / 10,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-4 font-bold text-white">Your Goal</h2>

        {/* Goal toggle */}
        <div className="mb-4 flex gap-2">
          {(['cut', 'bulk'] as Goal[]).map((g) => (
            <button
              key={g}
              onClick={() => setGoal(g)}
              className={`flex-1 rounded-lg py-2 text-sm font-bold capitalize transition-colors ${
                goal === g ? 'bg-orange-500 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {g === 'cut' ? '🔥 Cut' : '💪 Bulk'}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs text-zinc-400">Current weight (kg)</label>
            <input
              type="number"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(e.target.value)}
              placeholder="e.g. 85"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-orange-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-400">Target weight (kg)</label>
            <input
              type="number"
              value={targetWeight}
              onChange={(e) => setTargetWeight(e.target.value)}
              placeholder="e.g. 78"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-orange-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-400">Target date</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {hasResult && (
        <>
          {/* Warning / feasibility */}
          {warning && (
            <div className={`rounded-xl border p-4 ${feasible ? 'border-yellow-700 bg-yellow-900/30 text-yellow-300' : 'border-red-700 bg-red-900/30 text-red-300'}`}>
              <p className="text-sm">{feasible ? '⚠️' : '❌'} {warning}</p>
            </div>
          )}

          {/* Result cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-center">
              <p className="text-3xl font-extrabold text-orange-400">{weeks}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-zinc-400">Weeks</p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-center">
              <p className="text-3xl font-extrabold text-white">{weeklyChange.toFixed(2)}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-zinc-400">kg / week</p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-center">
              <p className={`text-3xl font-extrabold ${goal === 'cut' ? 'text-blue-400' : 'text-green-400'}`}>
                {goal === 'cut' ? '-' : '+'}{dailyCalories}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-zinc-400">kcal / day {goal === 'cut' ? 'deficit' : 'surplus'}</p>
            </div>
          </div>

          {/* Timeline milestones */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <h3 className="mb-4 font-bold text-white">Monthly Milestones</h3>
            <div className="space-y-2">
              {milestones.map((m, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400">{m.month}</span>
                  <div className="mx-4 h-px flex-1 border-t border-dashed border-zinc-800" />
                  <span className={`text-sm font-bold ${i === milestones.length - 1 ? 'text-orange-400' : 'text-white'}`}>
                    {m.weight} kg
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-zinc-600">
            Based on ~7,700 kcal per kg of body mass change. Individual results vary based on metabolism and training.
          </p>
        </>
      )}

      {!hasResult && (
        <div className="rounded-2xl border border-dashed border-zinc-700 p-8 text-center">
          <p className="text-zinc-500">Fill in all fields to see your timeline</p>
        </div>
      )}
    </div>
  )
}
