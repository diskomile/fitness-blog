'use server'

import Groq from 'groq-sdk'
import { searchExercises, lookupExercise } from '@/lib/exercise-db'

export type GeneratorInput = {
  gender: 'male' | 'female'
  goal: 'muscle' | 'fat-loss' | 'strength' | 'conditioning'
  level: 'beginner' | 'intermediate' | 'advanced'
  equipment: 'gym' | 'home' | 'bodyweight'
  daysPerWeek: '3' | '4' | '5'
}

export type GeneratedExercise = {
  name: string
  sets: number
  reps: string
  muscle: string
  tip: string
  image1: string | null
  image2: string | null
  description: string | null
}

export type GeneratedDay = {
  label: string
  focus: string
  exercises: GeneratedExercise[]
}

export type GeneratedPlan = {
  name: string
  description: string
  days: GeneratedDay[]
}

const GOAL_LABELS = {
  muscle: 'Muscle Growth',
  'fat-loss': 'Fat Loss',
  strength: 'Strength',
  conditioning: 'Athletic Conditioning',
}

const EQUIPMENT_LABELS = {
  gym: 'full gym (barbells, cables, machines)',
  home: 'dumbbells and resistance bands',
  bodyweight: 'bodyweight only, no equipment',
}

export async function generateWorkoutPlan(input: GeneratorInput): Promise<GeneratedPlan | null> {
  const client = new Groq({ apiKey: process.env.GROQ_API_KEY })

  const prompt = `Create a ${input.daysPerWeek}-day workout plan for a ${input.gender} ${input.level} with goal: ${GOAL_LABELS[input.goal]}.
Equipment available: ${EQUIPMENT_LABELS[input.equipment]}.

Return ONLY valid JSON in this exact format, no extra text:
{
  "name": "Plan name (short, 2-4 words)",
  "description": "2 sentence description of the plan",
  "days": [
    {
      "label": "Day 1",
      "focus": "Focus description (e.g. Upper Body Push)",
      "exercises": [
        {
          "name": "Exact exercise name",
          "sets": 3,
          "reps": "8-10",
          "muscle": "Primary muscle",
          "tip": "One key form tip under 15 words"
        }
      ]
    }
  ]
}

Rules:
- ${input.daysPerWeek} training days
- 3-4 exercises per day for beginners, 4-5 for intermediate/advanced
- Reps as string like "8-10" or "12-15" or "30 sec"
- Only use exercises achievable with: ${EQUIPMENT_LABELS[input.equipment]}
- Adjust volume and intensity for ${input.level} level
- For fat-loss: include supersets and higher reps (12-20)
- For strength: lower reps (3-6) and compound movements
- For muscle: moderate reps (8-12) with progressive overload
- For conditioning: circuits and time-based sets`

  try {
    const response = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: 'You are an expert personal trainer. Return only valid JSON, no markdown, no explanation.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    let raw = response.choices[0].message.content?.trim() ?? ''
    // Strip code fences if present
    raw = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '')

    const plan = JSON.parse(raw) as GeneratedPlan

    // Enrich exercises with images from wger db
    for (const day of plan.days) {
      day.exercises = day.exercises.map(ex => {
        const wger = lookupExercise(ex.name)
        return {
          ...ex,
          image1: wger?.image1 ?? null,
          image2: wger?.image2 ?? null,
          description: wger?.description ?? null,
        }
      })
    }

    return plan
  } catch (e) {
    console.error('generateWorkoutPlan error:', e)
    return null
  }
}
