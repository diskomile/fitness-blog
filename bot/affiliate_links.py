"""
Affiliate product database.

URLs koriste Amazon search format koji uvijek radi.
Kada dobiješ Amazon Associates nalog, zamijeni search URL-ove sa
direktnim ASIN linkovima: https://www.amazon.com/dp/ASIN?tag=TVOJ_TAG
"""

import os
import urllib.parse

AMAZON_TAG = os.environ.get("AMAZON_TAG", "")


def build_amazon_search_url(query: str) -> str:
    """Gradi Amazon search URL koji uvijek radi."""
    encoded = urllib.parse.quote_plus(query)
    base = f"https://www.amazon.com/s?k={encoded}"
    if AMAZON_TAG:
        base += f"&tag={AMAZON_TAG}"
    return base


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
    """Return products for a category, falling back to supplements."""
    products = PRODUCTS.get(category, PRODUCTS.get("supplements", []))
    return [
        {**p, "url": build_amazon_search_url(p["search"]), "network": "amazon"}
        for p in products
    ]


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
