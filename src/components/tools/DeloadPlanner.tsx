'use client'

import { useState } from 'react'

type TrainingAge = 'beginner' | 'intermediate' | 'advanced'
type Symptom = 'persistent_soreness' | 'strength_drop' | 'poor_sleep' | 'motivation_loss' | 'joint_pain' | 'plateau'

const SYMPTOM_LABELS: Record<Symptom, string> = {
  persistent_soreness: '😣 Persistent muscle soreness (3+ days)',
  strength_drop: '📉 Strength dropped on main lifts',
  poor_sleep: '😴 Poor sleep / waking up tired',
  motivation_loss: '😐 Lost motivation to train',
  joint_pain: '🦴 Joint pain or nagging injuries',
  plateau: '📊 Progress stalled for 3+ weeks',
}

type DeloadProtocol = {
  name: string
  description: string
  weekPlan: { day: string; instructions: string }[]
  suitable: string
}

const PROTOCOLS: Record<TrainingAge, DeloadProtocol> = {
  beginner: {
    name: 'Active Rest Week',
    description: 'Beginners recover faster — a full week of light activity is usually enough.',
    suitable: 'Best for: <1 year training, mild fatigue',
    weekPlan: [
      { day: 'Monday', instructions: 'Light walk or bodyweight mobility (20–30 min). No lifting.' },
      { day: 'Tuesday', instructions: 'Rest or yoga/stretching.' },
      { day: 'Wednesday', instructions: 'Light bodyweight work: push-ups, air squats, band pull-aparts. 2×10–15, very easy.' },
      { day: 'Thursday', instructions: 'Rest or light cardio (cycling, walking).' },
      { day: 'Friday', instructions: 'Mobility and foam rolling. 20 min.' },
      { day: 'Saturday', instructions: 'Optional: recreational activity (swimming, hiking). Keep it fun.' },
      { day: 'Sunday', instructions: 'Full rest. Sleep in.' },
    ],
  },
  intermediate: {
    name: 'Volume Deload',
    description: 'Keep intensity (weight on bar) but cut volume by 40–50%. Maintains neural adaptations while reducing fatigue.',
    suitable: 'Best for: 1–3 years training, moderate fatigue',
    weekPlan: [
      { day: 'Monday', instructions: 'Upper body: same weights as normal, but 2 sets instead of 4. Stop 3–4 reps before failure.' },
      { day: 'Tuesday', instructions: 'Rest or light cardio (20 min walk/bike).' },
      { day: 'Wednesday', instructions: 'Lower body: same weights, 2 sets instead of 4. No pushing to failure.' },
      { day: 'Thursday', instructions: 'Rest.' },
      { day: 'Friday', instructions: 'Full body: 1–2 sets of main movements only. In and out in 30 min.' },
      { day: 'Saturday', instructions: 'Light activity or rest.' },
      { day: 'Sunday', instructions: 'Full rest.' },
    ],
  },
  advanced: {
    name: 'Intensity + Volume Deload',
    description: 'Reduce both weight (10–20%) AND volume (50%). Advanced lifters accumulate more systemic fatigue that requires a deeper deload.',
    suitable: 'Best for: 3+ years training, high fatigue, peaking cycles',
    weekPlan: [
      { day: 'Monday', instructions: 'Upper: drop weight by 15–20%, 2 sets per exercise. Focus on technique and bar speed.' },
      { day: 'Tuesday', instructions: 'Mobility work, foam rolling, light cardio. 30 min max.' },
      { day: 'Wednesday', instructions: 'Lower: drop weight 15–20%, 2 sets. Pause reps for quality — not load.' },
      { day: 'Thursday', instructions: 'Complete rest. Prioritise sleep and nutrition.' },
      { day: 'Friday', instructions: 'Optional full-body: 1 set of 5–6 key movements at 60–65% 1RM. Technical focus only.' },
      { day: 'Saturday', instructions: 'Light recreational activity or rest.' },
      { day: 'Sunday', instructions: 'Full rest. Extra sleep is training.' },
    ],
  },
}

function getDeloadScore(symptoms: Symptom[], weeksSinceDeload: number, trainingAge: TrainingAge): number {
  let score = symptoms.length * 15
  const recommended = trainingAge === 'beginner' ? 8 : trainingAge === 'intermediate' ? 6 : 4
  if (weeksSinceDeload > recommended) score += Math.min(40, (weeksSinceDeload - recommended) * 5)
  return Math.min(100, score)
}

export default function DeloadPlanner() {
  const [trainingAge, setTrainingAge] = useState<TrainingAge>('intermediate')
  const [weeksSince, setWeeksSince] = useState('')
  const [symptoms, setSymptoms] = useState<Symptom[]>([])
  const [showPlan, setShowPlan] = useState(false)

  const toggleSymptom = (s: Symptom) => {
    setSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  const weeks = parseInt(weeksSince) || 0
  const score = getDeloadScore(symptoms, weeks, trainingAge)
  const protocol = PROTOCOLS[trainingAge]

  const recommended = trainingAge === 'beginner' ? 8 : trainingAge === 'intermediate' ? 6 : 4
  const needsDeload = score >= 40
  const urgency = score >= 70 ? 'high' : score >= 40 ? 'medium' : 'low'

  const urgencyConfig = {
    high:   { label: 'Deload NOW', color: 'text-red-400', bg: 'border-red-800 bg-red-900/20' },
    medium: { label: 'Deload this week', color: 'text-yellow-400', bg: 'border-yellow-800 bg-yellow-900/20' },
    low:    { label: 'No deload needed yet', color: 'text-green-400', bg: 'border-green-800 bg-green-900/20' },
  }

  const config = urgencyConfig[urgency]

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-4 font-bold text-white">Your Training Status</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-zinc-400">Training experience</label>
            <div className="flex flex-col gap-2">
              {([
                ['beginner', '🌱 Beginner (<1 year)'],
                ['intermediate', '💪 Intermediate (1–3 years)'],
                ['advanced', '🏆 Advanced (3+ years)'],
              ] as [TrainingAge, string][]).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setTrainingAge(val)}
                  className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    trainingAge === val ? 'bg-orange-500 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs text-zinc-400">
              Weeks since last deload (recommended: every {recommended} weeks)
            </label>
            <input
              type="number"
              value={weeksSince}
              onChange={(e) => setWeeksSince(e.target.value)}
              placeholder={`e.g. ${recommended + 2}`}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-orange-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Symptoms */}
        <div className="mt-4">
          <label className="mb-2 block text-xs text-zinc-400">Symptoms you&apos;re experiencing (select all that apply)</label>
          <div className="grid gap-2 sm:grid-cols-2">
            {(Object.keys(SYMPTOM_LABELS) as Symptom[]).map((s) => (
              <button
                key={s}
                onClick={() => toggleSymptom(s)}
                className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  symptoms.includes(s) ? 'bg-orange-500/20 border border-orange-500 text-orange-300' : 'bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white'
                }`}
              >
                {SYMPTOM_LABELS[s]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result */}
      {(weeks > 0 || symptoms.length > 0) && (
        <>
          <div className={`rounded-2xl border p-5 ${config.bg}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xl font-extrabold ${config.color}`}>{config.label}</p>
                <p className="mt-1 text-sm text-zinc-400">
                  Fatigue score: <span className="font-bold text-white">{score}/100</span>
                  {symptoms.length > 0 && ` · ${symptoms.length} symptom${symptoms.length > 1 ? 's' : ''} detected`}
                </p>
              </div>
              {needsDeload && (
                <button
                  onClick={() => setShowPlan(!showPlan)}
                  className="shrink-0 rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-400 transition-colors"
                >
                  {showPlan ? 'Hide plan' : 'Show plan'}
                </button>
              )}
            </div>

            {/* Score bar */}
            <div className="mt-3 h-2 w-full rounded-full bg-zinc-800">
              <div
                className={`h-2 rounded-full transition-all ${score >= 70 ? 'bg-red-500' : score >= 40 ? 'bg-yellow-500' : 'bg-green-500'}`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>

          {/* Deload plan */}
          {needsDeload && showPlan && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                <h3 className="font-bold text-white">{protocol.name}</h3>
                <p className="mt-1 text-sm text-zinc-400">{protocol.description}</p>
                <p className="mt-1 text-xs text-zinc-600">{protocol.suitable}</p>
              </div>

              <div className="space-y-2">
                {protocol.weekPlan.map((day) => (
                  <div key={day.day} className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                    <div className="w-24 shrink-0">
                      <p className="text-sm font-bold text-orange-400">{day.day}</p>
                    </div>
                    <p className="text-sm text-zinc-400">{day.instructions}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-zinc-700 bg-zinc-900/50 p-4">
                <p className="text-sm font-semibold text-white">After your deload:</p>
                <ul className="mt-2 space-y-1 text-xs text-zinc-400">
                  <li>• Expect to feel stronger in week 1 back — this is normal (supercompensation)</li>
                  <li>• Return to your previous weights, don&apos;t start light</li>
                  <li>• Schedule your next deload in {recommended} weeks</li>
                </ul>
              </div>
            </div>
          )}

          {!needsDeload && (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-center">
              <p className="text-sm text-zinc-400">
                Keep training. Next recommended deload: in ~<span className="text-white font-semibold">{Math.max(0, recommended - weeks)} weeks</span>.
              </p>
            </div>
          )}
        </>
      )}

      {weeks === 0 && symptoms.length === 0 && (
        <div className="rounded-2xl border border-dashed border-zinc-700 p-8 text-center">
          <p className="text-zinc-500">Enter your training status to get a recommendation</p>
        </div>
      )}
    </div>
  )
}
