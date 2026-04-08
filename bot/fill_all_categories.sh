#!/bin/bash
# Generise po jedan clanak za svaku kategoriju
# Pokretanje: bash fill_all_categories.sh
# Za dry-run (bez git pusha): bash fill_all_categories.sh --dry-run

CATEGORIES=("supplements" "gear" "workouts" "nutrition" "weight-loss" "muscle-building")
DRY_RUN=${1:-""}

echo "=== IronPulse: Punjenje svih kategorija ==="
echo ""

for category in "${CATEGORIES[@]}"; do
  echo ">>> Kategorija: $category"
  if [ "$DRY_RUN" == "--dry-run" ]; then
    python generate_article.py --category "$category" --dry-run
  else
    python generate_article.py --category "$category"
  fi
  echo ""
  sleep 3  # Pauza između API poziva
done

echo "=== Gotovo! ==="
