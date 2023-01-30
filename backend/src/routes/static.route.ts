import * as path from 'path';
import { FastifyPluginAsync } from 'fastify';
import FastifyStatic from '@fastify/static';
import { FastifyInstance } from 'fastify/types/instance';

const FRONTEND_PATH = path.resolve(__dirname, '../../frontend');

const route: FastifyPluginAsync = async (fastify: FastifyInstance): Promise<void> => {
  fastify.register(FastifyStatic, {
    root: FRONTEND_PATH,
    prefix: '/public'
  });

  fastify.get('/', (_, res) => res.sendFile('index.html'));
}

export default route;

