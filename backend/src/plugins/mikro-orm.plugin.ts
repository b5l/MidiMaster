import * as path from 'path';
import fp from 'fastify-plugin';

import { MikroORM, Options as MikroORMOptions } from '@mikro-orm/core';
import { MongoDriver } from '@mikro-orm/mongodb';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { FastifyPluginAsync } from 'fastify/types/plugin';
import { FastifyInstance } from 'fastify/types/instance';
import { FastifyRequest } from 'fastify/types/request';

import config from '../lib/config';

export const autoConfig: MikroORMOptions = {
  driver: MongoDriver,
  entities: [path.join(__dirname, '../entities')],
  entitiesTs: [path.join(__dirname, '../entities')],
  metadataProvider: TsMorphMetadataProvider,
  clientUrl: config.get('mongo.clientUrl'),
  dbName: config.get('mongo.dbName')
};

const fastifyMikroORM: FastifyPluginAsync<MikroORMOptions> = async function (fastify: FastifyInstance, options: MikroORMOptions) {
  const instance = await MikroORM.init(options)
  const entityManager = instance.em.fork();

  fastify.decorate('mikroOrm', { instance, entityManager });
  fastify.addHook('onClose', () => instance.close());
  fastify.addHook('onRequest', async function (this: FastifyInstance, request: FastifyRequest) {
    request.mikroOrm = this.mikroOrm;
  });
}

export default fp(fastifyMikroORM, {
  name: 'fastify-mikro-orm'
});

