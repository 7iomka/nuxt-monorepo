export function formatDate(
  date: string | null,
  fallbackValue = 'Present',
): string {
  if (!date) return fallbackValue;
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
  };
  return new Date(date).toLocaleDateString('en', options);
}
