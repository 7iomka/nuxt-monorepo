export function truncate(
  str: string,
  options: { length?: number; omission?: string } = {},
): string {
  const { length = 30, omission = '...' } = options;

  if (str.length <= length) return str;

  const truncatedLength = length - omission.length;
  if (truncatedLength <= 0) return omission;

  return str.slice(0, truncatedLength) + omission;
}
