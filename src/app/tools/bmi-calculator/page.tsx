import BmiCalculator from '@/components/tools/BmiCalculator'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BMI Calculator',
  description: 'Calculate your Body Mass Index (BMI) instantly. Find out if you are underweight, normal weight, overweight, or obese with a personalised gauge.',
}

export default function BmiPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">
          BMI <span className="text-orange-400">Calculator</span>
        </h1>
        <p className="mt-2 text-zinc-400">
          Calculate your Body Mass Index and see where you fall on the scale.
        </p>
      </div>
      <BmiCalculator />
    </main>
  )
}
