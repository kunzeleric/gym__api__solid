import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    // criação de uma academia fake antes de cada teste rodar
    await gymsRepository.create({
      id: 'gym-01',
      title: 'Javascript Gym',
      description: '',
      latitude: -25.4022114,
      longitude: -49.2843053,
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
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
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

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Javascript Gym',
      description: '',
      latitude: new Decimal(-25.3131634),
      longitude: new Decimal(-49.2380334),
      phone: '',
    })

    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-02',
        userLatitude: -25.4022114,
        userLongitude: -49.2843053,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
