import * as path from 'path';
import { FastifyPluginAsync } from 'fastify';
import FastifyStatic from '@fastify/static';

const FRONTEND_PATH = path.resolve(__dirname, '../../frontend');
console.log({ FRONTEND_PATH });

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.register(FastifyStatic, {
    root: FRONTEND_PATH,
    prefix: '/public'
  });

  fastify.get('/', (_, res) => res.sendFile('index.html'));
}

export default route;

