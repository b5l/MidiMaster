import { FastifyPluginAsync, RouteHandlerMethod } from 'fastify';
import { ObjectId } from '@mikro-orm/mongodb';
import { FastifyInstance } from 'fastify/types/instance';
import { FastifyRequest } from 'fastify/types/request';
import LayoutEntity from '../entities/layout.entity';

const route: FastifyPluginAsync = async (fastify: FastifyInstance): Promise<void> => {
  fastify.get('/api/layouts', getLayouts);
  fastify.post('/api/layouts', saveLayout);
  fastify.delete('/api/layouts/:layoutId', deleteLayout)
}

const getLayouts: RouteHandlerMethod = async (request: FastifyRequest) => {
  return request.mikroOrm.entityManager.find<LayoutEntity>(LayoutEntity, {});
};

const saveLayout: RouteHandlerMethod = async (request: FastifyRequest) => {
  return request.mikroOrm.entityManager.upsert<LayoutEntity>(LayoutEntity, request.body as LayoutEntity);
};

const deleteLayout: RouteHandlerMethod = async (request: FastifyRequest) => {
  // TODO: This is ugly, I hate myself, I have no idea how any of this actually works
  //       (if this is in fact the right way to do this I'll never use MikroORM again)
  const layoutId = (request.params as any)?.layoutId;
  const objectId = new ObjectId(layoutId as string);
  const layout = await request.mikroOrm.entityManager.findOne<LayoutEntity>(LayoutEntity, { _id: objectId })
  if (!layout) throw new Error('not found');
  return request.mikroOrm.entityManager.remove(layout);
};

export default route;

