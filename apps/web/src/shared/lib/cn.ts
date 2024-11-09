import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
import { widthSetup } from '../config/theme';

const customWidthVariants = Object.keys(widthSetup());

const customTwMerge = extendTailwindMerge({
  override: {},
  extend: {
    // ↓ Add values to existing class groups or define new ones
    classGroups: {
      'max-w': [
        {
          'max-w': customWidthVariants,
        },
      ],
      'min-w': [
        {
          'min-w': customWidthVariants,
        },
      ],
      w: [
        {
          w: customWidthVariants,
        },
      ],
      basis: [
        {
          basis: customWidthVariants,
        },
      ],
    },
    // ↓ Here you can define additional conflicts across class groups
    conflictingClassGroups: {},
    // ↓ Define conflicts between postfix modifiers and class groups
    conflictingClassGroupModifiers: {},
  },
});

export function cn(...inputs: (ClassValue | unknown)[]) {
  return customTwMerge(clsx(inputs));
}
