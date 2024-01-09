import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { FastifyInstance } from 'fastify'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/gyms', create)
}
