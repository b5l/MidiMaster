import { MikroORM, EntityManager } from '@mikro-orm/core'

declare module 'fastify' {
  interface FastifyInstance {
    mikroOrm: {
      instance: Awaited<ReturnType<(typeof MikroORM)['init']>>,
      entityManager: EntityManager
    }
  }
  interface FastifyRequest {
    mikroOrm: {
      instance: Awaited<ReturnType<(typeof MikroORM)['init']>>,
      entityManager: EntityManager
    }
  }
}
