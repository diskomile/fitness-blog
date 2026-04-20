#!/usr/bin/env python3
"""
BurnLab — Exercise GIF Downloader

Downloads animated GIFs for all exercises in workout-plans.ts
from ExerciseDB (free tier: 100 req/day).

Setup:
  1. Go to https://rapidapi.com and create a free account
  2. Search for "ExerciseDB" and subscribe (free plan)
  3. Copy your RapidAPI key
  4. Run: RAPIDAPI_KEY=your_key python bot/download_exercise_gifs.py

GIFs are saved to: public/exercises/
Mapping is saved to: public/exercises/mapping.json
"""

import json
import os
import re
import sys
import time
from pathlib import Path

import requests

RAPIDAPI_KEY = os.environ.get("RAPIDAPI_KEY", "")
EXERCISES_DIR = Path(__file__).parent.parent / "public" / "exercises"
MAPPING_FILE = EXERCISES_DIR / "mapping.json"

HEADERS = {
    "X-RapidAPI-Key": RAPIDAPI_KEY,
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
}

# All exercises from workout-plans.ts
EXERCISES = [
    # Beginner
    "Barbell Squat",
    "Dumbbell Bench Press",
    "Seated Cable Row",
    "Romanian Deadlift",
    "Overhead Press",
    "Lat Pulldown",
    "Leg Press",
    "Incline Dumbbell Press",
    "Dumbbell Row",
    # Bulk
    "Barbell Bench Press",
    "Cable Lateral Raise",
    "Barbell Back Squat",
    "Bulgarian Split Squat",
    "Leg Curl",
    "Weighted Pull-Up",
    "Barbell Row",
    "EZ-Bar Curl",
    "Conventional Deadlift",
    "Hack Squat",
    "Standing Calf Raise",
    # Cut
    "Dips",
    "Tricep Pushdown",
    "Pull-Up",
    "Face Pull",
    "Hammer Curl",
    "Front Squat",
    "Walking Lunge",
    "Box Jump",
    "Cable Fly",
    "Arnold Press",
    "Skull Crusher",
    "Reverse Fly",
    "Hanging Leg Raise",
    # Strength
    "Pause Squat",
    "Close-Grip Bench Press",
    "Weighted Dip",
    # Conditioning
    "Power Clean",
    "Rowing Machine",
    "Farmer's Carry",
    "Plank",
    "Push-Up Variation",
    "Landmine Press",
    "Kettlebell Swing",
    "Battle Ropes",
    "Burpee",
    "Trap Bar Deadlift",
    "Step-Up",
    "Sled Push",
    # Advanced
    "Incline Cable Fly",
    "Lateral Raise Drop Set",
    "Chest-Supported Row",
    "Incline Curl",
    "Leg Extension",
    "Overhead Tricep Extension",
    "Dumbbell Fly",
    "Meadows Row",
    "Reverse Curl",
    "Hip Thrust",
]


def slugify(name: str) -> str:
    name = name.lower()
    name = re.sub(r"[^\w\s-]", "", name)
    name = re.sub(r"[\s_]+", "-", name)
    return name.strip("-")


def search_exercise(name: str) -> dict | None:
    """Search ExerciseDB for an exercise by name."""
    url = f"https://exercisedb.p.rapidapi.com/exercises/name/{name.lower()}"
    try:
        response = requests.get(url, headers=HEADERS, timeout=10)
        if response.status_code == 200:
            results = response.json()
            if results:
                return results[0]  # Return first match
        elif response.status_code == 429:
            print(f"  Rate limited — waiting 60s...")
            time.sleep(60)
            return search_exercise(name)
    except Exception as e:
        print(f"  Error searching '{name}': {e}")
    return None


def download_gif(gif_url: str, save_path: Path) -> bool:
    """Download a GIF from URL and save locally."""
    try:
        response = requests.get(gif_url, timeout=30, stream=True)
        if response.status_code == 200:
            save_path.write_bytes(response.content)
            return True
    except Exception as e:
        print(f"  Download error: {e}")
    return False


def main():
    if not RAPIDAPI_KEY:
        print("ERROR: RAPIDAPI_KEY not set.")
        print("Get your free key at: https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb")
        sys.exit(1)

    EXERCISES_DIR.mkdir(parents=True, exist_ok=True)

    # Load existing mapping
    mapping: dict[str, str] = {}
    if MAPPING_FILE.exists():
        mapping = json.loads(MAPPING_FILE.read_text())
        print(f"Loaded existing mapping: {len(mapping)} exercises")

    unique_exercises = list(dict.fromkeys(EXERCISES))  # deduplicate, preserve order
    print(f"\nDownloading GIFs for {len(unique_exercises)} exercises...\n")

    success = 0
    failed = []

    for i, exercise in enumerate(unique_exercises, 1):
        slug = slugify(exercise)
        gif_path = EXERCISES_DIR / f"{slug}.gif"

        print(f"[{i}/{len(unique_exercises)}] {exercise}", end=" ", flush=True)

        # Skip if already downloaded
        if gif_path.exists() and slug in mapping:
            print("✓ (cached)")
            success += 1
            continue

        # Search ExerciseDB
        result = search_exercise(exercise)
        if not result:
            print(f"✗ (not found)")
            failed.append(exercise)
            time.sleep(0.5)
            continue

        gif_url = result.get("gifUrl", "")
        if not gif_url:
            print(f"✗ (no gif)")
            failed.append(exercise)
            continue

        # Download GIF
        if download_gif(gif_url, gif_path):
            size_kb = gif_path.stat().st_size // 1024
            mapping[exercise] = f"/exercises/{slug}.gif"
            print(f"✓ ({size_kb}KB)")
            success += 1
        else:
            print(f"✗ (download failed)")
            failed.append(exercise)

        # Save mapping after each download
        MAPPING_FILE.write_text(json.dumps(mapping, indent=2, ensure_ascii=False))

        # Rate limit: ~1 req/sec to stay safe
        time.sleep(1.0)

    # Final report
    print(f"\n{'='*50}")
    print(f"Downloaded: {success}/{len(unique_exercises)}")
    if failed:
        print(f"Failed ({len(failed)}): {', '.join(failed)}")
    print(f"Mapping saved: {MAPPING_FILE}")
    print(f"\nNext step: run 'python bot/apply_gif_mapping.py' to update workout-plans.ts")


if __name__ == "__main__":
    main()
