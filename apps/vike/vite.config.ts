import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
// import md from 'unplugin-vue-markdown/vite';
import vike from 'vike/plugin';
import { UserConfig } from 'vite';
// import { cjsInterop } from 'vite-plugin-cjs-interop'

const config: UserConfig = {
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    vike(),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    // md({}),
    // cjsInterop({
    //   dependencies: ['vue-toast-notification'],
    // }),
  ],
};

export default config;
