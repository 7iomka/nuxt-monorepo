export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('render:html', (html) => {
    html.head.unshift(
      `
      <meta
        name="viewport"
        content="width=device-width, user-scalable=yes, initial-scale=1, maximum-scale=1"
      />
      <!-- Favicon stuff -->
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/static/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/static/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/static/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/static/favicon/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <link rel="shortcut icon" href="/static/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta
        name="msapplication-config"
        content="/static/favicon/browserconfig.xml"
      />
      <meta name="theme-color" content="#ffffff" />
      <style>
      @font-face {
        font-family: 'Adjusted Arial Fallback';
        src: local(Arial);
        size-adjust: 99%;
        ascent-override: 103%;
        descent-override: normal;
        line-gap-override: 0%;
      }
      /* ibm-plex-sans-200 - cyrillic-ext_latin-ext */
      @font-face {
        font-display: swap;
        font-family: 'IBM Plex Sans';
        font-style: normal;
        font-weight: 200;
        src: url('/static/fonts/ibm-plex-sans/ibm-plex-sans-v19-cyrillic-ext_latin-ext-200.woff2') format('woff2');
      }
      /* ibm-plex-sans-300 - cyrillic-ext_latin-ext */
      @font-face {
        font-display: swap;
        font-family: 'IBM Plex Sans';
        font-style: normal;
        font-weight: 300;
        src: url('/static/fonts/ibm-plex-sans/ibm-plex-sans-v19-cyrillic-ext_latin-ext-300.woff2') format('woff2');
      }
      /* ibm-plex-sans-regular - cyrillic-ext_latin-ext */
      @font-face {
        font-display: swap;
        font-family: 'IBM Plex Sans';
        font-style: normal;
        font-weight: 400;
        src: url('/static/fonts/ibm-plex-sans/ibm-plex-sans-v19-cyrillic-ext_latin-ext-regular.woff2') format('woff2');
      }
      /* ibm-plex-sans-italic - cyrillic-ext_latin-ext */
      @font-face {
        font-display: swap;
        font-family: 'IBM Plex Sans';
        font-style: italic;
        font-weight: 400;
        src: url('/static/fonts/ibm-plex-sans/ibm-plex-sans-v19-cyrillic-ext_latin-ext-italic.woff2') format('woff2');
      }
      /* ibm-plex-sans-500 - cyrillic-ext_latin-ext */
      @font-face {
        font-display: swap;
        font-family: 'IBM Plex Sans';
        font-style: normal;
        font-weight: 500;
        src: url('/static/fonts/ibm-plex-sans/ibm-plex-sans-v19-cyrillic-ext_latin-ext-500.woff2') format('woff2');
      }
      /* ibm-plex-sans-600 - cyrillic-ext_latin-ext */
      @font-face {
        font-display: swap;
        font-family: 'IBM Plex Sans';
        font-style: normal;
        font-weight: 600;
        src: url('/static/fonts/ibm-plex-sans/ibm-plex-sans-v19-cyrillic-ext_latin-ext-600.woff2') format('woff2');
      }
      /* ibm-plex-sans-700 - cyrillic-ext_latin-ext */
      @font-face {
        font-display: swap;
        font-family: 'IBM Plex Sans';
        font-style: normal;
        font-weight: 700;
        src: url('/static/fonts/ibm-plex-sans/ibm-plex-sans-v19-cyrillic-ext_latin-ext-700.woff2') format('woff2');
      }
      /* ibm-plex-sans-700italic - cyrillic-ext_latin-ext */
      @font-face {
        font-display: swap;
        font-family: 'IBM Plex Sans';
        font-style: italic;
        font-weight: 700;
        src: url('/static/fonts/ibm-plex-sans/ibm-plex-sans-v19-cyrillic-ext_latin-ext-700italic.woff2') format('woff2');
      }
      </style>
      `,
    );
  });
});
