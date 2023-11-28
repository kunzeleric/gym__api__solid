import { InMemoryCheckInsRespository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRespository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRespository
let gymsRepository: InMemoryGymsRespository
let sut: CheckInUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRespository()
    gymsRepository = new InMemoryGymsRespository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    // criação de uma academia fake antes de cada teste rodar
    gymsRepository.items.push({
      id: 'gym-01',
      title: 'Javascript Gym',
      description: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
      phone: '',
    })

    // mocka uma data
    vi.useFakeTimers()
  })

  afterEach(() => {
    // restaura data real
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -25.4022114,
      userLongitude: -49.2843053,
    })

    console.log(checkIn.created_at)

    expect(checkIn.id).toEqual(expect.any(String))
  })

  // red, green, refactor (fases TDD)
  // primeiro o teste da erro (red)
  // segundo, faz o mínimo para o teste passar (green)
  // por fim, faz o refactor

  it('should be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    // -25.4022114,-49.2843053,14z

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -25.4022114,
      userLongitude: -49.2843053,
    })

    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: -25.4022114,
        userLongitude: -49.2843053,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -25.4022114,
      userLongitude: -49.2843053,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -25.4022114,
      userLongitude: -49.2843053,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
