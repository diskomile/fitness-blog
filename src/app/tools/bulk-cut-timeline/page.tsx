import BulkCutTimeline from '@/components/tools/BulkCutTimeline'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bulk & Cut Timeline Calculator',
  description: 'Find out exactly how long your bulk or cut will take, with monthly weight milestones and daily calorie targets.',
}

export default function BulkCutTimelinePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">
          Bulk &amp; Cut <span className="text-orange-400">Timeline</span>
        </h1>
        <p className="mt-2 text-zinc-400">
          Set your goal weight and target date — get a realistic week-by-week plan with calorie targets.
        </p>
      </div>
      <BulkCutTimeline />
    </main>
  )
}
