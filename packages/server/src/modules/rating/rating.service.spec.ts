import { TestingModule } from '@nestjs/testing'
import { Connection } from 'mongoose'

import { objectId } from 'core/utils/db'
import { createTestingModule, initTestDb } from 'core/utils/testing'
import { OrgService } from 'modules/org/org.service'
import { ANY } from 'types'

import { RatingService } from './rating.service'

describe('rating.service', () => {
  let module: TestingModule
  let ratingService: RatingService
  let orgService: OrgService
  let mongooseConnection: Connection

  beforeAll(async () => {
    const testDb = await initTestDb()
    mongooseConnection = testDb.mongooseConnection

    module = await createTestingModule(testDb.uri)

    ratingService = module.get<RatingService>(RatingService)
    orgService = module.get<OrgService>(OrgService)
  })

  afterAll(async () => {
    await module.close()
  })

  beforeEach(async () => {
    await mongooseConnection.dropDatabase()
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should be defined', () => {
    expect(ratingService).toBeDefined()
  })

  describe('createRating', () => {
    const createRatingInput: ANY = {
      targetId: objectId(),
      numberOfStars: 5,
    }
    it('throws error if org invalid', async () => {
      expect.assertions(1)

      await expect(
        ratingService.createRating(objectId(), objectId(), createRatingInput),
      ).rejects.toThrowError('Org ID is invalid')
    })

    it('returns new rating', async () => {
      expect.assertions(1)

      jest
        .spyOn(orgService, 'validateOrgId')
        .mockResolvedValueOnce(true as never)

      await expect(
        ratingService.createRating(objectId(), objectId(), createRatingInput),
      ).resolves.toMatchObject({
        numberOfStars: 5,
        targetId: createRatingInput.targetId,
      })
    })
  })

  describe('calculateAvgRatingByTargetId', () => {
    it('throws error if org invalid', async () => {
      expect.assertions(1)

      await expect(
        ratingService.calculateAvgRatingByTargetId(objectId(), objectId()),
      ).rejects.toThrowError('Org ID is invalid')
    })

    it('returns the average number of stars by targetId', async () => {
      expect.assertions(1)

      jest
        .spyOn(orgService, 'validateOrgId')
        .mockResolvedValueOnce(true as never)

      const targetId = objectId()
      const dataArrayOfTargetId: ANY = [
        {
          id: targetId,
          numberOfStars: 5,
        },
        {
          id: targetId,
          numberOfStars: 4,
        },
        {
          id: targetId,
          numberOfStars: 4,
        },
      ]

      jest
        .spyOn(ratingService['ratingModel'], 'find')
        .mockResolvedValueOnce(dataArrayOfTargetId)

      await expect(
        ratingService.calculateAvgRatingByTargetId(objectId(), targetId),
      ).resolves.toEqual(4.3)
    })
  })
})
