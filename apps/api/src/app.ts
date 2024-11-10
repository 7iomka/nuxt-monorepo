import fastify, { type FastifyServerOptions } from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod';
import { usersRoutes } from '@/modules/users/users.routes';
import { appConfig } from './app-config';

interface AppOptions extends FastifyServerOptions {}

export const buildApp = async (opts: AppOptions = {}) => {
  const app = fastify(opts);

  // Add schema validator and serializer
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  await app.register(import('@fastify/cors'), {
    origin: [appConfig.corsOrigin],
    credentials: true,
  });

  // Register the fastify-sensible plugin
  await app.register(import('@fastify/sensible'));

  // Create the OpenAPI documentation
  await app.register(import('@fastify/swagger'), {
    openapi: {
      info: {
        title: 'API',
        description: 'Welcome to API',
        version: '1.0.0',
      },
      tags: [
        // {
        //   name: 'Auth',
        //   description: 'Authentication routes.',
        // },
      ],
    },
    transform: jsonSchemaTransform,
  });

  // Serve an OpenAPI file
  app.get('/openapi.json', async (request, reply) => {
    return app.swagger();
  });

  // Swagger UI docs
  await app.register(import('@fastify/swagger-ui'), {
    routePrefix: '/docs',
  });

  // Modern API Reference
  await app.register(import('@scalar/fastify-api-reference'), {
    routePrefix: '/docs-modern',
    configuration: {
      spec: {
        content: () => app.swagger(),
      },
    },
  });

  // Register routes here
  app.register(usersRoutes, { prefix: '/users' });

  return app;
};
