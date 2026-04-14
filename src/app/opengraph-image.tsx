import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'IronPulse Fitness'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#09090b',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
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
              'linear-gradient(to right, #f9731620 1px, transparent 1px), linear-gradient(to bottom, #f9731620 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Orange glow */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #f9731630 0%, transparent 70%)',
          }}
        />
        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
            <span style={{ fontSize: 56, fontWeight: 900, color: '#f97316' }}>Iron</span>
            <span style={{ fontSize: 56, fontWeight: 900, color: '#ffffff' }}>Pulse</span>
          </div>
          <p style={{ fontSize: 24, color: '#71717a', margin: 0 }}>
            Evidence-Based Fitness — Free Forever
          </p>
          <div
            style={{
              display: 'flex',
              gap: 24,
              marginTop: 40,
              fontSize: 18,
              color: '#a1a1aa',
            }}
          >
            <span>12 Free Tools</span>
            <span>·</span>
            <span>50+ Articles</span>
            <span>·</span>
            <span>6 Workout Plans</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
