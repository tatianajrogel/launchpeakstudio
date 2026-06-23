import { ImageResponse } from 'next/og';
import { STUDIO } from '@/data/studio';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = STUDIO.name;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: 'linear-gradient(135deg, #FF6B5A, #FFA24A)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 600, opacity: 0.9 }}>{STUDIO.location}</div>
        <div style={{ fontSize: 88, fontWeight: 800, marginTop: 16, lineHeight: 1.05 }}>
          {STUDIO.name}
        </div>
        <div style={{ fontSize: 40, marginTop: 16, maxWidth: 900 }}>{STUDIO.tagline}</div>
      </div>
    ),
    { ...size },
  );
}
