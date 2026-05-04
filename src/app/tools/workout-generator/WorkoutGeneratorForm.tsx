'use client'

import { useState } from 'react'
import { generateWorkoutPlan, type GeneratorInput, type GeneratedPlan } from './actions'
import ExerciseHowToModal from '@/components/workout/ExerciseHowToModal'

const OPTIONS = {
  gender: [
    { value: 'male', label: 'Male', icon: '♂' },
    { value: 'female', label: 'Female', icon: '♀' },
  ],
  goal: [
    { value: 'muscle', label: 'Build Muscle', icon: '💪' },
    { value: 'fat-loss', label: 'Lose Fat', icon: '🔥' },
    { value: 'strength', label: 'Get Stronger', icon: '⚡' },
    { value: 'conditioning', label: 'Conditioning', icon: '🏃' },
  ],
  level: [
    { value: 'beginner', label: 'Beginner', icon: '🌱' },
    { value: 'intermediate', label: 'Intermediate', icon: '💪' },
    { value: 'advanced', label: 'Advanced', icon: '🏆' },
  ],
  equipment: [
    { value: 'gym', label: 'Full Gym', icon: '🏋️' },
    { value: 'home', label: 'Home (dumbbells)', icon: '🏠' },
    { value: 'bodyweight', label: 'No Equipment', icon: '🤸' },
  ],
  daysPerWeek: [
    { value: '3', label: '3 days', icon: '📅' },
    { value: '4', label: '4 days', icon: '📅' },
    { value: '5', label: '5 days', icon: '📅' },
  ],
}

function OptionCard({ value, label, icon, selected, onClick }: {
  value: string; label: string; icon: string; selected: boolean; onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 rounded-xl border p-4 text-sm font-semibold transition-all ${
        selected
          ? 'border-orange-500 bg-orange-500/10 text-orange-400'
          : 'border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-500 hover:text-white'
      }`}
    >
      <span className="text-2xl">{icon}</span>
      {label}
    </button>
  )
}

export default function WorkoutGeneratorForm() {
  const [form, setForm] = useState<GeneratorInput>({
    gender: 'male',
    goal: 'muscle',
    level: 'beginner',
    equipment: 'gym',
    daysPerWeek: '3',
  })
  const [plan, setPlan] = useState<GeneratedPlan | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setPlan(null)

    const result = await generateWorkoutPlan(form)
    if (result) {
      setPlan(result)
    } else {
      setError('Failed to generate plan. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Gender */}
        <div>
          <p className="mb-3 text-sm font-semibold text-zinc-400 uppercase tracking-wider">Gender</p>
          <div className="grid grid-cols-2 gap-3">
            {OPTIONS.gender.map(o => (
              <OptionCard key={o.value} {...o} selected={form.gender === o.value}
                onClick={() => setForm(f => ({ ...f, gender: o.value as GeneratorInput['gender'] }))} />
            ))}
          </div>
        </div>

        {/* Goal */}
        <div>
          <p className="mb-3 text-sm font-semibold text-zinc-400 uppercase tracking-wider">Goal</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {OPTIONS.goal.map(o => (
              <OptionCard key={o.value} {...o} selected={form.goal === o.value}
                onClick={() => setForm(f => ({ ...f, goal: o.value as GeneratorInput['goal'] }))} />
            ))}
          </div>
        </div>

        {/* Level */}
        <div>
          <p className="mb-3 text-sm font-semibold text-zinc-400 uppercase tracking-wider">Fitness Level</p>
          <div className="grid grid-cols-3 gap-3">
            {OPTIONS.level.map(o => (
              <OptionCard key={o.value} {...o} selected={form.level === o.value}
                onClick={() => setForm(f => ({ ...f, level: o.value as GeneratorInput['level'] }))} />
            ))}
          </div>
        </div>

        {/* Equipment */}
        <div>
          <p className="mb-3 text-sm font-semibold text-zinc-400 uppercase tracking-wider">Equipment</p>
          <div className="grid grid-cols-3 gap-3">
            {OPTIONS.equipment.map(o => (
              <OptionCard key={o.value} {...o} selected={form.equipment === o.value}
                onClick={() => setForm(f => ({ ...f, equipment: o.value as GeneratorInput['equipment'] }))} />
            ))}
          </div>
        </div>

        {/* Days per week */}
        <div>
          <p className="mb-3 text-sm font-semibold text-zinc-400 uppercase tracking-wider">Days per Week</p>
          <div className="grid grid-cols-3 gap-3">
            {OPTIONS.daysPerWeek.map(o => (
              <OptionCard key={o.value} {...o} selected={form.daysPerWeek === o.value}
                onClick={() => setForm(f => ({ ...f, daysPerWeek: o.value as GeneratorInput['daysPerWeek'] }))} />
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-orange-500 py-4 text-base font-extrabold text-white transition-colors hover:bg-orange-400 disabled:opacity-60"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
              Generating your plan...
            </span>
          ) : 'Generate My Plan →'}
        </button>
      </form>

      {error && (
        <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Generated Plan */}
      {plan && (
        <div className="mt-10">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-white">{plan.name}</h2>
            <p className="mt-2 text-zinc-400">{plan.description}</p>
          </div>

          <div className="space-y-6">
            {plan.days.map((day) => (
              <div key={day.label} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-lg border border-orange-400/20 bg-orange-400/10 px-2 py-1 text-xs font-bold text-orange-400">
                    {day.label}
                  </span>
                  <h3 className="font-bold text-white">{day.focus}</h3>
                </div>

                <div className="space-y-3">
                  {day.exercises.map((ex, i) => (
                    <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-white">{ex.name}</p>
                          <p className="mt-0.5 text-xs text-zinc-500">{ex.muscle}</p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-sm font-bold text-orange-400">{ex.sets} × {ex.reps}</p>
                          <p className="text-xs text-zinc-500">sets × reps</p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-start justify-between gap-3">
                        <p className="text-xs text-zinc-400">💡 {ex.tip}</p>
                        <ExerciseHowToModal
                          name={ex.name}
                          muscle={ex.muscle}
                          tip={ex.tip}
                          image1={ex.image1}
                          image2={ex.image2}
                          description={ex.description}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-xs text-zinc-500">
            This plan was generated by AI based on your inputs. Consult a fitness professional before starting any new exercise programme.
          </div>
        </div>
      )}
    </div>
  )
}
