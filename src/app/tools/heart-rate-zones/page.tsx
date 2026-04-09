import HeartRateZones from '@/components/tools/HeartRateZones'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Heart Rate Zone Calculator',
  description: 'Calculate your 5 heart rate training zones based on your age and max heart rate.',
}

export default function HeartRateZonesPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">
          Heart Rate <span className="text-orange-400">Zones</span>
        </h1>
        <p className="mt-2 text-zinc-400">
          Know exactly which zone you&apos;re training in — from fat burn to max effort.
        </p>
      </div>
      <HeartRateZones />
    </main>
  )
}
