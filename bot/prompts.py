"""
Prompt templates for article generation.
"""

from affiliate_links import get_affiliate_box_mdx


SYSTEM_PROMPT = """You are an expert fitness writer and SEO specialist. You write authoritative, evidence-based articles about fitness, nutrition, supplements, and equipment.

Your writing style is:
- Confident and direct — no fluff or padding
- Backed by science but accessible to regular readers
- Honest about product pros AND cons
- Optimized for search engines without keyword stuffing

Output format rules:
1. Output ONLY valid MDX — no explanations, no code fences around the whole article
2. Start with YAML frontmatter wrapped in ---
3. Use the exact frontmatter field names specified
4. Do NOT include JSX imports at the top — AffiliateBox and ProTip are globally available
5. Use GFM tables (| col | col |) for product comparisons
6. Use <AffiliateBox> components AFTER relevant H2 sections, not at the very top
7. Use <ProTip> for expert insights worth highlighting
8. Target word count: 1500–2500 words
"""


def build_article_prompt(
    topic: str,
    category: str,
    products: list[dict],
    slug: str,
    date: str,
) -> str:
    # Build the affiliate boxes string
    affiliate_boxes = "\n\n".join(get_affiliate_box_mdx(p) for p in products[:3])

    # Build product list for frontmatter
    frontmatter_products = "\n".join(
        f'  - name: "{p["name"]}"\n'
        f'    url: "{p["url"]}"\n'
        f'    price: "{p.get("price", "")}"\n'
        f'    badge: "{p.get("badge", "")}"\n'
        f'    network: "{p["network"]}"'
        for p in products[:3]
    )

    return f"""Write a complete, publication-ready MDX fitness article on this topic:

TOPIC: {topic}
CATEGORY: {category}
SLUG: {slug}
DATE: {date}

Use this exact frontmatter structure:
---
title: "[write a compelling, SEO-optimized title for the topic]"
slug: "{slug}"
date: "{date}"
category: "{category}"
description: "[write a 120-155 character meta description with the primary keyword]"
tags: [list 4-6 relevant tags as YAML array]
affiliate_products:
{frontmatter_products}
---

Article requirements:
- Include the primary keyword in: title, first paragraph, 2-3 H2 headings, meta description
- Structure: intro → 4-6 H2 sections → conclusion
- After at least 2 of the H2 sections, insert one of these affiliate boxes (use them in context):

{affiliate_boxes}

- Include at least one GFM comparison table if reviewing multiple products
- Use <ProTip> for 1-2 genuinely useful expert insights
- End with a practical conclusion paragraph (no "as a conclusion" phrasing)
- Approximate word count: 1800-2200 words

Write the complete article now:"""


# Topic lists by category for rotation
TOPIC_POOLS: dict[str, list[str]] = {
    "supplements": [
        "Best Whey Protein Powders",
        "Creatine: The Ultimate Guide for Beginners",
        "Best Pre-Workout Supplements",
        "Does Caffeine Improve Athletic Performance?",
        "Best BCAA Supplements",
        "Beta-Alanine: Benefits, Dosage, and Side Effects",
        "Best Protein Bars for Muscle Building",
        "Fish Oil Benefits for Athletes",
        "Zinc and Magnesium: Why Athletes Need ZMA",
        "Best Mass Gainers for Hardgainers",
    ],
    "gear": [
        "Best Home Gym Equipment on a Budget",
        "Best Adjustable Dumbbells",
        "Best Squat Racks for Home Gyms",
        "Best Resistance Bands for Strength Training",
        "Best Lifting Belts for Heavy Squats and Deadlifts",
        "Best Weightlifting Shoes",
        "Best Fitness Trackers",
        "Best Pull-Up Bars for Doorframes",
        "Best Foam Rollers for Recovery",
        "Best Jump Ropes for HIIT",
    ],
    "workouts": [
        "5x5 Strength Program: The Complete Beginner Guide",
        "Best Full Body Workout Routine for Building Muscle",
        "How to Build a Push Pull Legs Routine",
        "HIIT Workouts for Fat Loss at Home",
        "How to Increase Your Deadlift in 8 Weeks",
        "Best Upper Body Workout Routine",
        "Progressive Overload: The Key to Continuous Gains",
        "How to Build Muscle with Calisthenics",
        "The Best Ab Workout for a Six Pack",
        "How to Get Stronger Without Gaining Weight",
    ],
    "nutrition": [
        "How Much Protein Do You Actually Need to Build Muscle?",
        "Best Meal Prep Ideas for Fitness",
        "How to Calculate Your TDEE and Macros",
        "Best High Protein Foods for Building Muscle",
        "Intermittent Fasting: Does It Work for Fat Loss?",
        "Best Pre-Workout Meals for Energy and Performance",
        "Post-Workout Nutrition: What to Eat After the Gym",
        "How to Eat on a Budget and Still Build Muscle",
        "The Best Protein Sources for Vegetarians and Vegans",
        "How to Bulk Without Getting Fat",
    ],
    "weight-loss": [
        "How to Lose Fat Without Losing Muscle",
        "Best Fat Burning Exercises for Beginners",
        "How to Create a Calorie Deficit Without Starving",
        "Best Cardio for Fat Loss: LISS vs HIIT",
        "How to Break a Weight Loss Plateau",
        "Best Diet Plans for Sustainable Fat Loss",
        "Does Intermittent Fasting Really Work?",
        "How Long Does It Take to Lose Belly Fat?",
        "Best Supplements for Fat Loss That Actually Work",
        "Why You're Not Losing Weight Despite Eating Less",
    ],
    "muscle-building": [
        "How to Build Muscle Fast: The Complete Science-Based Guide",
        "Best Exercises for Building a Bigger Back",
        "How to Get Bigger Arms: The Ultimate Guide",
        "Bulking vs Cutting: Which Should You Do First?",
        "Best Chest Exercises for Building Mass",
        "How Much Can You Realistically Gain in a Month?",
        "Best Leg Workout for Building Quad and Hamstring Mass",
        "How to Build Boulder Shoulders",
        "The Science of Muscle Hypertrophy Explained Simply",
        "How to Build Muscle as a Skinny Person (Hardgainer Guide)",
    ],
}
