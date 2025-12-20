import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%)',
          borderRadius: '40px',
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            color: 'white',
            fontFamily: 'sans-serif',
          }}
        >
          PS
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
