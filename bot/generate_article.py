#!/usr/bin/env python3
"""
IronPulse Fitness Blog — Article Generator Bot

Usage:
    python generate_article.py              # Generate and commit a random article
    python generate_article.py --dry-run   # Generate only, no git push
    python generate_article.py --category supplements --topic "Best Whey Protein"
"""

import argparse
import json
import os
import random
import re
import subprocess
import sys
from datetime import date
from pathlib import Path

from dotenv import load_dotenv
from groq import Groq

from affiliate_links import get_products_for_category
from prompts import SYSTEM_PROMPT, TOPIC_POOLS, build_article_prompt

load_dotenv()

CONTENT_DIR = Path(__file__).parent.parent / "content" / "posts"
CONTENT_DIR.mkdir(parents=True, exist_ok=True)

CATEGORIES = list(TOPIC_POOLS.keys())


def slugify(text: str) -> str:
    """Convert a title to a URL-safe slug."""
    text = text.lower()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text)
    text = re.sub(r"-+", "-", text)
    return text.strip("-")[:60]


def pick_topic(category: str, exclude_slugs: set[str]) -> tuple[str, str]:
    """Pick an unused topic from the pool for a category."""
    topics = TOPIC_POOLS.get(category, TOPIC_POOLS["supplements"])
    candidates = [t for t in topics if slugify(t) not in exclude_slugs]
    if not candidates:
        candidates = topics  # All used — allow repeats
    topic = random.choice(candidates)
    return topic, slugify(topic)


def get_existing_slugs() -> set[str]:
    """Return slugs of all existing posts to avoid duplicates."""
    slugs = set()
    for f in CONTENT_DIR.glob("*.mdx"):
        # Strip date prefix
        slug = re.sub(r"^\d{4}-\d{2}-\d{2}-", "", f.stem)
        slugs.add(slug)
    return slugs


def generate_article(
    topic: str,
    category: str,
    slug: str,
    today: str,
    client: Groq,
    existing_slugs: list[str] | None = None,
    model: str = "llama-3.3-70b-versatile",
) -> str:
    """Call Groq API and return the MDX article content."""
    products = get_products_for_category(category)
    prompt = build_article_prompt(
        topic=topic,
        category=category,
        products=products,
        slug=slug,
        date=today,
        existing_slugs=existing_slugs,
    )
    print(f"  Calling Groq ({model})...", flush=True)
    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt},
        ],
        temperature=0.72,
        max_tokens=8192,
    )
    return response.choices[0].message.content.strip()


def validate_frontmatter(content: str) -> bool:
    """Basic check that the article starts with valid YAML frontmatter."""
    return content.startswith("---") and content.count("---") >= 2


def write_post(slug: str, today: str, content: str) -> Path:
    """Write the MDX file to content/posts/ and return its path."""
    filename = f"{today}-{slug}.mdx"
    filepath = CONTENT_DIR / filename
    filepath.write_text(content, encoding="utf-8")
    print(f"  Written: {filepath}", flush=True)
    return filepath


def git_commit_push(filepath: Path, title: str, dry_run: bool) -> None:
    """Commit the new post file and push to origin."""
    repo_root = Path(__file__).parent.parent

    if dry_run:
        print("  [dry-run] Skipping git commit and push.")
        return

    subprocess.run(
        ["git", "add", str(filepath.relative_to(repo_root))],
        cwd=repo_root,
        check=True,
    )
    subprocess.run(
        ["git", "commit", "-m", f"bot: add article '{title}'"],
        cwd=repo_root,
        check=True,
    )
    subprocess.run(
        ["git", "push"],
        cwd=repo_root,
        check=True,
    )
    print("  Committed and pushed.", flush=True)


def main() -> None:
    parser = argparse.ArgumentParser(description="IronPulse Article Generator Bot")
    parser.add_argument("--dry-run", action="store_true", help="Generate only, skip git push")
    parser.add_argument("--category", default=None, help="Category slug (e.g. supplements)")
    parser.add_argument("--topic", default=None, help="Custom topic title")
    parser.add_argument("--model", default="llama-3.3-70b-versatile", help="Groq model name")
    args = parser.parse_args()

    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        print("ERROR: GROQ_API_KEY environment variable not set.", file=sys.stderr)
        sys.exit(1)

    client = Groq(api_key=api_key)
    today = date.today().isoformat()

    # Pick category
    category = args.category if args.category in CATEGORIES else random.choice(CATEGORIES)

    # Pick topic
    if args.topic:
        topic = args.topic
        slug = slugify(topic)
    else:
        existing_slugs = get_existing_slugs()
        topic, slug = pick_topic(category, existing_slugs)

    all_slugs = list(get_existing_slugs())

    print(f"\nGenerating article...")
    print(f"  Category : {category}")
    print(f"  Topic    : {topic}")
    print(f"  Slug     : {slug}")
    print(f"  Date     : {today}")
    print(f"  Existing : {len(all_slugs)} articles for internal linking")

    content = generate_article(
        topic=topic,
        category=category,
        slug=slug,
        today=today,
        client=client,
        existing_slugs=all_slugs,
        model=args.model,
    )

    if not validate_frontmatter(content):
        print("WARNING: Generated content may be missing valid frontmatter.", file=sys.stderr)
        print("--- Raw output (first 500 chars) ---")
        print(content[:500])

    filepath = write_post(slug, today, content)
    git_commit_push(filepath, topic, dry_run=args.dry_run)

    print(f"\nDone! Article saved to: {filepath}")


if __name__ == "__main__":
    main()
