import { Test, TestingModule } from '@nestjs/testing'
import { Connection } from 'mongoose'
import { TypegooseModule } from 'nestjs-typegoose'

import { objectId } from 'core/utils/db'
import { initTestDb } from 'core/utils/db-testing'

import { AccountService } from './account.service'
import { CreateAccountInput } from './account.type'
import { Account } from './models/Account'

describe('account.service', () => {
  let module: TestingModule
  let accountService: AccountService
  let mongooseConnection: Connection

  beforeAll(async () => {
    const testDb = await initTestDb()
    mongooseConnection = testDb.mongooseConnection

    module = await Test.createTestingModule({
      imports: [
        TypegooseModule.forRoot(testDb.uri, {
          useUnifiedTopology: true,
          useCreateIndex: true,
          useNewUrlParser: true,
        }),
        TypegooseModule.forFeature([Account]),
      ],
      providers: [AccountService],
    }).compile()

    accountService = module.get<AccountService>(AccountService)
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
    expect(accountService).toBeDefined()
  })

  describe('createAccount', () => {
    const createAccountInput: CreateAccountInput = {
      orgId: objectId(),
      email: 'dustin.do95@gmail.com',
      password: '123456',
      username: 'duongdev',
    }

    it(`throws error if username or email has been taken`, async () => {
      expect.assertions(1)

      jest
        .spyOn(accountService['accountModel'], 'exists')
        .mockResolvedValueOnce(true as never)

      await expect(
        accountService.createAccount(createAccountInput),
      ).rejects.toThrow('Email or username has been taken')
    })

    it(`returns the created account`, async () => {
      expect.assertions(2)

      const account = await accountService.createAccount(createAccountInput)

      expect(account).toMatchObject({
        email: 'dustin.do95@gmail.com',
        lastActivityAt: null,
        status: 'Pending',
        username: 'duongdev',
      })
      expect(account.orgId).toBeDefined()
    })
  })
})
