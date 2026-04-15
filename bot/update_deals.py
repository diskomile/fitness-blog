#!/usr/bin/env python3
"""
BurnLab Deals Updater Bot

Generates fresh fitness deals every 3 days using Groq API.
Updates content/deals.json with new Amazon UK affiliate links.

Usage:
    python update_deals.py              # Update deals and commit
    python update_deals.py --dry-run   # Update only, no git push
"""

import argparse
import json
import os
import re
import subprocess
import sys
from datetime import date, timedelta
from pathlib import Path

from dotenv import load_dotenv
from groq import Groq

load_dotenv()

DEALS_FILE = Path(__file__).parent.parent / "content" / "deals.json"
AMAZON_TAG = os.environ.get("AMAZON_TAG", "ironpulse02-21")

DEALS_SYSTEM_PROMPT = """You are a fitness deals curator. You find and present the best value fitness products available on Amazon UK.

Output format rules:
1. Output ONLY valid JSON — no explanations, no code fences
2. Follow the exact schema provided
3. Use realistic UK prices (GBP £)
4. Discounts should be between 15% and 50%
5. Products must be real, popular fitness items available on Amazon UK
6. Mix categories: supplements (3), gear (2), nutrition (1)
"""


def build_deals_prompt(today: str, amazon_tag: str) -> str:
    expires = (date.fromisoformat(today) + timedelta(days=3)).isoformat()
    return f"""Generate 6 fresh fitness deals for Amazon UK. Today is {today}.

Return ONLY a JSON object with this exact structure:
{{
  "last_updated": "{today}",
  "deals": [
    {{
      "id": "unique-kebab-case-id",
      "name": "Full product name",
      "category": "supplements|gear|nutrition|workouts",
      "badge": "Best Value|Sale|Top Pick|Editor's Pick|Popular|Best Seller",
      "originalPrice": "£XX.XX",
      "dealPrice": "£XX.XX",
      "discount": "XX%",
      "url": "https://www.amazon.co.uk/s?k=url+encoded+search+query&tag={amazon_tag}",
      "description": "One sentence describing the product and why it's good value.",
      "expires": "{expires}"
    }}
  ]
}}

Requirements:
- 3 supplement deals (whey protein, creatine, pre-workout, BCAAs, vitamins, etc.)
- 2 gear deals (resistance bands, dumbbells, straps, gym bag, foam roller, etc.)
- 1 nutrition deal (protein bars, meal prep containers, food scale, etc.)
- All URLs must use Amazon UK (amazon.co.uk) search format with tag={amazon_tag}
- Prices in GBP, realistic for UK market
- Discounts between 15-50%
- Different products from previous batches — rotate variety

Generate the JSON now:"""


def update_deals(dry_run: bool = False) -> None:
    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        print("ERROR: GROQ_API_KEY not set.", file=sys.stderr)
        sys.exit(1)

    client = Groq(api_key=api_key)
    today = date.today().isoformat()

    print(f"Updating deals for {today}...", flush=True)

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": DEALS_SYSTEM_PROMPT},
            {"role": "user", "content": build_deals_prompt(today, AMAZON_TAG)},
        ],
        temperature=0.5,
        max_tokens=2048,
    )

    raw = response.choices[0].message.content.strip()

    # Strip code fences if present
    raw = re.sub(r"^```(?:json)?\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw)

    try:
        deals_data = json.loads(raw)
    except json.JSONDecodeError as e:
        print(f"ERROR: Failed to parse JSON response: {e}", file=sys.stderr)
        print(f"Raw response:\n{raw[:500]}", file=sys.stderr)
        sys.exit(1)

    # Validate structure
    if "deals" not in deals_data or not isinstance(deals_data["deals"], list):
        print("ERROR: Invalid deals structure.", file=sys.stderr)
        sys.exit(1)

    # Ensure last_updated is set
    deals_data["last_updated"] = today

    DEALS_FILE.write_text(json.dumps(deals_data, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"  Written: {DEALS_FILE}", flush=True)
    print(f"  Deals count: {len(deals_data['deals'])}", flush=True)

    if dry_run:
        print("  [dry-run] Skipping git commit and push.")
        return

    repo_root = Path(__file__).parent.parent
    subprocess.run(["git", "add", "content/deals.json"], cwd=repo_root, check=True)
    subprocess.run(
        ["git", "commit", "-m", f"bot: update deals {today}"],
        cwd=repo_root,
        check=True,
    )
    subprocess.run(["git", "push"], cwd=repo_root, check=True)
    print("  Committed and pushed.", flush=True)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="BurnLab Deals Updater")
    parser.add_argument("--dry-run", action="store_true", help="Update file only, skip git push")
    args = parser.parse_args()
    update_deals(dry_run=args.dry_run)
