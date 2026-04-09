'use client'

import { useState, useTransition } from 'react'
import { deleteMeasurement, type Measurement } from '@/app/measurements/actions'

type Props = { measurements: Measurement[] }

const DISPLAY_FIELDS: { key: keyof Measurement; label: string; unit: string }[] = [
  { key: 'weight_kg',      label: 'Weight',      unit: 'kg' },
  { key: 'body_fat_pct',   label: 'Body Fat',    unit: '%'  },
  { key: 'chest_cm',       label: 'Chest',       unit: 'cm' },
  { key: 'waist_cm',       label: 'Waist',       unit: 'cm' },
  { key: 'hips_cm',        label: 'Hips',        unit: 'cm' },
  { key: 'neck_cm',        label: 'Neck',        unit: 'cm' },
  { key: 'left_arm_cm',    label: 'L Arm',       unit: 'cm' },
  { key: 'right_arm_cm',   label: 'R Arm',       unit: 'cm' },
  { key: 'left_thigh_cm',  label: 'L Thigh',     unit: 'cm' },
  { key: 'right_thigh_cm', label: 'R Thigh',     unit: 'cm' },
]

function getDelta(current: number | null, previous: number | null, lowerIsBetter = false) {
  if (current === null || previous === null) return null
  const diff = current - previous
  if (Math.abs(diff) < 0.05) return null
  const positive = lowerIsBetter ? diff < 0 : diff > 0
  return { diff, positive }
}

export default function MeasurementHistory({ measurements }: Props) {
  const [isPending, startTransition] = useTransition()
  const [expanded, setExpanded] = useState<string | null>(null)

  const sorted = [...measurements].sort((a, b) => b.measured_at.localeCompare(a.measured_at))

  if (sorted.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-700 p-8 text-center">
        <p className="text-zinc-500">No measurements yet. Log your first one above.</p>
      </div>
    )
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      await deleteMeasurement(id)
    })
  }

  return (
    <div className="space-y-3">
      <h2 className="font-bold text-white">History</h2>
      {sorted.map((m, i) => {
        const prev = sorted[i + 1] ?? null
        const isOpen = expanded === m.id

        return (
          <div key={m.id} className="rounded-2xl border border-zinc-800 bg-zinc-900">
            {/* Header row */}
            <button
              onClick={() => setExpanded(isOpen ? null : m.id)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
              <div>
                <p className="font-semibold text-white">
                  {new Date(m.measured_at + 'T12:00:00').toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
                </p>
                <div className="mt-0.5 flex flex-wrap gap-3 text-xs text-zinc-500">
                  {m.weight_kg !== null && (
                    <span>
                      ⚖️ <span className="text-zinc-300">{m.weight_kg}kg</span>
                      {(() => {
                        const d = getDelta(m.weight_kg, prev?.weight_kg ?? null, true)
                        if (!d) return null
                        return (
                          <span className={d.positive ? 'text-green-400' : 'text-red-400'}>
                            {' '}({d.diff > 0 ? '+' : ''}{d.diff.toFixed(1)})
                          </span>
                        )
                      })()}
                    </span>
                  )}
                  {m.waist_cm !== null && (
                    <span>
                      📏 Waist <span className="text-zinc-300">{m.waist_cm}cm</span>
                    </span>
                  )}
                  {m.body_fat_pct !== null && (
                    <span>
                      💧 BF <span className="text-zinc-300">{m.body_fat_pct}%</span>
                    </span>
                  )}
                </div>
              </div>
              <span className="text-zinc-600">{isOpen ? '▲' : '▼'}</span>
            </button>

            {/* Expanded details */}
            {isOpen && (
              <div className="border-t border-zinc-800 px-5 pb-4 pt-3">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                  {DISPLAY_FIELDS.map(({ key, label, unit }) => {
                    const val = m[key] as number | null
                    if (val === null) return null
                    const prevVal = prev ? (prev[key] as number | null) : null
                    const isWaistHips = key === 'waist_cm' || key === 'hips_cm' || key === 'body_fat_pct'
                    const delta = getDelta(val, prevVal, isWaistHips)
                    return (
                      <div key={key} className="rounded-lg bg-zinc-950 p-2 text-center">
                        <p className="text-xs text-zinc-500">{label}</p>
                        <p className="text-sm font-bold text-white">{val}{unit}</p>
                        {delta && (
                          <p className={`text-xs ${delta.positive ? 'text-green-400' : 'text-red-400'}`}>
                            {delta.diff > 0 ? '+' : ''}{delta.diff.toFixed(1)}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
                {m.notes && (
                  <p className="mt-3 text-xs text-zinc-500 italic">&ldquo;{m.notes}&rdquo;</p>
                )}
                <button
                  onClick={() => handleDelete(m.id)}
                  disabled={isPending}
                  className="mt-3 text-xs text-zinc-600 hover:text-red-400 transition-colors"
                >
                  Delete entry
                </button>
              </div>
            )}
          </div>
        )
      })}

      {/* Progress summary — first vs latest */}
      {sorted.length >= 2 && (() => {
        const latest = sorted[0]
        const first = sorted[sorted.length - 1]
        const wDelta = latest.weight_kg !== null && first.weight_kg !== null
          ? (latest.weight_kg - first.weight_kg).toFixed(1)
          : null
        const wDelta2 = latest.waist_cm !== null && first.waist_cm !== null
          ? (latest.waist_cm - first.waist_cm).toFixed(1)
          : null
        if (!wDelta && !wDelta2) return null
        return (
          <div className="rounded-2xl border border-zinc-700 bg-zinc-900/50 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Total progress ({first.measured_at} → {latest.measured_at})
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              {wDelta && (
                <span>
                  Weight: <span className={parseFloat(wDelta) < 0 ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>
                    {parseFloat(wDelta) > 0 ? '+' : ''}{wDelta}kg
                  </span>
                </span>
              )}
              {wDelta2 && (
                <span>
                  Waist: <span className={parseFloat(wDelta2) < 0 ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>
                    {parseFloat(wDelta2) > 0 ? '+' : ''}{wDelta2}cm
                  </span>
                </span>
              )}
            </div>
          </div>
        )
      })()}
    </div>
  )
}
