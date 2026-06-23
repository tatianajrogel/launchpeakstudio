import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #FF6B5A, #FFA24A)',
          color: '#ffffff',
          fontSize: 110,
          fontWeight: 800,
          fontFamily: 'sans-serif',
        }}
      >
        &#9650;
      </div>
    ),
    { ...size },
  );
}
