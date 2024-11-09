import deepmerge from 'deepmerge';
import {
  colors,
  breakpoints,
  shadow,
  radius,
  fontSizes,
  fontFamily,
  spacing,
  containerMaxWidths,
  containerSetup,
} from './theme';
import { largerThan } from './theme/breakpoints';
import { hexToRGB, toKebabCase } from '../lib/formatting';

export const commonVariables = () => {
  return {
    // custom layout variables
    '--min-document-width': containerMaxWidths.min,
    '--removed-body-scroll-bar-size': 'var(--fancybox-scrollbar-compensate)',
  };
};

export const colorVariables = () => {
  const paletteShade = 500;

  const config = {
    // all palette colors
    ...Object.keys(colors).reduce(
      (_acc, color) => {
        const vals = Object.keys(colors[color as keyof typeof colors]).reduce(
          (acc, curr) => {
            const nes = colors[color as keyof typeof colors];
            return {
              ...acc,
              [`${color}-${curr}`]: nes[curr as unknown as keyof typeof nes],
            };
          },
          {},
        );

        return {
          ..._acc,
          [color]: `var(--${color}-${paletteShade})`, // symlink
          ...vals,
        };
      },
      {} as Record<string, string>,
    ),
  };

  return Object.keys(config).reduce(
    (acc, curr) => {
      const key = toKebabCase(curr);
      const val = config[curr];

      if (!val) return {}; // skip wrong values

      if (val.startsWith('var(')) {
        return {
          ...acc,
          [`--${key}`]: val,
          [`--${key}-rgb`]: val.replace(')', '-rgb)'), // add -rgb part for symlink
        };
      }
      return {
        ...acc,
        [`--${key}`]: val,
        [`--${key}-rgb`]: hexToRGB(val),
      } as any;
    },
    {
      '--root-color': 'var(--dark-50)',
      '--root-color-rgb': 'var(--dark-50-rgb)',
      '--root-background-color': '#1a1b1e',
      '--root-background-color-rgb': hexToRGB('#1a1b1e'),
      '--black': '#000',
      '--black-rgb': '0, 0, 0',
      '--white': '#fff',
      '--white-rgb': '255, 255, 255',
    },
  );
};

export const breakpointVariables = () => {
  return Object.keys(breakpoints).reduce((acc, curr) => {
    return {
      ...acc,
      [`--breakpoint-${curr}`]: breakpoints[curr as keyof typeof breakpoints],
    };
  }, {});
};

export const containerVariables = () => {
  const containerPaddingSetup = containerSetup.padding;
  // container-xxx variables
  const containerVars = Object.keys(containerMaxWidths).reduce(
    (prev, curr) => ({
      ...prev,
      [`--container-${curr}`]:
        containerMaxWidths[curr as keyof typeof containerMaxWidths],
    }),
    {},
  );

  // container max-width responsive variable
  const containerMaxWidthVars = Object.keys(containerMaxWidths).reduce(
    (acc: any, curr: any) => {
      if (curr === 'min') {
        return acc;
      }

      return {
        ...acc,
        [`@media ${largerThan(curr)}`]: {
          '--container-max-width':
            containerMaxWidths[curr as keyof typeof containerMaxWidths],
        },
      };
    },
    {},
  );

  // container padding responsive variable
  const containerPaddingVars = Object.keys(containerPaddingSetup).reduce(
    (acc: any, curr: any) => {
      const paddingValue =
        containerPaddingSetup[curr as keyof typeof containerPaddingSetup];

      if (curr === 'DEFAULT') {
        return acc;
      }

      return {
        ...acc,
        [`@media ${largerThan(curr)}`]: {
          '--container-padding': paddingValue,
        },
      };
    },
    {},
  );

  return deepmerge.all([
    {
      '--container-max-width': containerMaxWidths.min,
      '--container-padding': containerPaddingSetup.DEFAULT,
    },
    containerVars,
    containerMaxWidthVars,
    containerPaddingVars,
  ]);
};

export const shadowVariables = () => {
  return Object.keys(shadow).reduce((acc, curr) => {
    return {
      ...acc,
      [`--shadow-${curr}`]: `${shadow[curr as keyof typeof shadow]}`,
    };
  }, {});
};

export const radiusVariables = () => {
  return Object.keys(radius).reduce(
    (acc, curr) => {
      return {
        ...acc,
        [`--radius-${curr}`]: `${radius[curr as keyof typeof radius]}`,
      };
    },
    {
      '--radius': radius.DEFAULT,
    },
  );
};

export const fontVariables = () => {
  return {
    // font-size
    ...Object.keys(fontSizes).reduce((acc: any, curr: any) => {
      const val = fontSizes[curr as keyof typeof fontSizes];
      const hasLineHeight = Array.isArray(val) && val.length > 1;
      const sizeVal = hasLineHeight ? val[0] : val;

      if (hasLineHeight) {
        const leadingVal = val[1].lineHeight;
        return {
          ...acc,
          [`--font-size-${curr}`]: `${sizeVal}`,
          [`--leading-for-${curr}`]: `${leadingVal}`,
        };
      }

      return {
        ...acc,
        [`--font-size-${curr}`]: `${sizeVal}`,
      };
    }, {}),
    // font-family (extended)
    ...Object.keys(fontFamily).reduce(
      (acc: any, curr: any) => ({
        ...acc,
        [`--font-family-${curr}`]: fontFamily[curr as keyof typeof fontFamily],
      }),
      {},
    ),
  };
};

export const spacingVariables = () => {
  // spacing aliased only
  return Object.keys(spacing.aliased).reduce(
    (acc: any, curr: any) => ({
      ...acc,
      [`--spacing-${curr}`]: `${
        spacing.aliased[curr as keyof typeof spacing.aliased]
      }`,
    }),
    {},
  );
};

export const globalCssVariables = () => {
  return {
    ...commonVariables(),
    // ...colorVariables(), // temporarily disabled
    ...breakpointVariables(),
    ...containerVariables(),
    ...shadowVariables(),
    ...radiusVariables(),
    ...fontVariables(),
    ...spacingVariables(),
  };
};
