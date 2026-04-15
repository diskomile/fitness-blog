import { ImageResponse } from 'next/og'
import { getPostBySlug } from '@/lib/posts'

export const alt = 'BurnLab Fitness Article'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const categoryColors: Record<string, string> = {
  supplements: '#f97316',
  workouts: '#22c55e',
  nutrition: '#3b82f6',
  gear: '#a855f7',
  'weight-loss': '#ef4444',
  'muscle-building': '#f59e0b',
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  const title = post?.title ?? 'BurnLab Fitness Article'
  const category = post?.category ?? 'fitness'
  const accentColor = categoryColors[category] ?? '#f97316'

  // Truncate long titles
  const displayTitle = title.length > 72 ? title.slice(0, 69) + '...' : title

  return new ImageResponse(
    (
      <div
        style={{
          background: '#09090b',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(to right, #f9731610 1px, transparent 1px), linear-gradient(to bottom, #f9731610 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Accent glow bottom-left */}
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accentColor}25 0%, transparent 70%)`,
          }}
        />

        {/* Top: logo + category */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 28, fontWeight: 900, color: '#f97316' }}>Burn</span>
            <span style={{ fontSize: 28, fontWeight: 900, color: '#ffffff' }}>Lab</span>
          </div>
          <div
            style={{
              background: accentColor + '20',
              border: `1px solid ${accentColor}50`,
              borderRadius: 999,
              padding: '6px 16px',
              fontSize: 16,
              color: accentColor,
              fontWeight: 600,
              textTransform: 'capitalize',
            }}
          >
            {category.replace('-', ' ')}
          </div>
        </div>

        {/* Middle: title */}
        <div style={{ zIndex: 1, flex: 1, display: 'flex', alignItems: 'center' }}>
          <h1
            style={{
              fontSize: displayTitle.length > 50 ? 44 : 54,
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {displayTitle}
          </h1>
        </div>

        {/* Bottom: url */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, zIndex: 1 }}>
          <div style={{ width: 4, height: 24, background: accentColor, borderRadius: 2 }} />
          <span style={{ fontSize: 18, color: '#71717a' }}>burnlab.co.uk</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
