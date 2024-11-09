import { rem } from './lib';
import { breakpointsClean } from './breakpoints';
import type { ScreensConfig } from 'tailwindcss/types/config';

export const containerMaxWidths = {
  min: rem(breakpointsClean.min),
  xs: rem(360),
  xsm: rem(375),
  xsl: rem(414),
  sm: rem(540),
  smd: rem(540),
  md: rem(720),
  lg: rem(960),
  xl: rem(1030),
  // xl: rem(1140),
  // lp: rem(1320),
  // xxl: rem(1320),
} satisfies ScreensConfig;

export const containerSetup = {
  center: true,
  padding: {
    DEFAULT: '1rem',
    md: '1.5rem',
    lg: '2.5rem',
  },
  screens: containerMaxWidths,
};
