#!/usr/bin/env python3
"""
BurnLab — wger.de Exercise Database Downloader

Downloads all English exercises + images from wger.de (open source, CC-BY-SA 4.0).
Saves images to public/exercises/ and builds a JSON database.

Usage:
  source bot/venv/bin/activate
  python3 bot/download_wger_exercises.py

Output:
  public/exercises/db.json          — full exercise database
  public/exercises/{slug}-1.png     — start position image
  public/exercises/{slug}-2.png     — end position image (if available)
"""

import json
import re
import sys
import time
from pathlib import Path

import requests

BASE_URL = "https://wger.de"
API = f"{BASE_URL}/api/v2"
EXERCISES_DIR = Path(__file__).parent.parent / "public" / "exercises"
DB_FILE = EXERCISES_DIR / "db.json"

SESSION = requests.Session()
SESSION.headers.update({"Accept": "application/json"})


def slugify(name: str) -> str:
    name = name.lower().strip()
    name = re.sub(r"[^\w\s-]", "", name)
    name = re.sub(r"[\s_]+", "-", name)
    name = re.sub(r"-+", "-", name)
    return name[:60].strip("-")


def fetch_all_exercises() -> list[dict]:
    """Fetch all English exercises with full info."""
    exercises = []
    url = f"{API}/exerciseinfo/?format=json&language=2&limit=100&offset=0"

    print("Fetching exercises from wger.de...")
    while url:
        try:
            r = SESSION.get(url, timeout=15)
            r.raise_for_status()
            data = r.json()
            batch = data.get("results", [])
            exercises.extend(batch)
            print(f"  Fetched {len(exercises)}/{data['count']}...", end="\r", flush=True)
            url = data.get("next")
            time.sleep(0.3)
        except Exception as e:
            print(f"\nError fetching exercises: {e}")
            break

    print(f"\nTotal exercises fetched: {len(exercises)}")
    return exercises


def fetch_all_images() -> dict[int, list[str]]:
    """Fetch all exercise images, returns {exercise_base_id: [url1, url2]}."""
    images: dict[int, list[str]] = {}
    url = f"{API}/exerciseimage/?format=json&limit=100&offset=0"

    print("Fetching exercise images...")
    total = 0
    while url:
        try:
            r = SESSION.get(url, timeout=15)
            r.raise_for_status()
            data = r.json()
            for img in data.get("results", []):
                ex_id = img.get("exercise")
                img_url = img.get("image", "")
                if ex_id and img_url:
                    if ex_id not in images:
                        images[ex_id] = []
                    images[ex_id].append(img_url)
                    total += 1
            url = data.get("next")
            time.sleep(0.2)
        except Exception as e:
            print(f"\nError fetching images: {e}")
            break

    print(f"Total images fetched: {total} for {len(images)} exercises")
    return images


def download_image(url: str, save_path: Path) -> bool:
    """Download an image and save it."""
    if save_path.exists():
        return True
    try:
        r = SESSION.get(url, timeout=20)
        if r.status_code == 200 and len(r.content) > 200:
            save_path.write_bytes(r.content)
            return True
    except Exception:
        pass
    return False


def clean_description(html: str) -> str:
    """Strip HTML tags from description."""
    text = re.sub(r"<[^>]+>", "", html or "")
    text = text.replace("&nbsp;", " ").replace("&amp;", "&").strip()
    return text[:500] if text else ""


def main():
    EXERCISES_DIR.mkdir(parents=True, exist_ok=True)

    # Load existing DB if present
    existing_db: dict[str, dict] = {}
    if DB_FILE.exists():
        try:
            existing_db = {e["slug"]: e for e in json.loads(DB_FILE.read_text())}
            print(f"Loaded existing DB: {len(existing_db)} exercises")
        except Exception:
            pass

    # Fetch data
    exercises = fetch_all_exercises()
    images_map = fetch_all_images()

    print(f"\nBuilding database and downloading images...")

    db: list[dict] = []
    downloaded = 0
    skipped = 0
    no_image = 0

    for ex in exercises:
        # Get English translation
        translations = ex.get("translations", [])
        en_trans = next((t for t in translations if t.get("language") == 2), None)
        if not en_trans:
            continue

        name = en_trans.get("name", "").strip()
        if not name:
            continue

        description = clean_description(en_trans.get("description", ""))
        slug = slugify(name)
        ex_id = ex.get("id")
        category = ex.get("category", {}).get("name", "")
        muscles = [m.get("name", "") for m in ex.get("muscles", [])]
        muscles_secondary = [m.get("name", "") for m in ex.get("muscles_secondary", [])]
        equipment = [e.get("name", "") for e in ex.get("equipment", [])]

        # Get images for this exercise
        img_urls = images_map.get(ex_id, [])
        img1_path = EXERCISES_DIR / f"{slug}-1.png"
        img2_path = EXERCISES_DIR / f"{slug}-2.png"

        img1_local = None
        img2_local = None

        if img_urls:
            if download_image(img_urls[0], img1_path):
                img1_local = f"/exercises/{slug}-1.png"
                downloaded += 1
            if len(img_urls) > 1:
                if download_image(img_urls[1], img2_path):
                    img2_local = f"/exercises/{slug}-2.png"
        else:
            no_image += 1

        entry = {
            "id": ex_id,
            "slug": slug,
            "name": name,
            "category": category,
            "muscles": muscles,
            "muscles_secondary": muscles_secondary,
            "equipment": equipment,
            "description": description,
            "image1": img1_local,
            "image2": img2_local,
        }
        db.append(entry)

        if ex_id % 50 == 0:
            # Save progress periodically
            DB_FILE.write_text(json.dumps(db, indent=2, ensure_ascii=False))

    # Final save
    DB_FILE.write_text(json.dumps(db, indent=2, ensure_ascii=False))

    print(f"\n{'='*50}")
    print(f"Total exercises: {len(db)}")
    print(f"With images:     {len(db) - no_image}")
    print(f"Without images:  {no_image}")
    print(f"DB saved to:     {DB_FILE}")
    print(f"\nDone! Run 'python3 bot/apply_wger_to_plans.py' to update workout plans.")


if __name__ == "__main__":
    main()
