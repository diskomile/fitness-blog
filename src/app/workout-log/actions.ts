'use server'

import { currentUser } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export type SetLog = { weight: number; reps: number }
export type ExerciseLog = { exercise_name: string; sets: SetLog[] }
export type PreviousLogs = Record<string, Record<string, { sets: SetLog[]; date: string }>>

export async function saveWorkoutSession(
  planSlug: string,
  dayLabel: string,
  exerciseLogs: ExerciseLog[]
) {
  const user = await currentUser()
  if (!user) throw new Error('Not authenticated')

  const rows = exerciseLogs
    .filter((log) => log.sets.length > 0)
    .map((log) => ({
      user_id: user.id,
      plan_slug: planSlug,
      day_label: dayLabel,
      exercise_name: log.exercise_name,
      sets: log.sets,
    }))

  if (rows.length === 0) return

  const { error } = await supabaseAdmin.from('workout_logs').insert(rows)
  if (error) throw new Error(error.message)

  revalidatePath(`/workout-plans/${planSlug}`)
}

// Returns: { dayLabel: { exerciseName: { sets, date } } }
export async function getPlanLogs(planSlug: string): Promise<PreviousLogs> {
  const user = await currentUser()
  if (!user) return {}

  const { data } = await supabaseAdmin
    .from('workout_logs')
    .select('exercise_name, day_label, sets, logged_at')
    .eq('user_id', user.id)
    .eq('plan_slug', planSlug)
    .order('logged_at', { ascending: false })

  if (!data) return {}

  const result: PreviousLogs = {}
  for (const row of data) {
    if (!result[row.day_label]) result[row.day_label] = {}
    if (!result[row.day_label][row.exercise_name]) {
      result[row.day_label][row.exercise_name] = {
        sets: row.sets as SetLog[],
        date: row.logged_at as string,
      }
    }
  }
  return result
}
