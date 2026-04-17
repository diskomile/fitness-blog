export type Exercise = {
  name: string
  sets: number
  reps: string
  muscle: string
  tip: string
  gifUrl?: string
}

export type WorkoutDay = {
  label: string
  focus: string
  exercises: Exercise[]
}

export type WorkoutPlan = {
  slug: string
  name: string
  tagline: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  goal: string
  daysPerWeek: number
  color: string
  emoji: string
  description: string
  days: WorkoutDay[]
}

export const WORKOUT_PLANS: WorkoutPlan[] = [
  {
    slug: 'beginner',
    name: 'Beginner',
    tagline: 'Build your foundation',
    level: 'Beginner',
    goal: 'General Fitness',
    daysPerWeek: 3,
    color: 'emerald',
    emoji: '🌱',
    description:
      'A 3-day full-body program designed for those new to lifting. Focuses on mastering fundamental movement patterns with manageable volume.',
    days: [
      {
        label: 'Day 1',
        focus: 'Full Body A',
        exercises: [
          { name: 'Barbell Squat', sets: 3, reps: '8–10', muscle: 'Legs', tip: 'Keep chest up, knees tracking over toes.' },
          { name: 'Dumbbell Bench Press', sets: 3, reps: '10–12', muscle: 'Chest', tip: 'Lower slowly, press explosively.' },
          { name: 'Seated Cable Row', sets: 3, reps: '10–12', muscle: 'Back', tip: 'Squeeze shoulder blades together at the end.' },
        ],
      },
      {
        label: 'Day 2',
        focus: 'Full Body B',
        exercises: [
          { name: 'Romanian Deadlift', sets: 3, reps: '10–12', muscle: 'Hamstrings', tip: 'Hinge at hips, keep bar close to legs.' },
          { name: 'Overhead Press', sets: 3, reps: '8–10', muscle: 'Shoulders', tip: 'Brace core, avoid flaring elbows wide.' },
          { name: 'Lat Pulldown', sets: 3, reps: '10–12', muscle: 'Back', tip: 'Pull to upper chest, lean back slightly.' },
        ],
      },
      {
        label: 'Day 3',
        focus: 'Full Body C',
        exercises: [
          { name: 'Leg Press', sets: 3, reps: '12–15', muscle: 'Legs', tip: 'Full range of motion, don\'t lock knees.' },
          { name: 'Incline Dumbbell Press', sets: 3, reps: '10–12', muscle: 'Chest', tip: 'Set bench to 30–45°.' },
          { name: 'Dumbbell Row', sets: 3, reps: '10–12', muscle: 'Back', tip: 'Elbow drives up and back.' },
        ],
      },
    ],
  },
  {
    slug: 'bulk',
    name: 'Bulk',
    tagline: 'Maximum muscle growth',
    level: 'Intermediate',
    goal: 'Muscle Gain',
    daysPerWeek: 4,
    color: 'orange',
    emoji: '💪',
    description:
      'A 4-day upper/lower split optimised for hypertrophy. High volume, progressive overload, and strategic rest days to maximise muscle growth.',
    days: [
      {
        label: 'Day 1',
        focus: 'Upper A — Push focus',
        exercises: [
          { name: 'Barbell Bench Press', sets: 4, reps: '6–8', muscle: 'Chest', tip: 'Arch your back slightly, drive feet into floor.' },
          { name: 'Incline Dumbbell Press', sets: 3, reps: '10–12', muscle: 'Upper Chest', tip: 'Control the descent over 2–3 seconds.' },
          { name: 'Cable Lateral Raise', sets: 3, reps: '15–20', muscle: 'Shoulders', tip: 'Keep a slight bend in the elbow.' },
        ],
      },
      {
        label: 'Day 2',
        focus: 'Lower A — Squat focus',
        exercises: [
          { name: 'Barbell Back Squat', sets: 4, reps: '6–8', muscle: 'Quads', tip: 'Break parallel for full glute and quad activation.' },
          { name: 'Bulgarian Split Squat', sets: 3, reps: '10 each', muscle: 'Legs', tip: 'Front shin stays vertical at the bottom.' },
          { name: 'Leg Curl', sets: 3, reps: '12–15', muscle: 'Hamstrings', tip: 'Full extension on every rep.' },
        ],
      },
      {
        label: 'Day 3',
        focus: 'Upper B — Pull focus',
        exercises: [
          { name: 'Weighted Pull-Up', sets: 4, reps: '6–8', muscle: 'Back', tip: 'Dead hang at the bottom, chin over bar at top.' },
          { name: 'Barbell Row', sets: 3, reps: '8–10', muscle: 'Back', tip: 'Row to lower chest, keep back flat.' },
          { name: 'EZ-Bar Curl', sets: 3, reps: '10–12', muscle: 'Biceps', tip: 'No swinging — strict form only.' },
        ],
      },
      {
        label: 'Day 4',
        focus: 'Lower B — Deadlift focus',
        exercises: [
          { name: 'Conventional Deadlift', sets: 4, reps: '5–6', muscle: 'Full Body', tip: 'Push the floor away, don\'t think of it as pulling.' },
          { name: 'Hack Squat', sets: 3, reps: '10–12', muscle: 'Quads', tip: 'Place feet slightly forward for more depth.' },
          { name: 'Standing Calf Raise', sets: 4, reps: '15–20', muscle: 'Calves', tip: 'Pause at the top, full stretch at the bottom.' },
        ],
      },
    ],
  },
  {
    slug: 'cut',
    name: 'Cut',
    tagline: 'Burn fat, keep muscle',
    level: 'Intermediate',
    goal: 'Fat Loss',
    daysPerWeek: 5,
    color: 'blue',
    emoji: '🔥',
    description:
      'A 5-day Push/Pull/Legs split with added cardio finishers. Designed to preserve lean muscle mass while in a caloric deficit.',
    days: [
      {
        label: 'Day 1',
        focus: 'Push',
        exercises: [
          { name: 'Overhead Press', sets: 4, reps: '8–10', muscle: 'Shoulders', tip: 'Full lockout at the top.' },
          { name: 'Dips', sets: 3, reps: '12–15', muscle: 'Chest / Triceps', tip: 'Lean forward slightly for chest activation.' },
          { name: 'Tricep Pushdown', sets: 3, reps: '15–20', muscle: 'Triceps', tip: 'Keep elbows pinned to your sides.' },
        ],
      },
      {
        label: 'Day 2',
        focus: 'Pull',
        exercises: [
          { name: 'Pull-Up', sets: 4, reps: '8–10', muscle: 'Back', tip: 'Supinate grip for more bicep involvement.' },
          { name: 'Face Pull', sets: 3, reps: '15–20', muscle: 'Rear Delts', tip: 'Pull to forehead, elbows high.' },
          { name: 'Hammer Curl', sets: 3, reps: '12–15', muscle: 'Biceps', tip: 'Neutral grip targets brachialis.' },
        ],
      },
      {
        label: 'Day 3',
        focus: 'Legs + Cardio',
        exercises: [
          { name: 'Front Squat', sets: 4, reps: '8–10', muscle: 'Quads', tip: 'Keep elbows high to maintain an upright torso.' },
          { name: 'Walking Lunge', sets: 3, reps: '12 each', muscle: 'Legs', tip: 'Step long enough that your shin stays vertical.' },
          { name: 'Box Jump', sets: 3, reps: '10', muscle: 'Full Legs', tip: 'Land softly — absorb impact through your hips.' },
        ],
      },
      {
        label: 'Day 4',
        focus: 'Push',
        exercises: [
          { name: 'Cable Fly', sets: 4, reps: '12–15', muscle: 'Chest', tip: 'Cross cables at the end for full contraction.' },
          { name: 'Arnold Press', sets: 3, reps: '10–12', muscle: 'Shoulders', tip: 'Rotate palms outward as you press up.' },
          { name: 'Skull Crusher', sets: 3, reps: '12–15', muscle: 'Triceps', tip: 'Lower to forehead, elbows fixed.' },
        ],
      },
      {
        label: 'Day 5',
        focus: 'Pull + Abs',
        exercises: [
          { name: 'Seated Cable Row', sets: 4, reps: '10–12', muscle: 'Back', tip: 'Chest up, retract scapula at the end.' },
          { name: 'Reverse Fly', sets: 3, reps: '15–20', muscle: 'Rear Delts', tip: 'Light weight, squeeze at the top.' },
          { name: 'Hanging Leg Raise', sets: 3, reps: '15', muscle: 'Core', tip: 'Avoid swinging — controlled movement.' },
        ],
      },
    ],
  },
  {
    slug: 'strength',
    name: 'Strength',
    tagline: 'Get brutally strong',
    level: 'Intermediate',
    goal: 'Strength',
    daysPerWeek: 4,
    color: 'red',
    emoji: '⚡',
    description:
      'A 4-day powerlifting-style program built around the squat, bench, and deadlift. Low reps, heavy weight, long rest periods — pure strength.',
    days: [
      {
        label: 'Day 1',
        focus: 'Squat',
        exercises: [
          { name: 'Barbell Back Squat', sets: 5, reps: '3–5', muscle: 'Legs', tip: 'Build to a heavy top set, then back off.' },
          { name: 'Pause Squat', sets: 3, reps: '3', muscle: 'Legs', tip: '2-second pause at the bottom.' },
          { name: 'Leg Press', sets: 3, reps: '8–10', muscle: 'Quads', tip: 'Accessory volume for quad development.' },
        ],
      },
      {
        label: 'Day 2',
        focus: 'Bench',
        exercises: [
          { name: 'Barbell Bench Press', sets: 5, reps: '3–5', muscle: 'Chest', tip: 'Touch chest, pause, then press.' },
          { name: 'Close-Grip Bench Press', sets: 3, reps: '5–8', muscle: 'Triceps', tip: 'Hands shoulder-width, elbows tucked.' },
          { name: 'Dumbbell Row', sets: 3, reps: '8–10', muscle: 'Back', tip: 'Back accessory to balance pressing volume.' },
        ],
      },
      {
        label: 'Day 3',
        focus: 'Deadlift',
        exercises: [
          { name: 'Conventional Deadlift', sets: 5, reps: '3–5', muscle: 'Full Body', tip: 'Hook grip or straps for heavy sets.' },
          { name: 'Romanian Deadlift', sets: 3, reps: '6–8', muscle: 'Hamstrings', tip: 'Stretch hamstrings at the bottom.' },
          { name: 'Barbell Row', sets: 3, reps: '6–8', muscle: 'Back', tip: 'Overhand grip, row to belly button.' },
        ],
      },
      {
        label: 'Day 4',
        focus: 'Overhead Press',
        exercises: [
          { name: 'Overhead Press', sets: 5, reps: '3–5', muscle: 'Shoulders', tip: 'Press in a straight bar path — bar slightly back.' },
          { name: 'Weighted Dip', sets: 3, reps: '5–8', muscle: 'Chest / Triceps', tip: 'Stay upright for tricep focus.' },
          { name: 'Face Pull', sets: 3, reps: '15–20', muscle: 'Rear Delts', tip: 'Shoulder health — don\'t skip this.' },
        ],
      },
    ],
  },
  {
    slug: 'conditioning',
    name: 'Conditioning',
    tagline: 'Athletic performance',
    level: 'Intermediate',
    goal: 'Athleticism',
    daysPerWeek: 5,
    color: 'purple',
    emoji: '🏃',
    description:
      'A 5-day program combining strength work with explosive and cardio-based training. Builds functional fitness, endurance, and power.',
    days: [
      {
        label: 'Day 1',
        focus: 'Strength + Power',
        exercises: [
          { name: 'Power Clean', sets: 4, reps: '4–5', muscle: 'Full Body', tip: 'Explosive hip drive — shrug as the bar rises.' },
          { name: 'Barbell Squat', sets: 3, reps: '6–8', muscle: 'Legs', tip: 'Speed focus on the way up.' },
          { name: 'Box Jump', sets: 3, reps: '8', muscle: 'Legs', tip: 'Reset fully between reps.' },
        ],
      },
      {
        label: 'Day 2',
        focus: 'Cardio + Core',
        exercises: [
          { name: 'Rowing Machine', sets: 4, reps: '500m', muscle: 'Full Body', tip: 'Drive with legs first, then pull with arms.' },
          { name: 'Farmer\'s Carry', sets: 3, reps: '30m', muscle: 'Core / Grip', tip: 'Tall posture, controlled steps.' },
          { name: 'Plank', sets: 3, reps: '60 sec', muscle: 'Core', tip: 'Squeeze glutes and abs throughout.' },
        ],
      },
      {
        label: 'Day 3',
        focus: 'Upper Body',
        exercises: [
          { name: 'Pull-Up', sets: 4, reps: '8–10', muscle: 'Back', tip: 'Full range — dead hang to chin over bar.' },
          { name: 'Push-Up Variation', sets: 3, reps: '15–20', muscle: 'Chest', tip: 'Archer or clap push-ups for advanced.' },
          { name: 'Landmine Press', sets: 3, reps: '10 each', muscle: 'Shoulders', tip: 'Single-arm, rotational movement.' },
        ],
      },
      {
        label: 'Day 4',
        focus: 'HIIT',
        exercises: [
          { name: 'Kettlebell Swing', sets: 5, reps: '20', muscle: 'Posterior Chain', tip: 'Hip hinge — not a squat.' },
          { name: 'Battle Ropes', sets: 4, reps: '30 sec', muscle: 'Upper Body', tip: 'Alternate waves, full arm extension.' },
          { name: 'Burpee', sets: 3, reps: '15', muscle: 'Full Body', tip: 'Chest to floor each rep.' },
        ],
      },
      {
        label: 'Day 5',
        focus: 'Lower Body',
        exercises: [
          { name: 'Trap Bar Deadlift', sets: 4, reps: '6–8', muscle: 'Full Body', tip: 'More quad-friendly than conventional.' },
          { name: 'Step-Up', sets: 3, reps: '12 each', muscle: 'Legs', tip: 'Drive through the heel on top.' },
          { name: 'Sled Push', sets: 3, reps: '20m', muscle: 'Legs / Conditioning', tip: 'Low hips, fast steps.' },
        ],
      },
    ],
  },
  {
    slug: 'advanced',
    name: 'Advanced',
    tagline: 'Push your limits',
    level: 'Advanced',
    goal: 'Muscle & Strength',
    daysPerWeek: 6,
    color: 'yellow',
    emoji: '🏆',
    description:
      'A 6-day Push/Pull/Legs × 2 program for experienced lifters. High frequency, high volume, and advanced techniques like drop sets and supersets.',
    days: [
      {
        label: 'Day 1',
        focus: 'Push A',
        exercises: [
          { name: 'Barbell Bench Press', sets: 5, reps: '5–6', muscle: 'Chest', tip: 'Pause reps on last set for extra tension.' },
          { name: 'Incline Cable Fly', sets: 4, reps: '12–15', muscle: 'Upper Chest', tip: 'Superset with push-ups to failure.' },
          { name: 'Lateral Raise Drop Set', sets: 3, reps: '12+12+12', muscle: 'Shoulders', tip: 'Drop weight twice, no rest between drops.' },
        ],
      },
      {
        label: 'Day 2',
        focus: 'Pull A',
        exercises: [
          { name: 'Weighted Pull-Up', sets: 5, reps: '5–6', muscle: 'Back', tip: 'Add 10–20% bodyweight.' },
          { name: 'Chest-Supported Row', sets: 4, reps: '10–12', muscle: 'Mid Back', tip: 'Eliminates momentum for pure back work.' },
          { name: 'Incline Curl', sets: 3, reps: '10–12', muscle: 'Biceps', tip: 'Full stretch at the bottom.' },
        ],
      },
      {
        label: 'Day 3',
        focus: 'Legs A',
        exercises: [
          { name: 'Barbell Back Squat', sets: 5, reps: '4–6', muscle: 'Quads', tip: 'Work up to a heavy 5RM.' },
          { name: 'Leg Extension + Leg Curl Superset', sets: 4, reps: '12 each', muscle: 'Quads / Hamstrings', tip: 'No rest between the two moves.' },
          { name: 'Standing Calf Raise', sets: 5, reps: '15–20', muscle: 'Calves', tip: 'Slow eccentric, 2 seconds down.' },
        ],
      },
      {
        label: 'Day 4',
        focus: 'Push B',
        exercises: [
          { name: 'Overhead Press', sets: 4, reps: '6–8', muscle: 'Shoulders', tip: 'Strict form — no leg drive.' },
          { name: 'Dumbbell Fly', sets: 4, reps: '12–15', muscle: 'Chest', tip: 'Slight bend in elbows throughout.' },
          { name: 'Overhead Tricep Extension', sets: 3, reps: '12–15', muscle: 'Triceps', tip: 'Long head emphasis — great for arm size.' },
        ],
      },
      {
        label: 'Day 5',
        focus: 'Pull B',
        exercises: [
          { name: 'Barbell Row', sets: 4, reps: '6–8', muscle: 'Back', tip: 'Overhand, pull to lower chest.' },
          { name: 'Meadows Row', sets: 3, reps: '10 each', muscle: 'Lats', tip: 'Landmine attachment, great lat stretch.' },
          { name: 'Reverse Curl', sets: 3, reps: '12–15', muscle: 'Brachialis', tip: 'Builds arm thickness under the bicep.' },
        ],
      },
      {
        label: 'Day 6',
        focus: 'Legs B',
        exercises: [
          { name: 'Romanian Deadlift', sets: 4, reps: '8–10', muscle: 'Hamstrings', tip: 'Stretch is the key — feel it at the bottom.' },
          { name: 'Hack Squat', sets: 4, reps: '10–12', muscle: 'Quads', tip: 'Place feet low and close for quad focus.' },
          { name: 'Hip Thrust', sets: 4, reps: '12–15', muscle: 'Glutes', tip: 'Squeeze hard at the top for 1 second.' },
        ],
      },
    ],
  },
]

export function getPlanBySlug(slug: string): WorkoutPlan | undefined {
  return WORKOUT_PLANS.find((p) => p.slug === slug)
}

const colorMap: Record<string, string> = {
  emerald: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  orange: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  blue: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  red: 'text-red-400 bg-red-400/10 border-red-400/20',
  purple: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  yellow: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
}

export function getPlanColorClasses(color: string) {
  return colorMap[color] ?? colorMap.orange
}
