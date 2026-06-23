'use client';

import { useEffect } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { CALCOM_LINK } from '@/data/studio';

export default function CalEmbed() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal('ui', {
        theme: 'light',
        hideEventTypeDetails: false,
        styles: { branding: { brandColor: '#FF6B5A' } },
      });
    })();
  }, []);

  return (
    <Cal
      calLink={CALCOM_LINK}
      style={{ width: '100%', height: '100%', minHeight: '620px', overflow: 'scroll' }}
      config={{ layout: 'month_view' }}
    />
  );
}
