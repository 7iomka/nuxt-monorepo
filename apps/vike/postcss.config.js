export default {
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
        // console.log('fileName', fileName);
        return false;
      },
    },
  },
};
