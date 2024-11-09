const baseConfig = {
  brandName: 'Znacovean Simion',
  appBaseURL: import.meta.env?.PUBLIC_ENV__BASE_URL,
  apiBaseURL: import.meta.env?.VITE_API_BASE_URL,
};

const lsConstants: Record<string, string> = {};

const appConfig = {
  ...baseConfig,
  lsConstants,
};

export { appConfig };
