'use client'

import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type ExerciseEntry = {
  date: string
  maxWeight: number
  totalVolume: number
}

type Props = {
  exerciseMap: Record<string, ExerciseEntry[]>
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-xs shadow-xl">
      <p className="mb-1 font-semibold text-zinc-300">{label}</p>
      {payload.map((p: { name: string; value: number; color: string }) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: <strong>{p.value}{p.name === 'Max Weight' ? ' kg' : ' kg total'}</strong>
        </p>
      ))}
    </div>
  )
}

export default function ExerciseProgressChart({ exerciseMap }: Props) {
  const exercises = Object.keys(exerciseMap)
  const [selected, setSelected] = useState(exercises[0] ?? '')

  if (exercises.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/50">
        <p className="text-sm text-zinc-500">Log workouts to see exercise progress charts.</p>
      </div>
    )
  }

  const entries = exerciseMap[selected] ?? []
  const formatted = entries.map((e) => ({
    date: formatDate(e.date),
    'Max Weight': e.maxWeight,
    Volume: e.totalVolume,
  }))

  const maxW = entries.map((e) => e.maxWeight)
  const minY = Math.floor(Math.min(...maxW) - 5)
  const maxY = Math.ceil(Math.max(...maxW) + 5)

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-bold text-white">Exercise Progress</p>
          <p className="text-xs text-zinc-500">{entries.length} sessions logged</p>
        </div>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs text-white focus:border-orange-500 focus:outline-none"
        >
          {exercises.map((ex) => (
            <option key={ex} value={ex}>{ex}</option>
          ))}
        </select>
      </div>

      {entries.length < 2 ? (
        <div className="flex h-40 items-center justify-center">
          <p className="text-sm text-zinc-500">Log this exercise at least twice to see a trend.</p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4 mb-3 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-orange-400" /> Max Weight (kg)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-400" /> Volume (kg)
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={formatted} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="date" tick={{ fill: '#71717a', fontSize: 11 }} tickLine={false} />
              <YAxis domain={[minY, maxY]} tick={{ fill: '#71717a', fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="Max Weight"
                stroke="#f97316"
                strokeWidth={2}
                dot={{ fill: '#f97316', strokeWidth: 0, r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="Volume"
                stroke="#60a5fa"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  )
}
