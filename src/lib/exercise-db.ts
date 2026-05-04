import { readFileSync } from 'fs'
import path from 'path'

export type WgerExercise = {
  id: number
  slug: string
  name: string
  category: string
  muscles: string[]
  muscles_secondary: string[]
  equipment: string[]
  description: string
  image1: string | null
  image2: string | null
}

let _db: WgerExercise[] | null = null

function loadDb(): WgerExercise[] {
  if (_db) return _db
  try {
    const dbPath = path.join(process.cwd(), 'public', 'exercises', 'db.json')
    _db = JSON.parse(readFileSync(dbPath, 'utf-8'))
    return _db!
  } catch {
    return []
  }
}

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '')
}

export function lookupExercise(name: string): WgerExercise | null {
  const db = loadDb()
  const key = normalize(name)

  // 1. Exact match
  let match = db.find(e => normalize(e.name) === key)
  if (match) return match

  // 2. Starts with
  match = db.find(e => normalize(e.name).startsWith(key))
  if (match) return match

  // 3. Contains all words
  const words = name.toLowerCase().split(/\s+/).filter(w => w.length > 2)
  match = db.find(e => {
    const en = normalize(e.name)
    return words.every(w => en.includes(normalize(w)))
  })
  if (match) return match

  // 4. Most words match
  let best: WgerExercise | null = null
  let bestScore = 0
  for (const e of db) {
    const en = e.name.toLowerCase()
    const score = words.filter(w => en.includes(w)).length
    if (score > bestScore) { bestScore = score; best = e }
  }
  return bestScore >= 2 ? best : null
}

export function searchExercises(query: {
  category?: string
  muscle?: string
  equipment?: string[]
  hasImage?: boolean
  limit?: number
}): WgerExercise[] {
  const db = loadDb()
  let results = db

  if (query.hasImage) results = results.filter(e => e.image1)
  if (query.category) {
    const cat = query.category.toLowerCase()
    results = results.filter(e => e.category.toLowerCase().includes(cat))
  }
  if (query.muscle) {
    const m = query.muscle.toLowerCase()
    results = results.filter(e =>
      e.muscles.some(ms => ms.toLowerCase().includes(m)) ||
      e.muscles_secondary.some(ms => ms.toLowerCase().includes(m))
    )
  }
  if (query.equipment?.length) {
    results = results.filter(e =>
      query.equipment!.some(eq =>
        e.equipment.some(eeq => eeq.toLowerCase().includes(eq.toLowerCase()))
      )
    )
  }

  return results.slice(0, query.limit ?? 50)
}
