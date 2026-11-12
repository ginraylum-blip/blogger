Put your own font files here (.woff2 is best; .woff, .ttf and .otf also work).

Then in src/site.config.ts:

    fonts: {
      body:    { family: 'My Font', file: '/fonts/my-font.woff2' },
      heading: { family: 'My Font', file: '/fonts/my-font.woff2' },
    }

Only use fonts you're allowed to use on a website (check the font's license).
