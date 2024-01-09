import { GymAlreadyExistsError } from '@/use-cases/errors/gym-already-exists-error'
import { makeCreateGymsUseCase } from '@/use-cases/factories/make-create-gym-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { title, description, latitude, longitude, phone } =
    createGymBodySchema.parse(request.body)

  try {
    const createGymUseCase = makeCreateGymsUseCase()
    await createGymUseCase.execute({
      description,
      latitude,
      longitude,
      phone,
      title,
    })
  } catch (error) {
    if (error instanceof GymAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  reply.status(201).send()
}
