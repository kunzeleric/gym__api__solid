import { env } from '@/env'
import { PrismaClient } from '@prisma/client'

// ativa os logs do prisma
export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})
