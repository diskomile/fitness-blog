'use client'

import { useState, useTransition } from 'react'
import { saveMeasurement, type MeasurementInput } from '@/app/measurements/actions'

type Props = { onSaved?: () => void }

const FIELDS: { key: keyof MeasurementInput; label: string; unit: string }[] = [
  { key: 'weight_kg',     label: 'Weight',       unit: 'kg'  },
  { key: 'body_fat_pct',  label: 'Body Fat',     unit: '%'   },
  { key: 'chest_cm',      label: 'Chest',        unit: 'cm'  },
  { key: 'waist_cm',      label: 'Waist',        unit: 'cm'  },
  { key: 'hips_cm',       label: 'Hips',         unit: 'cm'  },
  { key: 'neck_cm',       label: 'Neck',         unit: 'cm'  },
  { key: 'left_arm_cm',   label: 'Left Arm',     unit: 'cm'  },
  { key: 'right_arm_cm',  label: 'Right Arm',    unit: 'cm'  },
  { key: 'left_thigh_cm', label: 'Left Thigh',   unit: 'cm'  },
  { key: 'right_thigh_cm',label: 'Right Thigh',  unit: 'cm'  },
]

export default function MeasurementForm({ onSaved }: Props) {
  const [isPending, startTransition] = useTransition()
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [values, setValues] = useState<Record<string, string>>({})
  const [notes, setNotes] = useState('')
  const [saved, setSaved] = useState(false)

  function set(key: string, val: string) {
    setValues(prev => ({ ...prev, [key]: val }))
  }

  function handleSave() {
    startTransition(async () => {
      const data: MeasurementInput = {
        measured_at: date,
        weight_kg:      values.weight_kg      ? parseFloat(values.weight_kg)      : null,
        body_fat_pct:   values.body_fat_pct   ? parseFloat(values.body_fat_pct)   : null,
        chest_cm:       values.chest_cm       ? parseFloat(values.chest_cm)       : null,
        waist_cm:       values.waist_cm       ? parseFloat(values.waist_cm)       : null,
        hips_cm:        values.hips_cm        ? parseFloat(values.hips_cm)        : null,
        left_arm_cm:    values.left_arm_cm    ? parseFloat(values.left_arm_cm)    : null,
        right_arm_cm:   values.right_arm_cm   ? parseFloat(values.right_arm_cm)   : null,
        left_thigh_cm:  values.left_thigh_cm  ? parseFloat(values.left_thigh_cm)  : null,
        right_thigh_cm: values.right_thigh_cm ? parseFloat(values.right_thigh_cm) : null,
        neck_cm:        values.neck_cm        ? parseFloat(values.neck_cm)        : null,
        notes:          notes || null,
      }
      await saveMeasurement(data)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      onSaved?.()
    })
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-white">Log Measurements</h2>
        <input
          type="date"
          value={date}
          max={new Date().toISOString().split('T')[0]}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm text-white focus:border-orange-500 focus:outline-none"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {FIELDS.map(({ key, label, unit }) => (
          <div key={key}>
            <label className="mb-1 block text-xs text-zinc-400">
              {label} <span className="text-zinc-600">({unit})</span>
            </label>
            <input
              type="number"
              step="0.1"
              value={values[key] ?? ''}
              onChange={(e) => set(key, e.target.value)}
              placeholder="—"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-700 focus:border-orange-500 focus:outline-none"
            />
          </div>
        ))}
      </div>

      <div className="mt-3">
        <label className="mb-1 block text-xs text-zinc-400">Notes (optional)</label>
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. Morning, post-workout, end of cut week 4..."
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-orange-500 focus:outline-none"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={isPending}
        className="mt-4 w-full rounded-lg bg-orange-500 py-2.5 text-sm font-bold text-white hover:bg-orange-400 transition-colors disabled:opacity-50"
      >
        {isPending ? 'Saving...' : saved ? '✓ Saved!' : 'Save Measurements'}
      </button>
    </div>
  )
}
