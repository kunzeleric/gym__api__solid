import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { register } from './register'
import { profile } from './profile'
import { refresh } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/user', register)
  app.post('/authenticate', authenticate)
  app.get('/me', { onRequest: [verifyJWT] }, profile)

  app.patch('/token/refresh', refresh)
}
