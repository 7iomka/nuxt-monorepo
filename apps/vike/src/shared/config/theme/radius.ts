import type { ThemeConfig } from 'tailwindcss/types/config';

/**
 * Predefined radius aliased values
 */
export const radius = {
  // static (tailwind only)
  none: '0px',
  full: '9999px',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
} satisfies ThemeConfig['borderRadius'];

export const radiusKeys = Object.keys(radius) as (keyof typeof radius)[];
