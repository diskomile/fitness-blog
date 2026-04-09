'use server'

import { currentUser } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export type Measurement = {
  id: string
  measured_at: string
  weight_kg: number | null
  body_fat_pct: number | null
  chest_cm: number | null
  waist_cm: number | null
  hips_cm: number | null
  left_arm_cm: number | null
  right_arm_cm: number | null
  left_thigh_cm: number | null
  right_thigh_cm: number | null
  neck_cm: number | null
  notes: string | null
}

export type MeasurementInput = Omit<Measurement, 'id'>

export async function saveMeasurement(data: MeasurementInput) {
  const user = await currentUser()
  if (!user) throw new Error('Not authenticated')

  await supabaseAdmin
    .from('body_measurements')
    .upsert(
      { user_id: user.id, ...data },
      { onConflict: 'user_id,measured_at' }
    )

  revalidatePath('/measurements')
}

export async function getMeasurements(): Promise<Measurement[]> {
  const user = await currentUser()
  if (!user) return []

  const { data } = await supabaseAdmin
    .from('body_measurements')
    .select('*')
    .eq('user_id', user.id)
    .order('measured_at', { ascending: true })

  return (data ?? []) as Measurement[]
}

export async function deleteMeasurement(id: string) {
  const user = await currentUser()
  if (!user) throw new Error('Not authenticated')

  await supabaseAdmin
    .from('body_measurements')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  revalidatePath('/measurements')
}
