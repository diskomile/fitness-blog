'use client'

import { useState } from 'react'

type Unit = 'metric' | 'imperial'

type Category = {
  label: string
  range: string
  color: string
  advice: string
}

const CATEGORIES: Category[] = [
  { label: 'Underweight',      range: '< 18.5',   color: 'text-blue-400',   advice: 'Focus on a caloric surplus with nutrient-dense foods. Consider consulting a dietitian.' },
  { label: 'Normal weight',    range: '18.5–24.9', color: 'text-green-400',  advice: 'Great range. Maintain with balanced nutrition and regular training.' },
  { label: 'Overweight',       range: '25–29.9',   color: 'text-yellow-400', advice: 'A moderate caloric deficit (300–500 kcal/day) with strength training works well.' },
  { label: 'Obese (Class I)',  range: '30–34.9',   color: 'text-orange-400', advice: 'Prioritise sustainable habits over crash diets. Strength training preserves muscle.' },
  { label: 'Obese (Class II)', range: '35–39.9',   color: 'text-red-400',   advice: 'Consider working with a healthcare professional for a structured plan.' },
  { label: 'Obese (Class III)',range: '≥ 40',      color: 'text-red-600',   advice: 'Medical guidance is recommended alongside lifestyle changes.' },
]

function getCategory(bmi: number): Category {
  if (bmi < 18.5) return CATEGORIES[0]
  if (bmi < 25)   return CATEGORIES[1]
  if (bmi < 30)   return CATEGORIES[2]
  if (bmi < 35)   return CATEGORIES[3]
  if (bmi < 40)   return CATEGORIES[4]
  return CATEGORIES[5]
}

function getPointerPercent(bmi: number): number {
  // Scale: 15 = 0%, 40 = 100%
  return Math.min(100, Math.max(0, ((bmi - 15) / 25) * 100))
}

export default function BmiCalculator() {
  const [unit, setUnit] = useState<Unit>('metric')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [heightFt, setHeightFt] = useState('')
  const [heightIn, setHeightIn] = useState('')
  const [weightLbs, setWeightLbs] = useState('')

  let bmi: number | null = null

  if (unit === 'metric') {
    const w = parseFloat(weight)
    const h = parseFloat(height) / 100
    if (w > 0 && h > 0) bmi = w / (h * h)
  } else {
    const w = parseFloat(weightLbs)
    const h = (parseFloat(heightFt) * 12) + parseFloat(heightIn || '0')
    if (w > 0 && h > 0) bmi = (w / (h * h)) * 703
  }

  const category = bmi !== null ? getCategory(bmi) : null
  const pointer = bmi !== null ? getPointerPercent(bmi) : null

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="mb-4 flex gap-2">
          {(['metric', 'imperial'] as Unit[]).map((u) => (
            <button key={u} onClick={() => setUnit(u)}
              className={`flex-1 rounded-lg py-2 text-sm font-medium capitalize transition-colors ${unit === u ? 'bg-orange-500 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'}`}>
              {u}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {unit === 'metric' ? (
            <>
              <div>
                <label className="mb-1 block text-xs text-zinc-400">Weight (kg)</label>
                <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="e.g. 80"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-orange-500 focus:outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-zinc-400">Height (cm)</label>
                <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="e.g. 178"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-orange-500 focus:outline-none" />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="mb-1 block text-xs text-zinc-400">Weight (lbs)</label>
                <input type="number" value={weightLbs} onChange={e => setWeightLbs(e.target.value)} placeholder="e.g. 176"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-orange-500 focus:outline-none" />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="mb-1 block text-xs text-zinc-400">Height (ft)</label>
                  <input type="number" value={heightFt} onChange={e => setHeightFt(e.target.value)} placeholder="5"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-orange-500 focus:outline-none" />
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-xs text-zinc-400">Height (in)</label>
                  <input type="number" value={heightIn} onChange={e => setHeightIn(e.target.value)} placeholder="10"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-orange-500 focus:outline-none" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {bmi !== null && category !== null && pointer !== null && (
        <>
          {/* Result */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center">
            <p className="text-sm text-zinc-400">Your BMI</p>
            <p className={`text-6xl font-extrabold ${category.color}`}>{bmi.toFixed(1)}</p>
            <p className={`mt-1 text-lg font-bold ${category.color}`}>{category.label}</p>

            {/* Gauge */}
            <div className="mt-4 px-4">
              <div className="relative h-3 w-full overflow-hidden rounded-full"
                style={{ background: 'linear-gradient(to right, #60a5fa, #4ade80, #facc15, #fb923c, #f87171, #dc2626)' }}>
                <div className="absolute top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-white shadow-lg transition-all"
                  style={{ left: `calc(${pointer}% - 2px)` }} />
              </div>
              <div className="mt-1 flex justify-between text-xs text-zinc-600">
                <span>15</span><span>18.5</span><span>25</span><span>30</span><span>40+</span>
              </div>
            </div>

            <p className="mt-4 text-sm text-zinc-400">{category.advice}</p>
          </div>

          {/* Category table */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <h3 className="mb-3 text-sm font-bold text-white">BMI Categories</h3>
            <div className="space-y-2">
              {CATEGORIES.map((cat) => (
                <div key={cat.label} className={`flex items-center justify-between rounded-lg px-3 py-2 ${cat.label === category.label ? 'bg-zinc-800' : ''}`}>
                  <span className={`text-sm font-medium ${cat.color}`}>{cat.label}</span>
                  <span className="text-xs text-zinc-500">{cat.range}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-zinc-600">
            BMI is a screening tool, not a diagnostic measure. It doesn&apos;t account for muscle mass, bone density, or body composition.
          </p>
        </>
      )}

      {bmi === null && (
        <div className="rounded-2xl border border-dashed border-zinc-700 p-8 text-center">
          <p className="text-zinc-500">Enter your weight and height to calculate BMI</p>
        </div>
      )}
    </div>
  )
}
