'use client'

import { useState } from 'react'

const PERCENTAGES = [100, 95, 90, 85, 80, 75, 70, 65, 60]
const REP_RANGES = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12]

const LIFTS = ['Squat', 'Bench Press', 'Deadlift', 'Overhead Press', 'Barbell Row']

export default function OneRepMaxCalculator() {
  const [lift, setLift] = useState('Squat')
  const [weight, setWeight] = useState('')
  const [reps, setReps] = useState('5')
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg')
  const [result, setResult] = useState<null | number>(null)

  function calculate() {
    const w = parseFloat(weight)
    const r = parseInt(reps)
    if (!w || !r || r < 1) return
    // Epley formula
    const orm = r === 1 ? w : w * (1 + r / 30)
    setResult(Math.round(orm * 10) / 10)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      {/* Lift selector */}
      <div>
        <label className="mb-2 block text-sm text-zinc-400">Exercise</label>
        <div className="flex flex-wrap gap-2">
          {LIFTS.map((l) => (
            <button
              key={l}
              onClick={() => setLift(l)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                lift === l
                  ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                  : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Weight */}
        <div>
          <label className="mb-1 block text-sm text-zinc-400">Weight Lifted</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="100"
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

        {/* Reps */}
        <div>
          <label className="mb-1 block text-sm text-zinc-400">Reps Performed</label>
          <select
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white focus:border-orange-500 focus:outline-none"
          >
            {REP_RANGES.map((r) => (
              <option key={r} value={r}>
                {r} {r === 1 ? 'rep' : 'reps'}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full rounded-lg bg-orange-500 py-4 font-bold text-white transition-colors hover:bg-orange-400"
      >
        Calculate 1RM
      </button>

      {result && (
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-orange-500/50 bg-orange-500/10 p-6 text-center">
            <p className="text-sm text-zinc-400">{lift} — Estimated 1 Rep Max</p>
            <p className="mt-1 text-5xl font-extrabold text-white">
              {result}
              <span className="ml-2 text-2xl font-normal text-zinc-400">{unit}</span>
            </p>
          </div>

          {/* Percentage table */}
          <div className="overflow-hidden rounded-xl border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900">
                  <th className="px-4 py-3 text-left text-zinc-400">% of 1RM</th>
                  <th className="px-4 py-3 text-left text-zinc-400">Weight ({unit})</th>
                  <th className="px-4 py-3 text-left text-zinc-400">Rep range</th>
                </tr>
              </thead>
              <tbody>
                {PERCENTAGES.map((pct, i) => {
                  const repRanges = ['1', '2', '3', '4-5', '5-6', '6-8', '8-10', '10-12', '12-15']
                  return (
                    <tr
                      key={pct}
                      className={`border-b border-zinc-800/50 ${pct === 100 ? 'bg-orange-500/10' : i % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-950'}`}
                    >
                      <td className={`px-4 py-3 font-semibold ${pct === 100 ? 'text-orange-400' : 'text-white'}`}>
                        {pct}%
                      </td>
                      <td className="px-4 py-3 text-zinc-300">
                        {Math.round((result * pct) / 100 * 10) / 10}
                      </td>
                      <td className="px-4 py-3 text-zinc-500">{repRanges[i]}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
