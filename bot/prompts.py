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
- Detailed and comprehensive — readers should not need to look elsewhere

Output format rules:
1. Output ONLY valid MDX — no explanations, no code fences around the whole article
2. Start with YAML frontmatter wrapped in ---
3. Use the exact frontmatter field names specified
4. Do NOT include JSX imports at the top — AffiliateBox, ProTip, and NewsletterCTA are globally available
5. Use GFM tables (| col | col |) for product comparisons
6. Use <AffiliateBox> components AFTER relevant H2 sections, not at the very top
7. Use <ProTip> for expert insights worth highlighting
8. Target word count: 2500–3500 words
9. Include a FAQ section near the end with 4-6 common questions and detailed answers
"""


def build_article_prompt(
    topic: str,
    category: str,
    products: list[dict],
    slug: str,
    date: str,
    existing_slugs: list[str] | None = None,
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

    # Internal links section — use all available slugs, pick most relevant
    internal_links_section = ""
    if existing_slugs:
        # Pass all slugs so the model can pick the most relevant ones
        sample = existing_slugs[:15]
        links_list = "\n".join(f"- /blog/{s}" for s in sample)
        internal_links_section = f"""
- Naturally link to 3-5 of these existing articles where contextually relevant (use markdown links with descriptive anchor text, not the slug as text):
{links_list}
- Only link where it genuinely adds value for the reader
"""

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
- Structure: intro → 5-7 H2 sections → FAQ section → conclusion
- After at least 2 of the H2 sections, insert one of these affiliate boxes (use them in context):

{affiliate_boxes}

- Include at least one GFM comparison table if reviewing multiple products
- Use <ProTip> for 2-3 genuinely useful expert insights
- Insert exactly one <NewsletterCTA /> component roughly halfway through the article (after 3rd or 4th H2 section)
- Include a ## Frequently Asked Questions section near the end with 4-6 Q&A pairs
- End with a practical conclusion paragraph (no "as a conclusion" phrasing)
- Target length: 2500-3500 words — be thorough and detailed
{internal_links_section}
Write the complete article now:"""


# Topic lists by category for rotation
TOPIC_POOLS: dict[str, list[str]] = {
    "supplements": [
        "Best Whey Protein Powders for Muscle Building",
        "Creatine Monohydrate: The Complete Guide",
        "Best Pre-Workout Supplements",
        "Does Caffeine Improve Athletic Performance?",
        "Best BCAA Supplements: Are They Worth It?",
        "Beta-Alanine: Benefits, Dosage, and Side Effects",
        "Best Protein Bars for Muscle Building",
        "Fish Oil Benefits for Athletes",
        "Zinc and Magnesium: Why Athletes Need ZMA",
        "Best Mass Gainers for Hardgainers",
        "Creatine vs Protein: What Should You Take First?",
        "Best Vegan Protein Powders",
        "Ashwagandha for Athletes: Does It Work?",
        "Vitamin D for Athletes: Benefits and Dosage",
        "Best Casein Protein Powders for Overnight Recovery",
        "Glutamine Supplements: Are They Worth Buying?",
        "Best Electrolyte Supplements for Endurance Athletes",
        "Collagen Peptides: Benefits for Joints and Recovery",
    ],
    "gear": [
        "Best Home Gym Equipment on a Budget",
        "Best Adjustable Dumbbells for Home Gyms",
        "Best Squat Racks for Home Gyms",
        "Best Resistance Bands for Strength Training",
        "Best Lifting Belts for Heavy Squats and Deadlifts",
        "Best Weightlifting Shoes",
        "Best Fitness Trackers",
        "Best Pull-Up Bars for Doorframes",
        "Best Foam Rollers for Recovery",
        "Best Jump Ropes for HIIT",
        "Best Gym Bags for Serious Lifters",
        "Best Wrist Wraps and Straps for Lifting",
        "Best Knee Sleeves for Squatting",
        "Best Workout Gloves: Do You Actually Need Them?",
        "Best Power Racks Under €500",
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
        "The Best 4-Day Workout Split for Hypertrophy",
        "How to Train When You Only Have 30 Minutes",
        "Deload Week: What It Is and Why You Need It",
        "How to Fix Muscle Imbalances",
        "Best Warm-Up Routine Before Lifting",
        "How to Train Around Injuries Without Losing Progress",
        "The Best Beginner Gym Routine: Week by Week",
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
        "Best Protein Sources for Vegetarians and Vegans",
        "How to Bulk Without Getting Fat",
        "Carb Cycling: What It Is and Does It Work?",
        "How to Track Macros Without Going Crazy",
        "The Best Foods to Eat Before Bed for Muscle Growth",
        "Alcohol and Muscle Building: How Bad Is It Really?",
        "How Many Meals Per Day Should You Eat?",
        "Reverse Dieting: How to Increase Calories Without Gaining Fat",
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
        "Why You Are Not Losing Weight Despite Eating Less",
        "Water Retention: Why You Weigh More Some Days",
        "How to Lose the Last 5kg: Advanced Fat Loss Strategies",
        "Body Recomposition: Lose Fat and Build Muscle Simultaneously",
        "How Much Cardio Do You Need for Fat Loss?",
        "The Best Diet for Fat Loss You Can Actually Stick To",
    ],
    "beginners": [
        "How to Start Going to the Gym: A Complete Beginner's Guide",
        "The Best Beginner Workout Plan for Men",
        "The Best Beginner Workout Plan for Women",
        "What to Eat When You First Start Working Out",
        "Gym Etiquette: 15 Rules Every Beginner Should Know",
        "How to Choose the Right Gym for You",
        "The Best Beginner Supplements: What to Take and What to Skip",
        "How to Track Your Workouts as a Beginner",
        "Common Beginner Gym Mistakes and How to Avoid Them",
        "How Long Does It Take to See Results from the Gym?",
        "Beginner's Guide to Protein: How Much Do You Need?",
        "How to Stay Motivated at the Gym When Progress Slows",
        "The Best Beginner Cardio Routine",
        "How to Set Realistic Fitness Goals as a Beginner",
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
        "How to Build Muscle as a Skinny Person",
        "Best Exercises for Building a Bigger Chest at Home",
        "How to Fix a Lagging Body Part",
        "Training Volume: How Many Sets Do You Actually Need?",
        "Rest Periods Between Sets: The Science-Based Guide",
        "How to Build Muscle After 40",
        "The Best Compound Exercises for Maximum Muscle Growth",
        "Mind-Muscle Connection: Does It Actually Work?",
    ],
}
