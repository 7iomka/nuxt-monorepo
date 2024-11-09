import { env } from './env';

export const appConfig = {
  nodeEnv: env.NODE_ENV,
  serverPort: Number(env.PORT),
  corsOrigin: env.CORS_ORIGIN,
};
