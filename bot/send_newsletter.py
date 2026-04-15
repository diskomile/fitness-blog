#!/usr/bin/env python3
"""
BurnLab Weekly Newsletter Bot

Sends a weekly newsletter every Saturday with:
- Top 3 articles from the past week
- 1 featured deal
- 1 fitness tip

Usage:
    python send_newsletter.py              # Send newsletter
    python send_newsletter.py --dry-run   # Preview only, no send
"""

import argparse
import json
import os
import sys
from datetime import date, timedelta
from pathlib import Path

import requests
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

RESEND_API_KEY = os.environ.get("RESEND_API_KEY")
RESEND_AUDIENCE_ID = os.environ.get("RESEND_AUDIENCE_ID")
DEALS_FILE = Path(__file__).parent.parent / "content" / "deals.json"
CONTENT_DIR = Path(__file__).parent.parent / "content" / "posts"
SITE_URL = "https://burnlab.co.uk"
FROM_EMAIL = "BurnLab <newsletter@burnlab.co.uk>"


def get_recent_posts(count: int = 3) -> list[dict]:
    """Get the most recent MDX posts."""
    import re
    import yaml

    posts = []
    for f in sorted(CONTENT_DIR.glob("*.mdx"), reverse=True)[:10]:
        raw = f.read_text(encoding="utf-8")
        match = re.match(r"^---\n(.*?)\n---", raw, re.DOTALL)
        if match:
            try:
                fm = yaml.safe_load(match.group(1))
                posts.append({
                    "title": fm.get("title", ""),
                    "slug": fm.get("slug", ""),
                    "description": fm.get("description", ""),
                    "category": fm.get("category", ""),
                })
                if len(posts) >= count:
                    break
            except Exception:
                continue
    return posts


def get_featured_deal() -> dict | None:
    """Get the first deal from deals.json."""
    try:
        data = json.loads(DEALS_FILE.read_text(encoding="utf-8"))
        deals = data.get("deals", [])
        return deals[0] if deals else None
    except Exception:
        return None


def generate_tip(client: Groq) -> str:
    """Generate a short weekly fitness tip via Groq."""
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You are a fitness expert. Write concise, evidence-based tips."},
            {"role": "user", "content": "Write one short, actionable fitness tip (2-3 sentences max). Make it specific and useful. No fluff."},
        ],
        temperature=0.7,
        max_tokens=150,
    )
    return response.choices[0].message.content.strip()


def build_html(posts: list[dict], deal: dict | None, tip: str, week: str) -> str:
    articles_html = ""
    for p in posts:
        url = f"{SITE_URL}/blog/{p['slug']}"
        cat = p.get("category", "fitness").capitalize()
        articles_html += f"""
        <tr>
          <td style="padding: 16px 0; border-bottom: 1px solid #27272a;">
            <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 600; color: #f97316; text-transform: uppercase; letter-spacing: 0.05em;">{cat}</p>
            <a href="{url}" style="font-size: 16px; font-weight: 700; color: #ffffff; text-decoration: none;">{p['title']}</a>
            <p style="margin: 6px 0 10px 0; font-size: 14px; color: #a1a1aa;">{p['description']}</p>
            <a href="{url}" style="font-size: 13px; font-weight: 600; color: #f97316; text-decoration: none;">Read article →</a>
          </td>
        </tr>"""

    deal_html = ""
    if deal:
        deal_html = f"""
        <tr>
          <td style="padding: 24px 0;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 20px;">
              <tr>
                <td>
                  <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 600; color: #f97316; text-transform: uppercase;">Deal of the Week</p>
                  <p style="margin: 0 0 8px 0; font-size: 16px; font-weight: 700; color: #ffffff;">{deal['name']}</p>
                  <p style="margin: 0 0 12px 0; font-size: 14px; color: #a1a1aa;">{deal['description']}</p>
                  <p style="margin: 0 0 16px 0;">
                    <span style="font-size: 22px; font-weight: 800; color: #f97316;">{deal['dealPrice']}</span>
                    <span style="font-size: 14px; color: #52525b; text-decoration: line-through; margin-left: 8px;">{deal['originalPrice']}</span>
                    <span style="font-size: 12px; font-weight: 700; color: #22c55e; margin-left: 8px;">-{deal['discount']}</span>
                  </p>
                  <a href="{deal['url']}" style="background: #f97316; color: #ffffff; padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 700; text-decoration: none;">View Deal on Amazon →</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>"""

    return f"""<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin: 0; padding: 0; background: #09090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom: 32px; border-bottom: 1px solid #27272a;">
              <a href="{SITE_URL}" style="text-decoration: none; font-size: 24px; font-weight: 900;">
                <span style="color: #f97316;">Burn</span><span style="color: #ffffff;">Lab</span>
              </a>
              <p style="margin: 8px 0 0 0; font-size: 13px; color: #71717a;">Weekly Fitness Digest · {week}</p>
            </td>
          </tr>

          <!-- Tip -->
          <tr>
            <td style="padding: 24px 0; border-bottom: 1px solid #27272a;">
              <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: 600; color: #22c55e; text-transform: uppercase; letter-spacing: 0.05em;">💡 This Week's Tip</p>
              <p style="margin: 0; font-size: 15px; color: #d4d4d8; line-height: 1.6;">{tip}</p>
            </td>
          </tr>

          <!-- Articles -->
          <tr>
            <td style="padding-top: 24px;">
              <p style="margin: 0 0 16px 0; font-size: 11px; font-weight: 600; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.05em;">Latest Articles</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                {articles_html}
              </table>
            </td>
          </tr>

          <!-- Deal -->
          {deal_html}

          <!-- Footer -->
          <tr>
            <td style="padding-top: 32px; border-top: 1px solid #27272a;">
              <p style="margin: 0; font-size: 12px; color: #52525b; line-height: 1.6;">
                You're receiving this because you subscribed at <a href="{SITE_URL}" style="color: #f97316;">{SITE_URL}</a>.<br>
                <a href="{{{{unsubscribe}}}}" style="color: #71717a;">Unsubscribe</a> ·
                <a href="{SITE_URL}/privacy" style="color: #71717a;">Privacy Policy</a><br><br>
                * As an Amazon Associate we earn from qualifying purchases. Affiliate links above.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>"""


def send_newsletter(dry_run: bool = False) -> None:
    if not RESEND_API_KEY:
        print("ERROR: RESEND_API_KEY not set.", file=sys.stderr)
        sys.exit(1)

    client = Groq(api_key=os.environ.get("GROQ_API_KEY", ""))
    today = date.today()
    week_str = today.strftime("%B %d, %Y")

    print("Gathering content...", flush=True)
    posts = get_recent_posts(3)
    deal = get_featured_deal()
    tip = generate_tip(client)

    print(f"  Posts: {len(posts)}")
    print(f"  Deal: {deal['name'] if deal else 'none'}")
    print(f"  Tip: {tip[:60]}...")

    html = build_html(posts, deal, tip, week_str)
    subject = f"BurnLab Weekly: {posts[0]['title'][:50]}..." if posts else f"BurnLab Weekly Digest · {week_str}"

    if dry_run:
        print("\n[dry-run] Email preview:")
        print(f"Subject: {subject}")
        print(f"HTML length: {len(html)} chars")
        print("Skipping send.")
        return

    # Send via Resend broadcast to audience
    response = requests.post(
        "https://api.resend.com/broadcasts",
        headers={
            "Authorization": f"Bearer {RESEND_API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "audience_id": RESEND_AUDIENCE_ID,
            "from": FROM_EMAIL,
            "subject": subject,
            "html": html,
            "name": f"BurnLab Weekly {week_str}",
        },
    )

    if response.status_code in (200, 201):
        data = response.json()
        broadcast_id = data.get("id")
        print(f"  Broadcast created: {broadcast_id}")

        # Send the broadcast
        send_response = requests.post(
            f"https://api.resend.com/broadcasts/{broadcast_id}/send",
            headers={"Authorization": f"Bearer {RESEND_API_KEY}"},
            json={},
        )
        if send_response.status_code in (200, 201):
            print("  Newsletter sent successfully.")
        else:
            print(f"  Send failed: {send_response.status_code} {send_response.text}", file=sys.stderr)
    else:
        print(f"  ERROR: {response.status_code} {response.text}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="BurnLab Weekly Newsletter")
    parser.add_argument("--dry-run", action="store_true", help="Preview only, skip sending")
    args = parser.parse_args()
    send_newsletter(dry_run=args.dry_run)
