import type { Config } from 'tailwindcss';

import { tailwindConfig } from './src/shared/config/tailwind-config'; // aliases don't work here ;-(

export default {
  ...tailwindConfig,
  content: ['./src/**/*.{ts,tsx,vue,md}'],
} satisfies Config;
