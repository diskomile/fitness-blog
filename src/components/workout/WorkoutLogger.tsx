'use client'

import { useState, useTransition } from 'react'
import { saveWorkoutSession } from '@/app/workout-log/actions'
import type { SetLog, PreviousLogs } from '@/app/workout-log/actions'

type Exercise = { name: string; sets: number; reps: string; muscle: string }

type Props = {
  planSlug: string
  dayLabel: string
  exercises: Exercise[]
  previousLogs: PreviousLogs
}

type SetInput = { weight: string; reps: string }

function initSets(exercises: Exercise[], previousLogs: PreviousLogs, dayLabel: string) {
  const state: Record<string, SetInput[]> = {}
  for (const ex of exercises) {
    const prev = previousLogs[dayLabel]?.[ex.name]
    if (prev?.sets?.length) {
      state[ex.name] = prev.sets.map((s) => ({ weight: String(s.weight || ''), reps: String(s.reps || '') }))
    } else {
      state[ex.name] = Array.from({ length: ex.sets }, () => ({ weight: '', reps: '' }))
    }
  }
  return state
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export default function WorkoutLogger({ planSlug, dayLabel, exercises, previousLogs }: Props) {
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const [logs, setLogs] = useState<Record<string, SetInput[]>>(() =>
    initSets(exercises, previousLogs, dayLabel)
  )

  function updateSet(exName: string, idx: number, field: 'weight' | 'reps', val: string) {
    setLogs((prev) => ({
      ...prev,
      [exName]: prev[exName].map((s, i) => (i === idx ? { ...s, [field]: val } : s)),
    }))
  }

  function addSet(exName: string) {
    setLogs((prev) => ({
      ...prev,
      [exName]: [...prev[exName], { weight: '', reps: '' }],
    }))
  }

  function removeSet(exName: string) {
    setLogs((prev) => {
      if (prev[exName].length <= 1) return prev
      return { ...prev, [exName]: prev[exName].slice(0, -1) }
    })
  }

  function handleSave() {
    startTransition(async () => {
      const exerciseLogs = exercises.map((ex) => ({
        exercise_name: ex.name,
        sets: logs[ex.name]
          .filter((s) => s.weight !== '' || s.reps !== '')
          .map((s) => ({
            weight: parseFloat(s.weight) || 0,
            reps: parseInt(s.reps) || 0,
          })) as SetLog[],
      }))
      await saveWorkoutSession(planSlug, dayLabel, exerciseLogs)
      setSaved(true)
      setTimeout(() => setSaved(false), 4000)
    })
  }

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-white">Log This Workout</h3>
        {saved && (
          <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
            ✓ Saved!
          </span>
        )}
      </div>

      {exercises.map((ex) => {
        const prev = previousLogs[dayLabel]?.[ex.name]
        const sets = logs[ex.name] ?? []

        return (
          <div key={ex.name} className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">
            <div className="mb-3 flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-white">{ex.name}</p>
                {prev ? (
                  <p className="mt-0.5 text-xs text-zinc-500">
                    Last {formatDate(prev.date)}:{' '}
                    {prev.sets.map((s) => `${s.weight}kg×${s.reps}`).join(', ')}
                  </p>
                ) : (
                  <p className="mt-0.5 text-xs text-zinc-600">No previous data</p>
                )}
              </div>
              <span className="shrink-0 rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
                {ex.muscle}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="grid grid-cols-[24px_1fr_1fr] gap-2 mb-1">
                <span />
                <span className="text-center text-xs text-zinc-600">kg</span>
                <span className="text-center text-xs text-zinc-600">reps</span>
              </div>
              {sets.map((set, i) => (
                <div key={i} className="grid grid-cols-[24px_1fr_1fr] items-center gap-2">
                  <span className="text-center text-xs text-zinc-600">{i + 1}</span>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    placeholder="—"
                    value={set.weight}
                    onChange={(e) => updateSet(ex.name, i, 'weight', e.target.value)}
                    className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-center text-sm text-white placeholder-zinc-600 focus:border-orange-500 focus:outline-none"
                  />
                  <input
                    type="number"
                    min="0"
                    placeholder="—"
                    value={set.reps}
                    onChange={(e) => updateSet(ex.name, i, 'reps', e.target.value)}
                    className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-center text-sm text-white placeholder-zinc-600 focus:border-orange-500 focus:outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="mt-2 flex gap-4">
              <button
                onClick={() => addSet(ex.name)}
                className="text-xs text-zinc-500 hover:text-white transition-colors"
              >
                + Add set
              </button>
              {sets.length > 1 && (
                <button
                  onClick={() => removeSet(ex.name)}
                  className="text-xs text-zinc-600 hover:text-red-400 transition-colors"
                >
                  − Remove
                </button>
              )}
            </div>
          </div>
        )
      })}

      <button
        onClick={handleSave}
        disabled={isPending}
        className="w-full rounded-xl bg-orange-500 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? 'Saving…' : 'Log Workout ✓'}
      </button>
    </div>
  )
}
