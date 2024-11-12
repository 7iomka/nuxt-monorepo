const scrollbarCompensation = () => {
  // var primaryColor = theme('colors.primary');

  return {
    '.c-scrollbar-compensation': {
      paddingRight: 'var(--scrollbar-width)',
    },
  };
};

const visuallyHidden = () => ({
  '.c-visually-hidden': {
    margin: '-1px',
    padding: '0',
    width: '1px',
    height: '1px',
    overflow: 'hidden',
    clip: ['rect(0 0 0 0)', 'rect(0, 0, 0, 0)'],
    position: 'absolute',
  },
});

const hideNativeScrollbar = () => ({
  '.c-hide-native-scrollbar': {
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none',

    '&::-webkit-scrollbar': {
      width: '0',
      height: '0',
    },
  },
});

export const customUtilities = [
  scrollbarCompensation,
  visuallyHidden,
  hideNativeScrollbar,
];
