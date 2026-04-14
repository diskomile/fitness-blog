'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type DataPoint = {
  date: string
  weight: number | null
  bodyFat: number | null
}

type Props = {
  data: DataPoint[]
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
          {p.name}: <strong>{p.value}</strong>
          {p.name === 'Weight' ? ' kg' : ' %'}
        </p>
      ))}
    </div>
  )
}

export default function BodyWeightChart({ data }: Props) {
  const weightData = data.filter((d) => d.weight !== null)

  if (weightData.length < 2) {
    return (
      <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/50">
        <p className="text-sm text-zinc-500">Log at least 2 measurements to see a chart.</p>
      </div>
    )
  }

  const formatted = weightData.map((d) => ({
    date: formatDate(d.date),
    Weight: d.weight,
    'Body Fat %': d.bodyFat,
  }))

  const weights = weightData.map((d) => d.weight as number)
  const minW = Math.floor(Math.min(...weights) - 2)
  const maxW = Math.ceil(Math.max(...weights) + 2)

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="font-bold text-white">Body Weight</p>
          <p className="text-xs text-zinc-500">{weightData.length} entries</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-orange-400" /> Weight (kg)
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={formatted} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis dataKey="date" tick={{ fill: '#71717a', fontSize: 11 }} tickLine={false} />
          <YAxis domain={[minW, maxW]} tick={{ fill: '#71717a', fontSize: 11 }} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="Weight"
            stroke="#f97316"
            strokeWidth={2}
            fill="url(#weightGrad)"
            dot={{ fill: '#f97316', strokeWidth: 0, r: 3 }}
            activeDot={{ r: 5, fill: '#f97316' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
