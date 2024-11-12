import { rem } from './lib';

const shadowConfig = {
  // from mantine
  xs: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
  sm: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 10px 15px -5px, rgba(0, 0, 0, 0.04) 0px 7px 7px -5px',
  md: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
  lg: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 28px 23px -7px, rgba(0, 0, 0, 0.04) 0px 12px 12px -7px',
  xl: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 36px 28px -7px, rgba(0, 0, 0, 0.04) 0px 17px 17px -7px',
  // tailwind specific
  base: '0 1px 8px rgb(0, 0, 0, 0.06), 0 2px 4px rgb(0, 0, 0, 0.12)',
  outline: '0 0 0 3px rgba(253,177,0,0.6)',
  inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
  none: 'none',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  // old (deprecated)
  // xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
  // sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  // base: '0 1px 8px rgb(0, 0, 0, 0.06), 0 2px 4px rgb(0, 0, 0, 0.12)',
  // md: '0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  // lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  // xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1),0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  // '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
};

/**
 * Shadow config in rem units
 */
export const shadow = Object.keys(shadowConfig).reduce(
  (result, key) => ({
    ...result,
    [key]:
      typeof shadowConfig[key as keyof typeof shadowConfig] === 'string'
        ? shadowConfig[key as keyof typeof shadowConfig].replace(
            /(\d+)px/g,
            (match, pxValue) => rem(parseInt(pxValue, 10)),
          )
        : typeof shadowConfig[key as keyof typeof shadowConfig] === 'object',
  }),
  {} as Record<keyof typeof shadowConfig, string>,
);
