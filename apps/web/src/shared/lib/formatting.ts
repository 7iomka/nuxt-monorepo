/**
 * Convert hex colors to `r, g, b` value (used in css variables)
 *
 * @param {string} h - The hexadecimal color code to convert.
 * @return {string} The converted RGB color code.
 */
export const hexToRGB = (h: string): string => {
  let r: string | number = 0;
  let g: string | number = 0;
  let b: string | number = 0;

  // 3 digits
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;

    // 6 digits
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }

  return `${Number(r)},${Number(g)},${Number(b)}`;
};

/**
 * Converts a string to kebab case.
 *
 * Examples:
 * toKebabCase("HelloWorld") -> "hello-world"
 * toKebabCase("HelloWorld2") -> "hello-world-2"
 * toKebabCase("HelloWorld22") -> "hello-world-22"
 * Works on camelCase, PascalCase, snake_case, and kebab-case.
 */
export function toKebabCase(title: string) {
  let ret = '';
  for (let x = 0; x < title.length; x++) {
    const ch = title[x]!;
    if (x && ch >= 'A' && ch <= 'Z') {
      ret += `-${ch.toLowerCase()}`;
      continue;
    } else if (x && isNumber(ch)) {
      // Must be the start of a sequence:
      if (x - 1 >= 0 && isAlpha(title[x - 1]!)) {
        ret += `-${ch}`;
        continue;
      }
    }
    ret += ch.toLowerCase();
  }
  return ret;
}

function isAlpha(ch: string) {
  return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
}

function isNumber(ch: string) {
  return ch >= '0' && ch <= '9';
}
