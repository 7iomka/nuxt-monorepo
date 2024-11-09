import closeWithGrace from 'close-with-grace';
import { buildApp } from './app';
import { appConfig } from './app-config';
import type { FastifyServerOptions } from 'fastify';
import { logger } from './lib/logger';

const appOptions: FastifyServerOptions = {
  loggerInstance: logger,
};

const app = buildApp(appOptions);

await app.listen({ port: appConfig.serverPort, host: '0.0.0.0' });

closeWithGrace(async function ({ signal, err }) {
  if (err) {
    app.log.error(err, 'Server closing with error');
  } else {
    app.log.info(`${signal} received, Server closing`);
  }
  await app.close();
});
