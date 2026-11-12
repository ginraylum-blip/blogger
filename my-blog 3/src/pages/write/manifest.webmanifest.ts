import site from '../../site.config';

// Tells phones how to install the journal app on the home screen.
export function GET() {
  return new Response(
    JSON.stringify({
      name: `${site.title} Journal`,
      short_name: 'Journal',
      start_url: '/write/',
      scope: '/write/',
      display: 'standalone',
      background_color: site.colors.light.paper,
      theme_color: site.colors.light.paper,
      icons: [
        { src: '/write/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/write/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/write/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    }),
    { headers: { 'Content-Type': 'application/manifest+json' } },
  );
}
