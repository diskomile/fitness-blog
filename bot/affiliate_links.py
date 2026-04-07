"""
Affiliate product database.
Add real Amazon ASINs and your affiliate tag here.
"""

import os

AMAZON_TAG = os.environ.get("AMAZON_TAG", "ironpulse-20")


def build_amazon_url(asin: str) -> str:
    return f"https://www.amazon.com/dp/{asin}?tag={AMAZON_TAG}"


# Products organized by category
PRODUCTS: dict[str, list[dict]] = {
    "supplements": [
        {
            "name": "Optimum Nutrition Gold Standard 100% Whey Protein",
            "asin": "B000QSNYGI",
            "price": "$34.99",
            "badge": "Best Overall",
            "description": "The world's best-selling whey protein. 24g protein, 5.5g BCAAs, low fat and sugar per serving.",
        },
        {
            "name": "Creatine Monohydrate Powder by BulkSupplements",
            "asin": "B00E9M4XEE",
            "price": "$19.96",
            "badge": "Best Value",
            "description": "Pure micronized creatine monohydrate. The most research-backed performance supplement available.",
        },
        {
            "name": "Optimum Nutrition Gold Standard Pre-Workout",
            "asin": "B07BTTX1T6",
            "price": "$32.99",
            "badge": "Best Pre-Workout",
            "description": "175mg caffeine, creatine, beta-alanine, and citrulline for focus and performance.",
        },
        {
            "name": "NOW Sports Zinc Gluconate",
            "asin": "B0016CDXRQ",
            "price": "$8.99",
            "badge": "Budget Pick",
            "description": "Essential mineral for testosterone production, immunity, and recovery.",
        },
    ],
    "gear": [
        {
            "name": "Bowflex SelectTech 552 Adjustable Dumbbells",
            "asin": "B001ARYU58",
            "price": "$349.00",
            "badge": "Best Overall",
            "description": "Replace 15 sets of weights. Adjusts 5–52.5 lbs with a simple dial.",
        },
        {
            "name": "Rogue Echo Bike",
            "asin": "B07XQXZXJV",
            "price": "$795.00",
            "badge": "Best Cardio",
            "description": "Heavy-duty fan bike with unlimited air resistance. Built for decades of use.",
        },
        {
            "name": "CAP Barbell Olympic Weight Set",
            "asin": "B000FDZIJG",
            "price": "$189.99",
            "badge": "Best Budget",
            "description": "110 lb Olympic barbell and plate set. Great starter kit for home gyms.",
        },
        {
            "name": "Gymreapers Lifting Straps",
            "asin": "B0748GT3H3",
            "price": "$14.95",
            "badge": "Editor's Pick",
            "description": "Cotton lifting straps with neoprene padding. Improve grip on heavy pulls.",
        },
    ],
    "workouts": [
        {
            "name": "Resistance Bands Set by Fit Simplify",
            "asin": "B01AVDVHTI",
            "price": "$15.95",
            "badge": "Best Value",
            "description": "5-band set covering light to heavy resistance. Portable and versatile for any workout.",
        },
        {
            "name": "Jump Rope by WOD Nation",
            "asin": "B01NAK7EL9",
            "price": "$16.95",
            "badge": "Best Jump Rope",
            "description": "Speed cable jump rope with ball bearing system. Adjustable to any height.",
        },
    ],
    "nutrition": [
        {
            "name": "Athletic Greens AG1 (Travel Packs)",
            "asin": "B08HQJR61Z",
            "price": "$99.00",
            "badge": "Premium Pick",
            "description": "75 vitamins, minerals, and whole food ingredients in one daily scoop.",
        },
        {
            "name": "RXBAR Whole Food Protein Bar, Chocolate Sea Salt",
            "asin": "B00JYQMKRU",
            "price": "$21.99",
            "badge": "Best Protein Bar",
            "description": "12g protein, no added sugar. Real food ingredients on the front of the package.",
        },
    ],
    "weight-loss": [
        {
            "name": "Transparent Labs PhysiqueSeries Fat Burner",
            "asin": "B07BNMJ2H8",
            "price": "$49.00",
            "badge": "Best Fat Burner",
            "description": "Clinically dosed thermogenic with green tea extract, synephrine, and theobromine.",
        },
        {
            "name": "Food Scale by Etekcity",
            "asin": "B073MGDNKK",
            "price": "$13.99",
            "badge": "Essential Tool",
            "description": "Precise 0.1g digital kitchen scale. The #1 tool for tracking calories accurately.",
        },
    ],
    "muscle-building": [
        {
            "name": "MuscleTech Mass-Tech Elite Mass Gainer",
            "asin": "B00R7F0EBQ",
            "price": "$59.99",
            "badge": "Best Mass Gainer",
            "description": "1000+ calories per serving with 80g protein. Ideal for hardgainers in a clean bulk.",
        },
        {
            "name": "Optimum Nutrition Micronized Creatine Monohydrate",
            "asin": "B002DYIZEO",
            "price": "$29.99",
            "badge": "Best Creatine",
            "description": "5g pure creatine monohydrate per serving. Unflavored, mixes easily, proven to work.",
        },
    ],
}


def get_products_for_category(category: str) -> list[dict]:
    """Return products for a category, falling back to supplements."""
    products = PRODUCTS.get(category, PRODUCTS.get("supplements", []))
    # Add resolved URLs
    return [
        {**p, "url": build_amazon_url(p["asin"]), "network": "amazon"}
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
