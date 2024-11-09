import fastify, { type FastifyServerOptions } from 'fastify';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
// import { userRoutes } from '@/routes/user';
import { appConfig } from './app-config';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';

interface AppOptions extends FastifyServerOptions {}

export const buildApp = (opts: AppOptions = {}) => {
  const app = fastify(opts);

  // Add schema validator and serializer
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(cors, {
    origin: appConfig.corsOrigin,
    credentials: true,
  });

  // app.register(userRoutes, { prefix: '/user' });

  return app;
};
