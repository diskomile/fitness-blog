"""
Affiliate product database.

Podržani programi:
- Amazon Associates (search URL format)
- ClickBank fitness programi (30-75% komisija)
- MyProtein affiliate (suplementi)

Kada dobiješ direktne affiliate linkove, zamijeni URL-ove ispod.
"""

import os
import urllib.parse

AMAZON_TAG = os.environ.get("AMAZON_TAG", "")
MYPROTEIN_TAG = os.environ.get("MYPROTEIN_TAG", "")  # Prijava: impact.com → MyProtein


def build_amazon_search_url(query: str) -> str:
    """Gradi Amazon UK search URL koji uvijek radi."""
    encoded = urllib.parse.quote_plus(query)
    tag = AMAZON_TAG or "ironpulse02-21"
    return f"https://www.amazon.co.uk/s?k={encoded}&tag={tag}"


def build_myprotein_url(path: str) -> str:
    """MyProtein affiliate URL. Registracija: impact.com → MyProtein."""
    base = f"https://www.myprotein.com{path}"
    if MYPROTEIN_TAG:
        base += f"?affil={MYPROTEIN_TAG}"
    return base


# ClickBank fitness programi — visoke komisije (30-75%)
# Registracija: clickbank.com → pronađi proizvod → generiši hoplink
CLICKBANK_PRODUCTS: dict[str, list[dict]] = {
    "workouts": [
        {
            "name": "Kinobody Aggressive Fat Loss Program",
            "url": "https://www.clickbank.com/search/#/search-results?query=kinobody+fat+loss",
            "price": "$47.00",
            "badge": "Top Rated",
            "network": "clickbank",
            "description": "Proven intermittent fasting + training system. 30-day money back guarantee.",
        },
        {
            "name": "Old School New Body F4X Training System",
            "url": "https://www.clickbank.com/search/#/search-results?query=old+school+new+body",
            "price": "$20.00",
            "badge": "Best Value",
            "network": "clickbank",
            "description": "Anti-aging fitness system for men and women over 35. Simple 4-day workout plan.",
        },
    ],
    "weight-loss": [
        {
            "name": "The Smoothie Diet 21-Day Program",
            "url": "https://www.clickbank.com/search/#/search-results?query=smoothie+diet+program",
            "price": "$37.00",
            "badge": "Best Seller",
            "network": "clickbank",
            "description": "21-day rapid weight loss program using healthy smoothie replacements.",
        },
        {
            "name": "Flat Belly Fix Program",
            "url": "https://www.clickbank.com/search/#/search-results?query=flat+belly+fix",
            "price": "$37.00",
            "badge": "Popular",
            "network": "clickbank",
            "description": "28-day belly fat elimination system with meal plans and workouts.",
        },
    ],
    "muscle-building": [
        {
            "name": "MI40 Muscle Intelligence Program",
            "url": "https://www.clickbank.com/search/#/search-results?query=MI40+muscle+program",
            "price": "$77.00",
            "badge": "Pro Pick",
            "network": "clickbank",
            "description": "Ben Pakulski's science-based muscle building system used by thousands.",
        },
    ],
    "nutrition": [
        {
            "name": "Custom Keto Diet Plan",
            "url": "https://www.clickbank.com/search/#/search-results?query=custom+keto+diet",
            "price": "$37.00",
            "badge": "Top Seller",
            "network": "clickbank",
            "description": "Personalized 8-week keto meal plan based on your body type and goals.",
        },
    ],
}


# Products organized by category
PRODUCTS: dict[str, list[dict]] = {
    "supplements": [
        {
            "name": "Optimum Nutrition Gold Standard 100% Whey Protein",
            "search": "Optimum Nutrition Gold Standard Whey Protein",
            "price": "$34.99",
            "badge": "Best Overall",
            "description": "The world's best-selling whey protein. 24g protein, 5.5g BCAAs, low fat and sugar per serving.",
        },
        {
            "name": "BulkSupplements Creatine Monohydrate Powder",
            "search": "BulkSupplements Creatine Monohydrate Powder",
            "price": "$19.96",
            "badge": "Best Value",
            "description": "Pure micronized creatine monohydrate. The most research-backed performance supplement available.",
        },
        {
            "name": "Optimum Nutrition Gold Standard Pre-Workout",
            "search": "Optimum Nutrition Gold Standard Pre Workout",
            "price": "$32.99",
            "badge": "Best Pre-Workout",
            "description": "175mg caffeine, creatine, beta-alanine, and citrulline for focus and performance.",
        },
        {
            "name": "NOW Sports ZMA Zinc Magnesium",
            "search": "NOW Sports ZMA Zinc Magnesium capsules",
            "price": "$14.99",
            "badge": "Budget Pick",
            "description": "Essential minerals for testosterone production, immunity, and recovery.",
        },
    ],
    "gear": [
        {
            "name": "Bowflex SelectTech 552 Adjustable Dumbbells",
            "search": "Bowflex SelectTech 552 Adjustable Dumbbells",
            "price": "$349.00",
            "badge": "Best Overall",
            "description": "Replace 15 sets of weights. Adjusts 5–52.5 lbs with a simple dial.",
        },
        {
            "name": "Sunny Health & Fitness Magnetic Rowing Machine",
            "search": "Sunny Health Fitness Magnetic Rowing Machine",
            "price": "$299.00",
            "badge": "Best Cardio",
            "description": "Quiet magnetic resistance rowing machine with LCD monitor and adjustable resistance.",
        },
        {
            "name": "CAP Barbell 300 lb Olympic Weight Set",
            "search": "CAP Barbell 300 lb Olympic Weight Set",
            "price": "$299.99",
            "badge": "Best Budget",
            "description": "300 lb Olympic barbell and plate set. Great starter kit for home gyms.",
        },
        {
            "name": "Gymreapers Lifting Wrist Straps",
            "search": "Gymreapers Lifting Wrist Straps weightlifting",
            "price": "$14.95",
            "badge": "Editor's Pick",
            "description": "Cotton lifting straps with neoprene padding. Improve grip on heavy pulls.",
        },
    ],
    "workouts": [
        {
            "name": "Fit Simplify Resistance Loop Exercise Bands",
            "search": "Fit Simplify Resistance Loop Exercise Bands Set",
            "price": "$15.95",
            "badge": "Best Value",
            "description": "5-band set covering light to heavy resistance. Portable and versatile for any workout.",
        },
        {
            "name": "WOD Nation Speed Jump Rope",
            "search": "WOD Nation Speed Jump Rope adjustable",
            "price": "$16.95",
            "badge": "Best Jump Rope",
            "description": "Speed cable jump rope with ball bearing system. Adjustable to any height.",
        },
        {
            "name": "Iron Gym Total Upper Body Workout Bar",
            "search": "Iron Gym Total Upper Body Workout Pull Up Bar",
            "price": "$29.99",
            "badge": "Best Pull-Up Bar",
            "description": "No-screw doorframe pull-up bar. Supports up to 300 lbs. Folds for easy storage.",
        },
    ],
    "nutrition": [
        {
            "name": "Athletic Greens AG1 Superfood Powder",
            "search": "Athletic Greens AG1 Superfood Powder",
            "price": "$99.00",
            "badge": "Premium Pick",
            "description": "75 vitamins, minerals, and whole food ingredients in one daily scoop.",
        },
        {
            "name": "RXBAR Whole Food Protein Bar Chocolate Sea Salt",
            "search": "RXBAR Protein Bar Chocolate Sea Salt 12 pack",
            "price": "$21.99",
            "badge": "Best Protein Bar",
            "description": "12g protein, no added sugar. Real food ingredients on the front of the package.",
        },
        {
            "name": "Etekcity Food Kitchen Scale Digital",
            "search": "Etekcity Food Kitchen Scale Digital grams ounces",
            "price": "$13.99",
            "badge": "Essential Tool",
            "description": "Precise 0.1g digital kitchen scale. The #1 tool for tracking macros accurately.",
        },
    ],
    "weight-loss": [
        {
            "name": "Transparent Labs Fat Burner Thermogenic",
            "search": "Transparent Labs Fat Burner Thermogenic supplement",
            "price": "$49.00",
            "badge": "Best Fat Burner",
            "description": "Clinically dosed thermogenic with green tea extract, synephrine, and theobromine.",
        },
        {
            "name": "Etekcity Food Scale Digital Kitchen",
            "search": "Etekcity Digital Food Kitchen Scale grams",
            "price": "$13.99",
            "badge": "Essential Tool",
            "description": "Precise 0.1g digital kitchen scale. The #1 tool for tracking calories accurately.",
        },
        {
            "name": "Optimum Nutrition L-Carnitine",
            "search": "Optimum Nutrition L-Carnitine 500mg capsules",
            "price": "$18.99",
            "badge": "Best Supplement",
            "description": "500mg L-Carnitine per serving. Supports fat metabolism and energy production.",
        },
    ],
    "muscle-building": [
        {
            "name": "Optimum Nutrition Serious Mass Weight Gainer",
            "search": "Optimum Nutrition Serious Mass Weight Gainer Protein",
            "price": "$59.99",
            "badge": "Best Mass Gainer",
            "description": "1,250 calories per serving with 50g protein. Ideal for hardgainers in a clean bulk.",
        },
        {
            "name": "Optimum Nutrition Micronized Creatine Monohydrate",
            "search": "Optimum Nutrition Micronized Creatine Monohydrate Powder",
            "price": "$29.99",
            "badge": "Best Creatine",
            "description": "5g pure creatine monohydrate per serving. Unflavored, mixes easily, proven to work.",
        },
        {
            "name": "MuscleTech Nitro-Tech Whey Protein",
            "search": "MuscleTech Nitro-Tech Whey Protein Powder",
            "price": "$44.99",
            "badge": "High Protein",
            "description": "30g protein, 3g creatine, 6.8g BCAAs per serving. Engineered for muscle building.",
        },
    ],
}


def get_products_for_category(category: str) -> list[dict]:
    """Return products for a category — miješa Amazon i ClickBank."""
    amazon = PRODUCTS.get(category, PRODUCTS.get("supplements", []))
    amazon_resolved = [
        {**p, "url": build_amazon_search_url(p["search"]), "network": "amazon"}
        for p in amazon
    ]
    clickbank = CLICKBANK_PRODUCTS.get(category, [])
    # Vrati Amazon + ClickBank zajedno (max 4 ukupno)
    return (amazon_resolved + clickbank)[:4]


def get_affiliate_box_mdx(product: dict) -> str:
    """Render a product as an MDX AffiliateBox component string."""
    name = product["name"].replace('"', '\\"')
    desc = product.get("description", "").replace('"', '\\"')
    return (
        f'<AffiliateBox\n'
        f'  productName="{name}"\n'
        f'  url="{product["url"]}"\n'
        f'  price="{product.get("price", "")}"\n'
        f'  badge="{product.get("badge", "")}"\n'
        f'  network="{product["network"]}"\n'
        f'  description="{desc}"\n'
        f'/>'
    )
