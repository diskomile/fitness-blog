'use client'

import { useState } from 'react'

type Zone = {
  name: string
  range: [number, number]
  description: string
  benefit: string
  color: string
}

function getZones(maxHR: number): Zone[] {
  return [
    {
      name: 'Zone 1 — Recovery',
      range: [Math.round(maxHR * 0.5), Math.round(maxHR * 0.6)],
      description: '50–60% max HR',
      benefit: 'Active recovery, warm-up/cool-down. Very easy effort.',
      color: 'bg-blue-900 border-blue-700 text-blue-300',
    },
    {
      name: 'Zone 2 — Fat Burn',
      range: [Math.round(maxHR * 0.6), Math.round(maxHR * 0.7)],
      description: '60–70% max HR',
      benefit: 'Aerobic base, fat oxidation. Easy conversational pace.',
      color: 'bg-green-900 border-green-700 text-green-300',
    },
    {
      name: 'Zone 3 — Aerobic',
      range: [Math.round(maxHR * 0.7), Math.round(maxHR * 0.8)],
      description: '70–80% max HR',
      benefit: 'Improves cardiovascular efficiency. Moderate effort.',
      color: 'bg-yellow-900 border-yellow-700 text-yellow-300',
    },
    {
      name: 'Zone 4 — Threshold',
      range: [Math.round(maxHR * 0.8), Math.round(maxHR * 0.9)],
      description: '80–90% max HR',
      benefit: 'Raises lactate threshold. Hard effort, breathing heavy.',
      color: 'bg-orange-900 border-orange-700 text-orange-300',
    },
    {
      name: 'Zone 5 — Max',
      range: [Math.round(maxHR * 0.9), maxHR],
      description: '90–100% max HR',
      benefit: 'Max speed and power. Sprints, HIIT intervals only.',
      color: 'bg-red-900 border-red-700 text-red-300',
    },
  ]
}

export default function HeartRateZones() {
  const [age, setAge] = useState('')
  const [method, setMethod] = useState<'formula' | 'manual'>('formula')
  const [manualMax, setManualMax] = useState('')

  const ageNum = parseInt(age)
  const formulaMax = ageNum > 0 ? 220 - ageNum : 0
  const maxHR = method === 'formula' ? formulaMax : parseInt(manualMax) || 0

  const zones = maxHR > 0 ? getZones(maxHR) : []

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-4 font-bold text-white">Your Heart Rate</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-zinc-400">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g. 28"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-zinc-400">Max HR method</label>
            <div className="flex gap-2">
              <button
                onClick={() => setMethod('formula')}
                className={`flex-1 rounded-lg py-2 text-xs font-medium transition-colors ${
                  method === 'formula' ? 'bg-orange-500 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                Formula (220 − age)
              </button>
              <button
                onClick={() => setMethod('manual')}
                className={`flex-1 rounded-lg py-2 text-xs font-medium transition-colors ${
                  method === 'manual' ? 'bg-orange-500 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                Enter manually
              </button>
            </div>
          </div>
        </div>

        {method === 'manual' && (
          <div className="mt-4">
            <label className="mb-1 block text-xs text-zinc-400">Your max heart rate (bpm)</label>
            <input
              type="number"
              value={manualMax}
              onChange={(e) => setManualMax(e.target.value)}
              placeholder="e.g. 192"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-orange-500 focus:outline-none"
            />
            <p className="mt-1 text-xs text-zinc-600">
              Find your true max HR by running all-out for 3 min, then sprinting for 30 sec.
            </p>
          </div>
        )}

        {maxHR > 0 && (
          <div className="mt-4 rounded-lg bg-zinc-800 px-4 py-2 text-center">
            <span className="text-sm text-zinc-400">Estimated max HR: </span>
            <span className="text-lg font-bold text-orange-400">{maxHR} bpm</span>
          </div>
        )}
      </div>

      {zones.length > 0 && (
        <div className="space-y-3">
          {zones.map((zone, i) => (
            <div key={i} className={`rounded-2xl border p-4 ${zone.color}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-bold">{zone.name}</p>
                  <p className="mt-0.5 text-xs opacity-70">{zone.benefit}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xl font-extrabold">{zone.range[0]}–{zone.range[1]}</p>
                  <p className="text-xs opacity-70">bpm</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!maxHR && (
        <div className="rounded-2xl border border-dashed border-zinc-700 p-8 text-center">
          <p className="text-zinc-500">Enter your age to calculate heart rate zones</p>
        </div>
      )}
    </div>
  )
}
