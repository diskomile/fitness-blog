import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getMeasurements } from './actions'
import MeasurementForm from '@/components/measurements/MeasurementForm'
import MeasurementHistory from '@/components/measurements/MeasurementHistory'
import BodyWeightChart from '@/components/charts/BodyWeightChart'

export const metadata = { title: 'Body Measurements' }

export default async function MeasurementsPage() {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  const measurements = await getMeasurements()

  const weightData = measurements.map((m) => ({
    date: m.measured_at,
    weight: m.weight_kg,
    bodyFat: m.body_fat_pct,
  }))

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">
          Body <span className="text-orange-400">Measurements</span>
        </h1>
        <p className="mt-1 text-zinc-400">
          Track your progress beyond the scale — log body measurements over time.
        </p>
      </div>

      <div className="space-y-6">
        {weightData.length >= 2 && <BodyWeightChart data={weightData} />}
        <MeasurementForm />
        <MeasurementHistory measurements={measurements} />
      </div>
    </main>
  )
}
