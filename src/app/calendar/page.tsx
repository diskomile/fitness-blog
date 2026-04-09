import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getAllSessions } from './actions'
import GymCalendar from '@/components/calendar/GymCalendar'

export const metadata = { title: 'Gym Calendar' }

export default async function CalendarPage() {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  const sessions = await getAllSessions()

  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1 // 1-12

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">
          Gym <span className="text-orange-400">Calendar</span>
        </h1>
        <p className="mt-1 text-zinc-400">Track your training sessions and build your streak.</p>
      </div>

      <GymCalendar
        initialSessions={sessions}
        initialYear={year}
        initialMonth={month}
      />
    </main>
  )
}
