'use client'

import { useState } from 'react'

type Constraint = 'no_barbell' | 'no_dumbbells' | 'home_only' | 'shoulder_injury' | 'knee_injury' | 'lower_back' | 'no_cables'

type Exercise = {
  name: string
  equipment: string
  muscles: string
  notes: string
}

type SubstitutionMap = Record<string, {
  muscles: string
  substitutes: Record<Constraint | 'default', Exercise[]>
}>

const SUBSTITUTIONS: SubstitutionMap = {
  'Barbell Bench Press': {
    muscles: 'Chest, Shoulders, Triceps',
    substitutes: {
      default: [
        { name: 'Dumbbell Bench Press', equipment: 'Dumbbells', muscles: 'Chest, Shoulders, Triceps', notes: 'Greater range of motion, each arm works independently.' },
        { name: 'Push-Up', equipment: 'Bodyweight', muscles: 'Chest, Shoulders, Triceps', notes: 'Elevate feet or add weight vest to increase difficulty.' },
        { name: 'Cable Fly', equipment: 'Cable machine', muscles: 'Chest', notes: 'Better chest isolation with constant tension.' },
      ],
      no_barbell: [
        { name: 'Dumbbell Bench Press', equipment: 'Dumbbells', muscles: 'Chest, Shoulders, Triceps', notes: 'Best direct substitute — same movement pattern.' },
        { name: 'Dumbbell Floor Press', equipment: 'Dumbbells', muscles: 'Chest, Triceps', notes: 'Eliminates shoulder strain at the bottom.' },
        { name: 'Push-Up Variations', equipment: 'Bodyweight', muscles: 'Chest, Shoulders, Triceps', notes: 'Archer push-ups or weighted push-ups for more challenge.' },
      ],
      home_only: [
        { name: 'Push-Up', equipment: 'Bodyweight', muscles: 'Chest, Shoulders, Triceps', notes: 'Standard or decline for upper chest emphasis.' },
        { name: 'Dumbbell Floor Press', equipment: 'Dumbbells', muscles: 'Chest, Triceps', notes: 'If you have dumbbells at home.' },
        { name: 'Diamond Push-Up', equipment: 'Bodyweight', muscles: 'Chest, Triceps', notes: 'More tricep emphasis, harder than standard.' },
      ],
      shoulder_injury: [
        { name: 'Dumbbell Floor Press', equipment: 'Dumbbells', muscles: 'Chest, Triceps', notes: 'Eliminates the risky bottom position for shoulders.' },
        { name: 'Machine Chest Press', equipment: 'Machine', muscles: 'Chest, Triceps', notes: 'Fixed path reduces shoulder instability.' },
        { name: 'Cable Crossover', equipment: 'Cable machine', muscles: 'Chest', notes: 'Control the range to avoid shoulder discomfort.' },
      ],
      knee_injury: [
        { name: 'Dumbbell Bench Press', equipment: 'Dumbbells', muscles: 'Chest, Shoulders, Triceps', notes: 'Upper body — knees not involved.' },
        { name: 'Push-Up', equipment: 'Bodyweight', muscles: 'Chest, Shoulders, Triceps', notes: 'No knee stress whatsoever.' },
        { name: 'Cable Fly', equipment: 'Cable machine', muscles: 'Chest', notes: 'Seated option available.' },
      ],
      lower_back: [
        { name: 'Dumbbell Bench Press', equipment: 'Dumbbells', muscles: 'Chest, Shoulders, Triceps', notes: 'Flat back position, no spinal loading.' },
        { name: 'Machine Chest Press', equipment: 'Machine', muscles: 'Chest, Triceps', notes: 'Seated — completely unloads the spine.' },
        { name: 'Push-Up', equipment: 'Bodyweight', muscles: 'Chest, Shoulders, Triceps', notes: 'Keep core braced to protect lower back.' },
      ],
      no_dumbbells: [
        { name: 'Push-Up', equipment: 'Bodyweight', muscles: 'Chest, Shoulders, Triceps', notes: 'Add a weight plate on your back for more resistance.' },
        { name: 'Cable Fly', equipment: 'Cable machine', muscles: 'Chest', notes: 'Excellent isolation with constant tension.' },
        { name: 'Machine Chest Press', equipment: 'Machine', muscles: 'Chest, Triceps', notes: 'Direct substitute if cable machine unavailable.' },
      ],
      no_cables: [
        { name: 'Dumbbell Bench Press', equipment: 'Dumbbells', muscles: 'Chest, Shoulders, Triceps', notes: 'Primary substitute.' },
        { name: 'Push-Up', equipment: 'Bodyweight', muscles: 'Chest, Shoulders, Triceps', notes: 'Always available.' },
        { name: 'Dumbbell Fly', equipment: 'Dumbbells', muscles: 'Chest', notes: 'Isolation work without cables.' },
      ],
    },
  },
  'Barbell Back Squat': {
    muscles: 'Quads, Glutes, Hamstrings, Core',
    substitutes: {
      default: [
        { name: 'Goblet Squat', equipment: 'Dumbbell/Kettlebell', muscles: 'Quads, Glutes', notes: 'Great form builder. Hold weight at chest.' },
        { name: 'Leg Press', equipment: 'Machine', muscles: 'Quads, Glutes', notes: 'High foot placement = more glutes; low = more quads.' },
        { name: 'Bulgarian Split Squat', equipment: 'Dumbbells', muscles: 'Quads, Glutes', notes: 'Unilateral — fixes imbalances.' },
      ],
      no_barbell: [
        { name: 'Dumbbell Goblet Squat', equipment: 'Dumbbell', muscles: 'Quads, Glutes', notes: 'Best barbell-free squat substitute.' },
        { name: 'Bulgarian Split Squat', equipment: 'Dumbbells', muscles: 'Quads, Glutes', notes: 'Similar stimulus, great for hypertrophy.' },
        { name: 'Leg Press', equipment: 'Machine', muscles: 'Quads, Glutes', notes: 'High volume quad work without barbell.' },
      ],
      home_only: [
        { name: 'Bodyweight Squat', equipment: 'Bodyweight', muscles: 'Quads, Glutes', notes: 'Add a pause at the bottom for more difficulty.' },
        { name: 'Bulgarian Split Squat', equipment: 'Bodyweight/Chair', muscles: 'Quads, Glutes', notes: 'Use a chair or sofa to elevate back foot.' },
        { name: 'Jump Squat', equipment: 'Bodyweight', muscles: 'Quads, Glutes', notes: 'Adds explosive conditioning.' },
      ],
      knee_injury: [
        { name: 'Leg Press (high foot)', equipment: 'Machine', muscles: 'Glutes, Hamstrings', notes: 'High foot placement reduces knee stress.' },
        { name: 'Hip Thrust', equipment: 'Barbell/Dumbbell', muscles: 'Glutes', notes: 'Zero knee stress, maximum glute activation.' },
        { name: 'Romanian Deadlift', equipment: 'Barbell/Dumbbells', muscles: 'Hamstrings, Glutes', notes: 'Hip hinge, minimal knee flexion.' },
      ],
      lower_back: [
        { name: 'Goblet Squat', equipment: 'Dumbbell', muscles: 'Quads, Glutes', notes: 'Front-loaded = less spinal compression than back squat.' },
        { name: 'Leg Press', equipment: 'Machine', muscles: 'Quads, Glutes', notes: 'Supported back position.' },
        { name: 'Step-Up', equipment: 'Dumbbells/Box', muscles: 'Quads, Glutes', notes: 'Unilateral, minimal spinal load.' },
      ],
      shoulder_injury: [
        { name: 'Safety Bar Squat', equipment: 'Safety bar', muscles: 'Quads, Glutes', notes: 'No shoulder flexion required.' },
        { name: 'Goblet Squat', equipment: 'Dumbbell', muscles: 'Quads, Glutes', notes: 'Hold at chest — no shoulder stress.' },
        { name: 'Leg Press', equipment: 'Machine', muscles: 'Quads, Glutes', notes: 'Completely removes shoulder involvement.' },
      ],
      no_dumbbells: [
        { name: 'Bodyweight Squat', equipment: 'Bodyweight', muscles: 'Quads, Glutes', notes: 'Add tempo (3s down) to increase difficulty.' },
        { name: 'Leg Press', equipment: 'Machine', muscles: 'Quads, Glutes', notes: 'Load heavily to compensate.' },
        { name: 'Sissy Squat', equipment: 'Bodyweight', muscles: 'Quads', notes: 'Advanced bodyweight quad exercise.' },
      ],
      no_cables: [
        { name: 'Dumbbell Goblet Squat', equipment: 'Dumbbell', muscles: 'Quads, Glutes', notes: 'Primary substitute.' },
        { name: 'Barbell Front Squat', equipment: 'Barbell', muscles: 'Quads, Glutes', notes: 'More upright torso, quad emphasis.' },
        { name: 'Leg Press', equipment: 'Machine', muscles: 'Quads, Glutes', notes: 'Machine substitute.' },
      ],
    },
  },
  'Conventional Deadlift': {
    muscles: 'Hamstrings, Glutes, Back, Traps',
    substitutes: {
      default: [
        { name: 'Romanian Deadlift', equipment: 'Barbell/Dumbbells', muscles: 'Hamstrings, Glutes', notes: 'Hip hinge pattern, less lower back stress.' },
        { name: 'Trap Bar Deadlift', equipment: 'Trap bar', muscles: 'Full body', notes: 'More quad involvement, easier on lower back.' },
        { name: 'Kettlebell Deadlift', equipment: 'Kettlebell', muscles: 'Hamstrings, Glutes, Back', notes: 'Great for learning hip hinge pattern.' },
      ],
      no_barbell: [
        { name: 'Dumbbell Romanian Deadlift', equipment: 'Dumbbells', muscles: 'Hamstrings, Glutes', notes: 'Very close substitute for hamstring/glute work.' },
        { name: 'Single-Leg RDL', equipment: 'Dumbbell', muscles: 'Hamstrings, Glutes', notes: 'Unilateral for balance and stability.' },
        { name: 'Kettlebell Swing', equipment: 'Kettlebell', muscles: 'Posterior chain', notes: 'Explosive hip hinge, more conditioning.' },
      ],
      home_only: [
        { name: 'Single-Leg RDL', equipment: 'Dumbbell/Bodyweight', muscles: 'Hamstrings, Glutes', notes: 'Bodyweight version still effective.' },
        { name: 'Good Morning', equipment: 'Bodyweight', muscles: 'Hamstrings, Lower back', notes: 'Hinge with hands behind head.' },
        { name: 'Glute Bridge', equipment: 'Bodyweight', muscles: 'Glutes, Hamstrings', notes: 'Floor-based posterior chain work.' },
      ],
      lower_back: [
        { name: 'Romanian Deadlift (light)', equipment: 'Dumbbells', muscles: 'Hamstrings, Glutes', notes: 'Controlled range, stop before rounding.' },
        { name: 'Hip Thrust', equipment: 'Barbell/Machine', muscles: 'Glutes', notes: 'Zero spinal loading — best glute exercise.' },
        { name: 'Leg Curl', equipment: 'Machine', muscles: 'Hamstrings', notes: 'Isolates hamstrings with no back involvement.' },
      ],
      knee_injury: [
        { name: 'Romanian Deadlift', equipment: 'Barbell/Dumbbells', muscles: 'Hamstrings, Glutes', notes: 'Minimal knee flexion.' },
        { name: 'Hip Thrust', equipment: 'Barbell/Machine', muscles: 'Glutes', notes: 'Knee stays at ~90° — manageable for most injuries.' },
        { name: 'Back Extension', equipment: 'Machine/GHD', muscles: 'Hamstrings, Lower back', notes: 'Prone position, no knee stress.' },
      ],
      shoulder_injury: [
        { name: 'Romanian Deadlift', equipment: 'Barbell/Dumbbells', muscles: 'Hamstrings, Glutes', notes: 'Shoulders only stabilize — not a concern.' },
        { name: 'Trap Bar Deadlift', equipment: 'Trap bar', muscles: 'Full body', notes: 'Neutral grip reduces shoulder involvement.' },
        { name: 'Hip Thrust', equipment: 'Barbell', muscles: 'Glutes', notes: 'Bar rests on hips — no shoulder loading.' },
      ],
      no_dumbbells: [
        { name: 'Bodyweight Good Morning', equipment: 'Bodyweight', muscles: 'Hamstrings, Lower back', notes: 'Hinge pattern without equipment.' },
        { name: 'Glute Bridge', equipment: 'Bodyweight', muscles: 'Glutes, Hamstrings', notes: 'Add a barbell or weight plate for resistance.' },
        { name: 'Nordic Hamstring Curl', equipment: 'Partner/Anchor', muscles: 'Hamstrings', notes: 'Very challenging bodyweight hamstring exercise.' },
      ],
      no_cables: [
        { name: 'Dumbbell Romanian Deadlift', equipment: 'Dumbbells', muscles: 'Hamstrings, Glutes', notes: 'Direct substitute.' },
        { name: 'Barbell Romanian Deadlift', equipment: 'Barbell', muscles: 'Hamstrings, Glutes', notes: 'Primary variation.' },
        { name: 'Leg Curl Machine', equipment: 'Machine', muscles: 'Hamstrings', notes: 'Isolation work.' },
      ],
    },
  },
  'Overhead Press': {
    muscles: 'Shoulders, Triceps, Upper Chest',
    substitutes: {
      default: [
        { name: 'Dumbbell Shoulder Press', equipment: 'Dumbbells', muscles: 'Shoulders, Triceps', notes: 'Greater range of motion than barbell.' },
        { name: 'Arnold Press', equipment: 'Dumbbells', muscles: 'All three deltoid heads', notes: 'Rotation hits all parts of the shoulder.' },
        { name: 'Pike Push-Up', equipment: 'Bodyweight', muscles: 'Shoulders, Triceps', notes: 'Bodyweight overhead pressing pattern.' },
      ],
      shoulder_injury: [
        { name: 'Lateral Raise', equipment: 'Dumbbells/Cables', muscles: 'Side delts', notes: 'Trains shoulders without impingement risk.' },
        { name: 'Face Pull', equipment: 'Cable machine', muscles: 'Rear delts, Rotator cuff', notes: 'Rehabilitative — great for shoulder health.' },
        { name: 'Landmine Press', equipment: 'Barbell/Landmine', muscles: 'Shoulders, Upper chest', notes: 'Angled press reduces overhead impingement.' },
      ],
      no_barbell: [
        { name: 'Dumbbell Shoulder Press', equipment: 'Dumbbells', muscles: 'Shoulders, Triceps', notes: 'Best direct substitute.' },
        { name: 'Arnold Press', equipment: 'Dumbbells', muscles: 'Shoulders', notes: 'Adds rotational component.' },
        { name: 'Pike Push-Up', equipment: 'Bodyweight', muscles: 'Shoulders, Triceps', notes: 'Elevate feet for more difficulty.' },
      ],
      home_only: [
        { name: 'Pike Push-Up', equipment: 'Bodyweight', muscles: 'Shoulders, Triceps', notes: 'Feet elevated = harder.' },
        { name: 'Handstand Push-Up', equipment: 'Bodyweight/Wall', muscles: 'Shoulders, Triceps', notes: 'Advanced — against wall for support.' },
        { name: 'Dumbbell Press', equipment: 'Dumbbells', muscles: 'Shoulders, Triceps', notes: 'If you have dumbbells.' },
      ],
      lower_back: [
        { name: 'Seated Dumbbell Press', equipment: 'Dumbbells + bench', muscles: 'Shoulders, Triceps', notes: 'Seated removes spinal compression of standing press.' },
        { name: 'Machine Shoulder Press', equipment: 'Machine', muscles: 'Shoulders, Triceps', notes: 'Back supported — zero spinal load.' },
        { name: 'Lateral Raise', equipment: 'Dumbbells', muscles: 'Side delts', notes: 'No spinal loading.' },
      ],
      knee_injury: [
        { name: 'Seated Dumbbell Press', equipment: 'Dumbbells', muscles: 'Shoulders, Triceps', notes: 'Seated — no leg involvement.' },
        { name: 'Arnold Press', equipment: 'Dumbbells', muscles: 'Shoulders', notes: 'Seated version.' },
        { name: 'Machine Shoulder Press', equipment: 'Machine', muscles: 'Shoulders, Triceps', notes: 'Completely non-weight bearing.' },
      ],
      no_dumbbells: [
        { name: 'Pike Push-Up', equipment: 'Bodyweight', muscles: 'Shoulders, Triceps', notes: 'Classic bodyweight substitute.' },
        { name: 'Handstand Hold', equipment: 'Bodyweight/Wall', muscles: 'Shoulders, Core', notes: 'Isometric shoulder strength builder.' },
        { name: 'Cable Upright Row', equipment: 'Cable', muscles: 'Shoulders, Traps', notes: 'If cable available.' },
      ],
      no_cables: [
        { name: 'Dumbbell Shoulder Press', equipment: 'Dumbbells', muscles: 'Shoulders, Triceps', notes: 'Direct substitute.' },
        { name: 'Barbell Overhead Press', equipment: 'Barbell', muscles: 'Shoulders, Triceps', notes: 'Primary variation.' },
        { name: 'Arnold Press', equipment: 'Dumbbells', muscles: 'Shoulders', notes: 'More shoulder activation.' },
      ],
    },
  },
  'Pull-Up': {
    muscles: 'Lats, Biceps, Rear Delts',
    substitutes: {
      default: [
        { name: 'Lat Pulldown', equipment: 'Cable machine', muscles: 'Lats, Biceps', notes: 'Same movement pattern, adjustable weight.' },
        { name: 'Assisted Pull-Up Machine', equipment: 'Machine', muscles: 'Lats, Biceps', notes: 'Build strength toward full pull-ups.' },
        { name: 'Dumbbell Row', equipment: 'Dumbbell', muscles: 'Lats, Rhomboids, Biceps', notes: 'Horizontal pull as vertical substitute.' },
      ],
      no_barbell: [
        { name: 'Lat Pulldown', equipment: 'Cable machine', muscles: 'Lats, Biceps', notes: 'Best substitute.' },
        { name: 'Resistance Band Pull-Up', equipment: 'Band + bar', muscles: 'Lats, Biceps', notes: 'Banded assistance reduces bodyweight.' },
        { name: 'Dumbbell Row', equipment: 'Dumbbell', muscles: 'Lats, Biceps', notes: 'Good lat activation in horizontal plane.' },
      ],
      home_only: [
        { name: 'Door Frame Pull-Up', equipment: 'Pull-up bar', muscles: 'Lats, Biceps', notes: 'Doorframe bar ~€15 — best home investment.' },
        { name: 'Table Row (Australian)', equipment: 'Table/Bar', muscles: 'Lats, Biceps, Rear delts', notes: 'Lie under a table and row up.' },
        { name: 'Resistance Band Pulldown', equipment: 'Band + anchor', muscles: 'Lats', notes: 'Anchor band overhead and pull down.' },
      ],
      shoulder_injury: [
        { name: 'Lat Pulldown (neutral grip)', equipment: 'Cable machine', muscles: 'Lats, Biceps', notes: 'Neutral/hammer grip reduces shoulder stress.' },
        { name: 'Straight-Arm Pulldown', equipment: 'Cable machine', muscles: 'Lats', notes: 'Isolates lats with minimal shoulder joint stress.' },
        { name: 'Dumbbell Row', equipment: 'Dumbbell', muscles: 'Lats, Rhomboids', notes: 'Horizontal plane — gentler on shoulders.' },
      ],
      lower_back: [
        { name: 'Lat Pulldown', equipment: 'Cable machine', muscles: 'Lats, Biceps', notes: 'Seated — supported back position.' },
        { name: 'Seated Cable Row', equipment: 'Cable machine', muscles: 'Back, Biceps', notes: 'Supported seat removes spinal stress.' },
        { name: 'Machine Row', equipment: 'Machine', muscles: 'Back, Biceps', notes: 'Chest-supported is best for lower back.' },
      ],
      knee_injury: [
        { name: 'Lat Pulldown', equipment: 'Cable machine', muscles: 'Lats, Biceps', notes: 'Upper body only.' },
        { name: 'Assisted Pull-Up', equipment: 'Machine/Band', muscles: 'Lats, Biceps', notes: 'Knees can rest on pad.' },
        { name: 'Dumbbell Row', equipment: 'Dumbbell', muscles: 'Lats, Rhomboids', notes: 'Brace on bench — no leg involvement.' },
      ],
      no_dumbbells: [
        { name: 'Bodyweight Pull-Up', equipment: 'Pull-up bar', muscles: 'Lats, Biceps', notes: 'If bar available.' },
        { name: 'Lat Pulldown', equipment: 'Cable machine', muscles: 'Lats, Biceps', notes: 'Machine substitute.' },
        { name: 'Barbell Row', equipment: 'Barbell', muscles: 'Lats, Rhomboids, Biceps', notes: 'Heavy back work.' },
      ],
      no_cables: [
        { name: 'Pull-Up', equipment: 'Pull-up bar', muscles: 'Lats, Biceps', notes: 'Best vertical pull without cables.' },
        { name: 'Barbell Row', equipment: 'Barbell', muscles: 'Lats, Rhomboids', notes: 'Horizontal pull to compensate.' },
        { name: 'Dumbbell Row', equipment: 'Dumbbell', muscles: 'Lats, Rhomboids, Biceps', notes: 'Unilateral lat work.' },
      ],
    },
  },
}

const CONSTRAINT_LABELS: Record<Constraint, string> = {
  no_barbell: '🚫 No barbell',
  no_dumbbells: '🚫 No dumbbells',
  home_only: '🏠 Home only',
  shoulder_injury: '🩹 Shoulder injury',
  knee_injury: '🩹 Knee injury',
  lower_back: '🩹 Lower back pain',
  no_cables: '🚫 No cable machine',
}

export default function ExerciseSubstitution() {
  const [selectedExercise, setSelectedExercise] = useState('')
  const [selectedConstraint, setSelectedConstraint] = useState<Constraint | 'default'>('default')

  const exercises = Object.keys(SUBSTITUTIONS)
  const result = selectedExercise
    ? (SUBSTITUTIONS[selectedExercise]?.substitutes[selectedConstraint] ??
       SUBSTITUTIONS[selectedExercise]?.substitutes.default)
    : null

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-4 font-bold text-white">Find a Substitute</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-zinc-400">Exercise to replace</label>
            <select
              value={selectedExercise}
              onChange={(e) => setSelectedExercise(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"
            >
              <option value="">Select an exercise...</option>
              {exercises.map((ex) => (
                <option key={ex} value={ex}>{ex}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs text-zinc-400">Your limitation</label>
            <select
              value={selectedConstraint}
              onChange={(e) => setSelectedConstraint(e.target.value as Constraint | 'default')}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"
            >
              <option value="default">No specific limitation</option>
              {(Object.keys(CONSTRAINT_LABELS) as Constraint[]).map((c) => (
                <option key={c} value={c}>{CONSTRAINT_LABELS[c]}</option>
              ))}
            </select>
          </div>
        </div>

        {selectedExercise && (
          <p className="mt-3 text-xs text-zinc-500">
            Primary muscles: <span className="text-zinc-300">{SUBSTITUTIONS[selectedExercise]?.muscles}</span>
          </p>
        )}
      </div>

      {result && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-zinc-400">
            {selectedConstraint === 'default' ? 'General substitutes' : `Substitutes for: ${CONSTRAINT_LABELS[selectedConstraint as Constraint]}`}
          </h3>
          {result.map((ex, i) => (
            <div key={i} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-bold text-white">{ex.name}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{ex.muscles}</p>
                </div>
                <span className="shrink-0 rounded-full border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
                  {ex.equipment}
                </span>
              </div>
              <p className="mt-2 text-sm text-zinc-400">💡 {ex.notes}</p>
            </div>
          ))}
        </div>
      )}

      {!selectedExercise && (
        <div className="rounded-2xl border border-dashed border-zinc-700 p-8 text-center">
          <p className="text-zinc-500">Select an exercise to see substitutes</p>
        </div>
      )}
    </div>
  )
}
