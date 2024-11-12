export const round = (value: number, precision = 5): number => {
  const power = Math.pow(10, precision);
  return Math.round(value * power + Number.EPSILON * power) / power;
};

function createConverter(units: string) {
  return (px: unknown) => {
    if (typeof px === 'number') {
      return `${px / 16}${units}`;
    }

    if (typeof px === 'string') {
      const replaced = px.replace('px', '');
      if (!Number.isNaN(Number(replaced))) {
        return `${Number(replaced) / 16}${units}`;
      }
    }

    return px as string;
  };
}

export const rem = createConverter('rem');
// them same as rem, only units is em (used in breakpoints)
export const em = createConverter('em');

export const getBreakpointValue = (
  value: string | number,
  breakpoints: object,
) => {
  return value in breakpoints
    ? breakpoints[value as keyof typeof breakpoints]
    : em(value);
};
