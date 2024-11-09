import pino from 'pino';
import { appConfig } from '@/app-config';
import type { FastifyBaseLogger } from 'fastify';

export const logger = pino({
  level: appConfig.nodeEnv === 'production' ? 'info' : 'debug',
  // Apply pretty printing only if there is a human watching this
  transport: process.stdout.isTTY ? { target: 'pino-pretty' } : undefined,
}) as FastifyBaseLogger;
