#!/usr/bin/env python3
"""
BurnLab — Apply GIF Mapping to workout-plans.ts

After running download_exercise_gifs.py, run this script to
automatically insert gifUrl fields into workout-plans.ts.

Usage:
  python bot/apply_gif_mapping.py
"""

import json
import re
from pathlib import Path

MAPPING_FILE = Path(__file__).parent.parent / "public" / "exercises" / "mapping.json"
PLANS_FILE = Path(__file__).parent.parent / "src" / "lib" / "workout-plans.ts"


def main():
    if not MAPPING_FILE.exists():
        print("ERROR: mapping.json not found.")
        print("Run: python bot/download_exercise_gifs.py first")
        return

    mapping: dict[str, str] = json.loads(MAPPING_FILE.read_text())
    print(f"Loaded {len(mapping)} GIF mappings")

    content = PLANS_FILE.read_text(encoding="utf-8")
    original = content

    updated = 0

    for exercise_name, gif_path in mapping.items():
        # Match exercise entries that DON'T already have a gifUrl
        # Pattern: { name: 'Exercise Name', ...tip: '...' }  (no gifUrl)
        escaped = re.escape(exercise_name)
        pattern = (
            r"(\{\s*name:\s*'" + escaped + r"'(?:(?!gifUrl)[^}])*?)"
            r"(tip:\s*'[^']*')"
            r"(\s*\})"
        )

        def replacer(m, gif=gif_path):
            if 'gifUrl' in m.group(0):
                return m.group(0)
            return m.group(1) + m.group(2) + f", gifUrl: '{gif}'" + m.group(3)

        new_content = re.sub(pattern, replacer, content, flags=re.DOTALL)
        if new_content != content:
            content = new_content
            updated += 1
            print(f"  ✓ {exercise_name}")

    if updated == 0:
        print("No changes needed (already up to date or no matches found)")
        return

    PLANS_FILE.write_text(content, encoding="utf-8")
    print(f"\nUpdated {updated} exercises in workout-plans.ts")
    print("Commit and push to deploy.")


if __name__ == "__main__":
    main()
