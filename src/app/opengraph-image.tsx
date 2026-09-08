import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { site } from '@/content/site';

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const mark = await readFile(path.join(process.cwd(), 'src', 'app', 'apple-icon.png'));
  const markSrc = `data:image/png;base64,${mark.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #090c22 0%, #141a44 55%, #1d2166 100%)',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              width: 76,
              height: 76,
              borderRadius: 16,
              background: '#ffffff',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src={markSrc} alt="" width={58} height={58} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.01em' }}>
              {site.name}
            </div>
            <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>
              {site.tagline}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 600,
              lineHeight: 1.14,
              letterSpacing: '-0.03em',
              maxWidth: 920,
            }}
          >
            Run your business from clear numbers, not scattered spreadsheets.
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.45,
              color: 'rgba(255,255,255,0.68)',
              marginTop: 26,
              maxWidth: 840,
            }}
          >
            Dashboards, forecasts, and spreadsheet systems for small businesses that need clearer
            reporting and better visibility.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 56, height: 3, background: '#55b581' }} />
          <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.55)' }}>{site.url}</div>
        </div>
      </div>
    ),
    size,
  );
}
