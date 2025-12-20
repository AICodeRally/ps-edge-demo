import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'PS-Edge - Professional Services Platform'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'white',
              borderRadius: 24,
              fontSize: 60,
              fontWeight: 'bold',
              color: '#14b8a6',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}
          >
            PS
          </div>
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 20,
            textAlign: 'center',
            textShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          PS-Edge
        </div>
        <div
          style={{
            fontSize: 32,
            color: 'rgba(255,255,255,0.95)',
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.4,
            textShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          Professional Services Platform for Consulting Firms
        </div>
        <div
          style={{
            fontSize: 24,
            color: 'rgba(255,255,255,0.8)',
            marginTop: 30,
            display: 'flex',
            gap: 40,
          }}
        >
          <span>📊 Client Management</span>
          <span>🚀 Project Delivery</span>
          <span>💰 Billing & Revenue</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
