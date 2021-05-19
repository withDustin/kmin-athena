import { TestingModule } from '@nestjs/testing'
// import { compareSync } from 'bcrypt'
import { Connection } from 'mongoose'

// import { objectId } from 'core/utils/db'
import { objectId } from 'core'
// eslint-disable-next-line import/order
import { createTestingModule, initTestDb } from 'core/utils/testing'
// import { Role } from 'modules/auth/models'
// import { ANY } from 'types'

import { AcademicService } from 'modules/academic/academic.service'
import { CreateCourseInput } from 'modules/academic/academic.type'
import { AccountService } from 'modules/account/account.service'
import { AuthService } from 'modules/auth/auth.service'
import { OrgService } from 'modules/org/org.service'
import { ANY } from 'types'

import { ClassworkService } from './classwork.service'
import { CreateClassworkAssignmentInput } from './classwork.type'
import { ClassworkAssignment } from './models/ClassworkAssignment'

describe('classwork.service', () => {
  let module: TestingModule
  let classworkService: ClassworkService
  let mongooseConnection: Connection
  let orgService: OrgService
  let authService: AuthService
  let accountService: AccountService
  let academicService: AcademicService

  beforeAll(async () => {
    const testDb = await initTestDb()
    mongooseConnection = testDb.mongooseConnection

    module = await createTestingModule(testDb.uri)

    classworkService = module.get<ClassworkService>(ClassworkService)
    academicService = module.get<AcademicService>(AcademicService)
    classworkService = module.get<ClassworkService>(ClassworkService)
    orgService = module.get<OrgService>(OrgService)
    authService = module.get<AuthService>(AuthService)
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
    expect(classworkService).toBeDefined()
  })

  /**
   * START CLASSWORK MATERIAL
   */

  // TODO: Delete this line and start the code here

  /**
   * END CLASSWORK MATERIAL
   */

  /**
   * START CLASSWORK ASSIGNMENTS
   */

  describe('createClassworkAssignment', () => {
    const classworkAssignmentInput: ANY = {
      createdByAccountId: objectId(),
      title: 'Bai tap so 1',
    }

    it(`throws error "Org ID is invalid" if org id is not valid`, async () => {
      expect.assertions(1)

      await expect(
        classworkService.createClassworkAssignment(
          objectId(),
          objectId(),
          objectId(),
          {
            ...classworkAssignmentInput,
            dueDate: '1618765200000',
          },
        ),
      ).rejects.toThrowError('Org ID is invalid')
    })

    it(`throws error "CAN_NOT_CREATE_CLASSWORK_ASSIGNMENT" if Account or Course is not found`, async () => {
      expect.assertions(2)

      const org = await orgService.createOrg({
        name: 'kmin',
        namespace: 'kmin-edu',
      })

      const creatorAccount = await accountService.createAccount({
        orgId: org.id,
        email: 'lecturer@gmail.com',
        password: '123456',
        username: 'lecturer',
        roles: ['lecturer'],
        displayName: 'Lecturer',
      })

      const createCourse: ANY = {
        academicSubjectId: objectId(),
        code: 'NodeJS-12',
        name: 'Node Js Thang 12',
        tuitionFee: 5000000,
        lecturerIds: creatorAccount.id,
      }

      jest
        .spyOn(orgService, 'validateOrgId')
        .mockResolvedValueOnce(true as never)
        .mockResolvedValueOnce(true as never)

      jest
        .spyOn(authService, 'canAccountManageCourse')
        .mockResolvedValueOnce(false as never)
        .mockResolvedValueOnce(false as never)

      await expect(
        classworkService.createClassworkAssignment(
          objectId(),
          createCourse.id,
          org.id,
          {
            ...classworkAssignmentInput,
            dueDate: '1618765200000',
          },
        ),
      ).rejects.toThrow('CAN_NOT_CREATE_CLASSWORK_ASSIGNMENT')

      await expect(
        classworkService.createClassworkAssignment(
          creatorAccount.id,
          objectId(),
          org.id,
          {
            ...classworkAssignmentInput,
            dueDate: '2021-05-20',
          },
        ),
      ).rejects.toThrow('CAN_NOT_CREATE_CLASSWORK_ASSIGNMENT')
    })

    it(`throws error "START_DATE_INVALID" if the entered date less than the current date`, async () => {
      expect.assertions(1)

      const org = await orgService.createOrg({
        name: 'kmin',
        namespace: 'kmin-edu',
      })

      const creatorAccount = await accountService.createAccount({
        orgId: org.id,
        email: 'lecturer@gmail.com',
        password: '123456',
        username: 'lecturer',
        roles: ['lecturer'],
        displayName: 'Lecturer',
      })

      const createCourse: ANY = {
        academicSubjectId: objectId(),
        code: 'NodeJS-12',
        name: 'Node Js Thang 12',
        tuitionFee: 5000000,
        lecturerIds: creatorAccount.id,
      }

      jest
        .spyOn(orgService, 'validateOrgId')
        .mockResolvedValueOnce(true as never)

      jest
        .spyOn(authService, 'canAccountManageCourse')
        .mockResolvedValueOnce(true as never)

      const date = new Date()

      await expect(
        classworkService.createClassworkAssignment(
          creatorAccount.id,
          createCourse.id,
          org.id,
          {
            ...classworkAssignmentInput,
            dueDate: date.setDate(date.getDate() - 1),
          },
        ),
      ).rejects.toThrow('DUE_DATE_INVALID')
    })

    it(`returns the Classwork Assignment`, async () => {
      expect.assertions(1)

      const createCourseInput: ANY = {
        academicSubjectId: objectId(),
        code: 'NodeJS-12',
        name: 'Node Js Thang 12',
        tuitionFee: 5000000,
        lecturerIds: [],
      }

      const org = await orgService.createOrg({
        namespace: 'kmin-edu',
        name: 'Kmin Academy',
      })

      const accountLecturer = await accountService.createAccount({
        orgId: org.id,
        email: 'vanhai0911@gmail.com',
        password: '123456',
        username: 'haidev',
        roles: ['lecturer'],
        displayName: 'Nguyen Van Hai',
      })

      jest
        .spyOn(orgService, 'validateOrgId')
        .mockResolvedValueOnce(true as never)
      jest
        .spyOn(authService, 'accountHasPermission')
        .mockResolvedValueOnce(true as never)
      jest
        .spyOn(academicService, 'findAcademicSubjectById')
        .mockResolvedValueOnce(true as never)

      const courseTest = await academicService.createCourse(
        objectId(),
        accountLecturer.orgId,
        {
          ...createCourseInput,
          startDate: Date.now(),
          lecturerIds: [accountLecturer.id],
        },
      )

      jest
        .spyOn(academicService['courseModel'], 'findOne')
        .mockResolvedValueOnce(courseTest)
      jest
        .spyOn(authService, 'canAccountManageCourse')
        .mockResolvedValueOnce(true as never)

      await expect(
        classworkService.createClassworkAssignment(
          accountLecturer.id,
          courseTest.id,
          org.id,
          {
            createdByAccountId: accountLecturer.id,
            title: 'Bai Tap Nay Moi Nhat',
            dueDate: '2021-07-21',
            description: '',
          },
        ),
      ).resolves.toMatchObject({
        title: 'Bai Tap Nay Moi Nhat',
      })
    })
  })

  describe('findAndPaginateClassworkAssignments', () => {
    it('rreturns array classworkAssignment and count find and pagination classworkAssignment', async () => {
      expect.assertions(1)

      const org = await orgService.createOrg({
        name: 'kmin',
        namespace: 'kmin-edu',
      })

      const creatorAccount = await accountService.createAccount({
        orgId: org.id,
        email: 'admin@gmail.com',
        password: '123456',
        username: 'admin',
        roles: ['admin'],
        displayName: 'Admin',
      })

      const lecturerAccount = await accountService.createAccount({
        orgId: org.id,
        email: 'lecturer@gmail.com',
        password: '123456',
        username: 'lecturer',
        roles: ['lecturer'],
        displayName: 'Lecturer',
      })

      const academicSubject = await academicService.createAcademicSubject({
        code: 'HTML',
        createdByAccountId: creatorAccount.id,
        description: 'HTML',
        imageFileId: objectId(),
        name: 'HTMl',
        orgId: org.id,
      })

      const listCreateClassworkAssignment: ANY[] = []
      const date = new Date()
      const createdByAccountId = lecturerAccount.id

      const createCourse: CreateCourseInput = {
        academicSubjectId: academicSubject.id,
        code: 'FEBCT1',
        name: 'Frontend cơ bản tháng 1',
        startDate: date.toString(),
        tuitionFee: 5000000,
        lecturerIds: [lecturerAccount.id],
      }

      const course = await academicService.createCourse(
        creatorAccount.id,
        org.id,
        {
          ...createCourse,
          code: 'FEBCT2',
          name: 'Lập trình Frontend cơ bản tháng 2',
        },
      )

      listCreateClassworkAssignment.push(
        await classworkService.createClassworkAssignment(
          createdByAccountId,
          course.id,
          org.id,
          {
            createdByAccountId,
            title: 'Bai tap 1',
            description: 'Bai tap 1',
            attachments: [],
            dueDate: date.toString(),
          },
        ),
      )

      listCreateClassworkAssignment.push(
        await classworkService.createClassworkAssignment(
          createdByAccountId,
          course.id,
          org.id,
          {
            createdByAccountId,
            title: 'Bai tap 2',
            description: 'Bai tap 2',
            attachments: [],
            dueDate: date.toString(),
          },
        ),
      )

      listCreateClassworkAssignment.push(
        await classworkService.createClassworkAssignment(
          createdByAccountId,
          course.id,
          org.id,
          {
            createdByAccountId,
            title: 'Bai tap 3',
            description: 'Bai tap 3',
            attachments: [],
            dueDate: date.toString(),
          },
        ),
      )

      listCreateClassworkAssignment.push(
        await classworkService.createClassworkAssignment(
          createdByAccountId,
          course.id,
          org.id,
          {
            createdByAccountId,
            title: 'Bai tap 4',
            description: 'Bai tap 4',
            attachments: [],
            dueDate: date.toString(),
          },
        ),
      )

      listCreateClassworkAssignment.push(
        await classworkService.createClassworkAssignment(
          createdByAccountId,
          course.id,
          org.id,
          {
            createdByAccountId,
            title: 'Bai tap 5',
            description: 'Bai tap 5',
            attachments: [],
            dueDate: date.toString(),
          },
        ),
      )

      const a = await classworkService.findAndPaginateClassworkAssignments(
        {
          limit: 2,
          skip: 0,
        },
        {
          orgId: org.id,
          courseId: course.id,
        },
      )

      await expect(
        classworkService.findAndPaginateClassworkAssignments(
          {
            limit: 2,
            skip: 0,
          },
          {
            orgId: org.id,
          },
        ),
      ).resolves.toMatchObject({
        classworkAssignments: [
          {
            title: 'Bai tap 5',
            description: 'Bai tap 5',
          },
          {
            title: 'Bai tap 4',
            description: 'Bai tap 4',
          },
        ],
        count: listCreateClassworkAssignment.length,
      })
    })

    it('returns array classworkAssignment and count find and pagination classworkAssignment with filter', async () => {
      expect.assertions(1)

      const org = await orgService.createOrg({
        name: 'kmin',
        namespace: 'kmin-edu',
      })

      const creatorAccount = await accountService.createAccount({
        orgId: org.id,
        email: 'admin@gmail.com',
        password: '123456',
        username: 'admin',
        roles: ['admin'],
        displayName: 'Admin',
      })

      const lecturerAccount = await accountService.createAccount({
        orgId: org.id,
        email: 'lecturer@gmail.com',
        password: '123456',
        username: 'lecturer',
        roles: ['lecturer'],
        displayName: 'Lecturer',
      })

      const academicSubject = await academicService.createAcademicSubject({
        code: 'HTML',
        createdByAccountId: creatorAccount.id,
        description: 'HTML',
        imageFileId: objectId(),
        name: 'HTMl',
        orgId: org.id,
      })

      const listCreateClassworkAssignment: ANY[] = []
      const date = new Date()
      const createdByAccountId = lecturerAccount.id

      const createCourse: CreateCourseInput = {
        academicSubjectId: academicSubject.id,
        code: 'FEBCT1',
        name: 'Frontend cơ bản tháng 1',
        startDate: date.toString(),
        tuitionFee: 5000000,
        lecturerIds: [lecturerAccount.id],
      }

      const course = await academicService.createCourse(
        creatorAccount.id,
        org.id,
        {
          ...createCourse,
          code: 'FEBCT2',
          name: 'Lập trình Frontend cơ bản tháng 2',
        },
      )

      listCreateClassworkAssignment.push(
        await classworkService.createClassworkAssignment(
          createdByAccountId,
          course.id,
          org.id,
          {
            createdByAccountId,
            title: 'Bai tap 1',
            description: 'Bai tap 1',
            attachments: [],
            dueDate: date.toString(),
          },
        ),
      )

      listCreateClassworkAssignment.push(
        await classworkService.createClassworkAssignment(
          createdByAccountId,
          course.id,
          org.id,
          {
            createdByAccountId,
            title: 'Bai tap 2',
            description: 'Bai tap 2',
            attachments: [],
            dueDate: date.toString(),
          },
        ),
      )

      listCreateClassworkAssignment.push(
        await classworkService.createClassworkAssignment(
          createdByAccountId,
          course.id,
          org.id,
          {
            createdByAccountId,
            title: 'Bai tap 3',
            description: 'Bai tap 3',
            attachments: [],
            dueDate: date.toString(),
          },
        ),
      )

      listCreateClassworkAssignment.push(
        await classworkService.createClassworkAssignment(
          createdByAccountId,
          course.id,
          org.id,
          {
            createdByAccountId,
            title: 'Bai tap 4',
            description: 'Bai tap 4',
            attachments: [],
            dueDate: date.toString(),
          },
        ),
      )

      listCreateClassworkAssignment.push(
        await classworkService.createClassworkAssignment(
          createdByAccountId,
          course.id,
          org.id,
          {
            createdByAccountId,
            title: 'Bai tap 5',
            description: 'Bai tap 5',
            attachments: [],
            dueDate: date.toString(),
          },
        ),
      )

      const a = await classworkService.findAndPaginateClassworkAssignments(
        {
          limit: 2,
          skip: 0,
        },
        {
          orgId: org.id,
          courseId: course.id,
        },
      )

      await expect(
        classworkService.findAndPaginateClassworkAssignments(
          {
            limit: 2,
            skip: 0,
          },
          {
            orgId: org.id,
            courseId: course.id,
          },
        ),
      ).resolves.toMatchObject({
        classworkAssignments: [
          {
            title: 'Bai tap 5',
            description: 'Bai tap 5',
          },
          {
            title: 'Bai tap 4',
            description: 'Bai tap 4',
          },
        ],
        count: listCreateClassworkAssignment.length,
      })
    })
  })

  /**
   * END CLASSWORK ASSIGNMENTS
   */
})
