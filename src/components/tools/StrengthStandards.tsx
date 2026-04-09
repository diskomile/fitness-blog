'use client'

import { useState } from 'react'

type Gender = 'male' | 'female'
type Level = 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'elite'

type Standard = Record<Level, number>
type LiftStandards = Record<string, { male: Standard; female: Standard }>

// Standards in kg based on bodyweight ratio (approx. industry standards)
const STANDARDS: LiftStandards = {
  'Back Squat': {
    male:   { beginner: 0.75, novice: 1.25, intermediate: 1.75, advanced: 2.25, elite: 2.75 },
    female: { beginner: 0.5,  novice: 0.75, intermediate: 1.25, advanced: 1.75, elite: 2.25 },
  },
  'Bench Press': {
    male:   { beginner: 0.5,  novice: 0.75, intermediate: 1.25, advanced: 1.75, elite: 2.25 },
    female: { beginner: 0.25, novice: 0.5,  intermediate: 0.75, advanced: 1.25, elite: 1.5  },
  },
  'Deadlift': {
    male:   { beginner: 1.0,  novice: 1.5,  intermediate: 2.0,  advanced: 2.5,  elite: 3.0  },
    female: { beginner: 0.75, novice: 1.0,  intermediate: 1.5,  advanced: 2.0,  elite: 2.5  },
  },
  'Overhead Press': {
    male:   { beginner: 0.35, novice: 0.55, intermediate: 0.8,  advanced: 1.1,  elite: 1.4  },
    female: { beginner: 0.2,  novice: 0.35, intermediate: 0.55, advanced: 0.75, elite: 1.0  },
  },
  'Barbell Row': {
    male:   { beginner: 0.5,  novice: 0.75, intermediate: 1.25, advanced: 1.6,  elite: 2.0  },
    female: { beginner: 0.3,  novice: 0.5,  intermediate: 0.75, advanced: 1.1,  elite: 1.5  },
  },
}

const LEVELS: Level[] = ['beginner', 'novice', 'intermediate', 'advanced', 'elite']

const LEVEL_COLORS: Record<Level, string> = {
  beginner:     'bg-zinc-700 text-zinc-300',
  novice:       'bg-blue-900 text-blue-300',
  intermediate: 'bg-green-900 text-green-300',
  advanced:     'bg-orange-900 text-orange-300',
  elite:        'bg-red-900 text-red-300',
}

function getUserLevel(lift: number, bw: number, gender: Gender, liftName: string): Level {
  const standards = STANDARDS[liftName][gender]
  const ratio = lift / bw
  if (ratio >= standards.elite) return 'elite'
  if (ratio >= standards.advanced) return 'advanced'
  if (ratio >= standards.intermediate) return 'intermediate'
  if (ratio >= standards.novice) return 'novice'
  return 'beginner'
}

export default function StrengthStandards() {
  const [gender, setGender] = useState<Gender>('male')
  const [bodyweight, setBodyweight] = useState('')
  const [lifts, setLifts] = useState<Record<string, string>>({
    'Back Squat': '',
    'Bench Press': '',
    'Deadlift': '',
    'Overhead Press': '',
    'Barbell Row': '',
  })

  const bw = parseFloat(bodyweight)
  const hasBodyweight = bw > 0

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-4 font-bold text-white">Your Stats</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Gender */}
          <div>
            <label className="mb-1 block text-xs text-zinc-400">Gender</label>
            <div className="flex gap-2">
              {(['male', 'female'] as Gender[]).map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`flex-1 rounded-lg py-2 text-sm font-medium capitalize transition-colors ${
                    gender === g
                      ? 'bg-orange-500 text-white'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Bodyweight */}
          <div>
            <label className="mb-1 block text-xs text-zinc-400">Bodyweight (kg)</label>
            <input
              type="number"
              value={bodyweight}
              onChange={(e) => setBodyweight(e.target.value)}
              placeholder="e.g. 80"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-orange-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Lift inputs */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.keys(lifts).map((lift) => (
            <div key={lift}>
              <label className="mb-1 block text-xs text-zinc-400">{lift} 1RM (kg)</label>
              <input
                type="number"
                value={lifts[lift]}
                onChange={(e) => setLifts((prev) => ({ ...prev, [lift]: e.target.value }))}
                placeholder="optional"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-orange-500 focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Standards table */}
      {hasBodyweight && (
        <div className="space-y-4">
          {Object.keys(STANDARDS).map((liftName) => {
            const standards = STANDARDS[liftName][gender]
            const userLift = parseFloat(lifts[liftName])
            const hasLift = userLift > 0
            const userLevel = hasLift ? getUserLevel(userLift, bw, gender, liftName) : null

            return (
              <div key={liftName} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-bold text-white">{liftName}</h3>
                  {userLevel && (
                    <span className={`rounded-full px-3 py-0.5 text-xs font-bold capitalize ${LEVEL_COLORS[userLevel]}`}>
                      {userLevel}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-5 gap-1">
                  {LEVELS.map((level) => {
                    const kg = Math.round(standards[level] * bw)
                    const isUser = userLevel === level
                    const isPassed = hasLift && userLift >= standards[level] * bw
                    return (
                      <div
                        key={level}
                        className={`rounded-lg p-2 text-center transition-colors ${
                          isUser
                            ? 'border border-orange-500 bg-orange-500/10'
                            : isPassed
                            ? 'bg-zinc-800'
                            : 'bg-zinc-950'
                        }`}
                      >
                        <p className="text-xs capitalize text-zinc-500">{level}</p>
                        <p className={`mt-0.5 text-sm font-bold ${isPassed ? 'text-white' : 'text-zinc-600'}`}>
                          {kg}kg
                        </p>
                      </div>
                    )
                  })}
                </div>

                {hasLift && (
                  <p className="mt-2 text-xs text-zinc-500">
                    Your lift: <span className="text-white">{userLift}kg</span>
                    {' '}({(userLift / bw).toFixed(2)}× bodyweight)
                  </p>
                )}
              </div>
            )
          })}
        </div>
      )}

      {!hasBodyweight && (
        <div className="rounded-2xl border border-dashed border-zinc-700 p-8 text-center">
          <p className="text-zinc-500">Enter your bodyweight to see strength standards</p>
        </div>
      )}

      <p className="text-center text-xs text-zinc-600">
        Standards based on 1-rep max relative to bodyweight. Intermediate = 2+ years of consistent training.
      </p>
    </div>
  )
}
