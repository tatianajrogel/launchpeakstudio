import { ImageResponse } from 'next/og';

export const size = { width: 96, height: 96 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #FF6B5A, #FFA24A)',
          borderRadius: 20,
          color: '#ffffff',
          fontSize: 60,
          fontWeight: 800,
        }}
      >
        ▲
      </div>
    ),
    { ...size },
  );
}
