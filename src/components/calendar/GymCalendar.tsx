'use client'

import { useState, useTransition } from 'react'
import { toggleSession } from '@/app/calendar/actions'

type Session = { session_date: string; was_at_gym: boolean }

type Props = {
  initialSessions: Session[]
  initialYear: number
  initialMonth: number
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function calcStreak(sessions: Session[]): number {
  const gymDates = new Set(
    sessions.filter((s) => s.was_at_gym).map((s) => s.session_date)
  )
  let streak = 0
  const today = new Date()
  for (let i = 0; i < 365; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const key = d.toISOString().split('T')[0]
    if (gymDates.has(key)) {
      streak++
    } else if (i > 0) {
      break
    }
  }
  return streak
}

export default function GymCalendar({ initialSessions, initialYear, initialMonth }: Props) {
  const [year, setYear] = useState(initialYear)
  const [month, setMonth] = useState(initialMonth) // 1-12
  const [sessions, setSessions] = useState<Session[]>(initialSessions)
  const [isPending, startTransition] = useTransition()

  const sessionMap = new Map(sessions.map((s) => [s.session_date, s.was_at_gym]))
  const streak = calcStreak(sessions)
  const totalSessions = sessions.filter((s) => s.was_at_gym).length

  // Build calendar days
  const firstDay = new Date(year, month - 1, 1)
  const lastDay = new Date(year, month, 0)
  const daysInMonth = lastDay.getDate()
  // Monday = 0 offset
  let startOffset = firstDay.getDay() - 1
  if (startOffset < 0) startOffset = 6

  const today = new Date().toISOString().split('T')[0]

  function prevMonth() {
    if (month === 1) { setYear(y => y - 1); setMonth(12) }
    else setMonth(m => m - 1)
  }

  function nextMonth() {
    if (month === 12) { setYear(y => y + 1); setMonth(1) }
    else setMonth(m => m + 1)
  }

  function handleDayClick(dateStr: string) {
    // Can't mark future dates
    if (dateStr > today) return

    // Optimistic update
    setSessions(prev => {
      const existing = prev.find(s => s.session_date === dateStr)
      if (existing) {
        return prev.map(s =>
          s.session_date === dateStr ? { ...s, was_at_gym: !s.was_at_gym } : s
        )
      }
      return [...prev, { session_date: dateStr, was_at_gym: true }]
    })

    startTransition(async () => {
      await toggleSession(dateStr)
    })
  }

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-center">
          <p className="text-3xl font-extrabold text-orange-400">{streak}</p>
          <p className="mt-1 text-xs text-zinc-400 uppercase tracking-wider">Day Streak</p>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-center">
          <p className="text-3xl font-extrabold text-white">{totalSessions}</p>
          <p className="mt-1 text-xs text-zinc-400 uppercase tracking-wider">Total Sessions</p>
        </div>
        <div className="col-span-2 sm:col-span-1 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-center">
          <p className="text-3xl font-extrabold text-white">
            {sessions.filter(s => {
              const d = s.session_date
              return s.was_at_gym &&
                d.startsWith(`${year}-${String(month).padStart(2, '0')}`)
            }).length}
          </p>
          <p className="mt-1 text-xs text-zinc-400 uppercase tracking-wider">This Month</p>
        </div>
      </div>

      {/* Calendar */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 sm:p-6">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={prevMonth}
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            ←
          </button>
          <h2 className="font-bold text-white">
            {MONTHS[month - 1]} {year}
          </h2>
          <button
            onClick={nextMonth}
            disabled={`${year}-${String(month).padStart(2, '0')}` >= today.slice(0, 7)}
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            →
          </button>
        </div>

        {/* Day labels */}
        <div className="mb-2 grid grid-cols-7 gap-1">
          {DAYS.map(d => (
            <div key={d} className="text-center text-xs font-medium text-zinc-500">{d}</div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} />

            const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            const isGym = sessionMap.get(dateStr) === true
            const isToday = dateStr === today
            const isFuture = dateStr > today

            return (
              <button
                key={dateStr}
                onClick={() => handleDayClick(dateStr)}
                disabled={isFuture || isPending}
                className={[
                  'aspect-square rounded-lg text-sm font-medium transition-colors',
                  isFuture
                    ? 'text-zinc-700 cursor-not-allowed'
                    : isGym
                    ? 'bg-orange-500 text-white hover:bg-orange-400'
                    : isToday
                    ? 'border border-orange-500 text-white hover:bg-zinc-800'
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-white',
                ].join(' ')}
              >
                {day}
              </button>
            )
          })}
        </div>

        <p className="mt-4 text-center text-xs text-zinc-600">
          Tap a day to mark it as a gym session
        </p>
      </div>
    </div>
  )
}
