'use server'

import { currentUser } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function toggleSession(date: string) {
  const user = await currentUser()
  if (!user) throw new Error('Not authenticated')

  // Check if session already exists
  const { data: existing } = await supabaseAdmin
    .from('gym_sessions')
    .select('id, was_at_gym')
    .eq('user_id', user.id)
    .eq('session_date', date)
    .single()

  if (existing) {
    // Toggle was_at_gym
    await supabaseAdmin
      .from('gym_sessions')
      .update({ was_at_gym: !existing.was_at_gym })
      .eq('id', existing.id)
  } else {
    // Create new session
    await supabaseAdmin
      .from('gym_sessions')
      .insert({ user_id: user.id, session_date: date, was_at_gym: true })
  }

  revalidatePath('/calendar')
}

export async function getSessionsForMonth(year: number, month: number) {
  const user = await currentUser()
  if (!user) return []

  const from = `${year}-${String(month).padStart(2, '0')}-01`
  const to = `${year}-${String(month).padStart(2, '0')}-31`

  const { data } = await supabaseAdmin
    .from('gym_sessions')
    .select('session_date, was_at_gym')
    .eq('user_id', user.id)
    .gte('session_date', from)
    .lte('session_date', to)

  return data ?? []
}

export async function getAllSessions() {
  const user = await currentUser()
  if (!user) return []

  const { data } = await supabaseAdmin
    .from('gym_sessions')
    .select('session_date, was_at_gym')
    .eq('user_id', user.id)
    .eq('was_at_gym', true)
    .order('session_date', { ascending: false })

  return data ?? []
}
