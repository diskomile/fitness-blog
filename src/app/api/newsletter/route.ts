import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // Add contact to Resend audience
    await resend.contacts.create({
      email,
      audienceId: process.env.RESEND_AUDIENCE_ID ?? '',
      unsubscribed: false,
    })

    // Send welcome email
    await resend.emails.send({
      from: 'IronPulse Fitness <newsletter@ironpulsefitness.com>',
      to: email,
      subject: '💪 Welcome to IronPulse Fitness!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #09090b; color: #f4f4f5; padding: 40px 24px; border-radius: 16px;">
          <h1 style="color: #f97316; font-size: 28px; margin-bottom: 8px;">Welcome to IronPulse! 🔥</h1>
          <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6;">
            You're now part of a community that takes training seriously. Here's what you'll get:
          </p>
          <ul style="color: #d4d4d8; font-size: 15px; line-height: 2;">
            <li>📰 New evidence-based fitness articles every 2 days</li>
            <li>💊 Honest supplement reviews and comparisons</li>
            <li>🏋️ Workout tips, plans, and free tools</li>
            <li>🎯 Exclusive guides for subscribers only</li>
          </ul>
          <a href="https://ironpulsefitness.com/blog"
            style="display: inline-block; margin-top: 24px; background: #f97316; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 15px;">
            Read Latest Articles →
          </a>
          <p style="margin-top: 32px; color: #52525b; font-size: 12px;">
            You can unsubscribe at any time by clicking the link below.<br/>
            IronPulse Fitness · Evidence-based training & nutrition
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Newsletter error:', error)
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}
