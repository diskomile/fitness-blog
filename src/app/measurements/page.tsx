import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getMeasurements } from './actions'
import MeasurementForm from '@/components/measurements/MeasurementForm'
import MeasurementHistory from '@/components/measurements/MeasurementHistory'

export const metadata = { title: 'Body Measurements' }

export default async function MeasurementsPage() {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  const measurements = await getMeasurements()

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
        <MeasurementForm />
        <MeasurementHistory measurements={measurements} />
      </div>
    </main>
  )
}
