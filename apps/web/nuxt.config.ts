import { fileURLToPath, URL } from 'node:url';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  srcDir: './src',

  // all dirs are relative to srcDir
  dir: {
    // directory we look for router.options.ts and spa-loading-template.html (<srcDir>/ by default)
    // make sure to have src/app.vue or src/app/index.vue as entry
    // app: 'app',
    // assets: 'assets', // not in use
    layouts: 'app/layouts',
    pages: 'app/pages',
    plugins: 'app/plugins',
    middleware: 'app/middleware',
  },

  components: [],

  // shadcn: {
  //   prefix: '',
  //   componentDir: 'src/shared/ui',
  // },
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url)),
    '~': fileURLToPath(new URL('./src', import.meta.url)),
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        paths: {
          // Order matter, prefer suggestions @/ instead of ~/
          '@/*': ['./src/*'],
          '@': ['./src'],
          // this will be ignored in suggestions but resolved if needed
          '~/*': ['./src/*'],
          '~': ['./src'],
          // Order matter, fixes wrong `#build/components` suggestions
          '#components': ['./.nuxt/components'],
        },
      },
    },
  },

  devtools: { enabled: false, componentInspector: false },

  modules: [
    // 'shadcn-nuxt',
    '@nuxtjs/tailwindcss', // 'nuxt-eslint-auto-explicit-import',
    '@nuxt/image',
    '@nuxt/eslint',
    // '@pinia/nuxt',
  ],

  routeRules: {
    '/': { prerender: true },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
    },
  },

  tailwindcss: {
    cssPath: ['@/shared/styles/common.css', { injectPosition: 'first' }],
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:3001',
    },
  },

  experimental: {
    defaults: {
      nuxtLink: {
        activeClass: 'is-active',
        exactActiveClass: 'is-exact-active',
      },
    },
  },
  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
      'postcss-inset': {},
      '@csstools/postcss-is-pseudo-class': {
        preserve: true, // preserve new :is syntax alongside with fallback one
      },
      'postcss-pxtorem': {
        rootValue: 16, // we use 1rem = 16px (browser's default)
        unitPrecision: 5,
        propList: ['*', '!letter-spacing'],
        /**
         * ignore html,body {} rule - fixes issue with min-width: 320px
         * ignore scrollbar styles - fixes big scrollbars
         */
        selectorBlackList: [
          /^html[^body]+body$/,
          /^\.container/,
          /::-webkit-scrollbar/,
          /:export/,
        ],
        replace: true,
        mediaQuery: false,
        minPixelValue: 1,
        // exclude: /node_modules/i
        exclude: () => {
          return false;
        },
      },
    },
  },

  compatibilityDate: '2024-10-04',

  vite: {
    build: {
      minify: true, // optimize inlined css
    },
  },
});
