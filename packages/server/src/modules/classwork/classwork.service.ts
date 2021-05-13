import { forwardRef, Inject } from '@nestjs/common'
import { DocumentType, ReturnModelType } from '@typegoose/typegoose'

// import * as bcrypt from 'bcrypt'
// import { uniq } from 'lodash'
// import { ForbiddenError } from 'type-graphql'

import { Service, InjectModel, Logger, Publication } from 'core'
// import { isObjectId } from 'core/utils/db'
// import {
//   removeExtraSpaces,
//   stringWithoutSpecialCharacters,
// } from 'core/utils/string'
import { AuthService } from 'modules/auth/auth.service'
// import { Permission } from 'modules/auth/models'
// import { OrgRoleName, Permission } from 'modules/auth/models'
import { OrgService } from 'modules/org/org.service'

// eslint-disable-next-line import/order
import { CreateClassworkAssignmentsInput } from './classwork.type'
// import { ANY, Nullable } from 'types'

import { ClassworkAssignment } from './models/ClassworkAssignment'
import { ClassworkMaterial } from './models/ClassworkMaterial'

@Service()
export class ClassworkService {
  private readonly logger = new Logger(ClassworkService.name)

  constructor(
    @InjectModel(ClassworkAssignment)
    private readonly classworkAssignmentsModel: ReturnModelType<
      typeof ClassworkAssignment
    >,

    @InjectModel(ClassworkMaterial)
    private readonly classworkMaterialModel: ReturnModelType<
      typeof ClassworkMaterial
    >,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    @Inject(forwardRef(() => OrgService))
    private readonly orgService: OrgService,
  ) {}

  /**
   * START CLASSWORK MATERIAL
   */

  async createClassworkAssignments(
    creatorId: string,
    courseId: string,
    orgId: string,
    classworkAssignmentInput: CreateClassworkAssignmentsInput,
  ): Promise<DocumentType<ClassworkAssignment>> {
    const {
      title,
      type,
      description,
      attachments,
      dueDate,
    } = classworkAssignmentInput

    if (!(await this.orgService.validateOrgId(orgId))) {
      throw new Error(`Org ID is invalid`)
    }

    // Can create ClassworkAssignments
    const canCreateClassworkAssignment = await this.authService.canAccountManageCourse(
      creatorId,
      courseId,
    )

    if (!canCreateClassworkAssignment) {
      throw new Error(`CAN_CREATE_CLASSWORK_ASSIGNMENT`)
    }

    const currentDate = new Date()
    const startDateInput = new Date(dueDate)

    if (
      startDateInput.setHours(7, 0, 0, 0) < currentDate.setHours(7, 0, 0, 0)
    ) {
      throw new Error(`START_DATE_INVALID`)
    }

    const classworkAssignment = this.classworkAssignmentsModel.create({
      courseId,
      title,
      type,
      description,
      attachments,
      publicationState: Publication.Draft,
      dueDate,
    })

    return classworkAssignment
  }
  // TODO: Delete this line and start the code here

  /**
   * END CLASSWORK MATERIAL
   */

  /**
   * START CLASSWORK ASSIGNMENT
   */

  // TODO: Delete this line and start the code here

  /**
   * END CLASSWORK ASSIGNMENT
   */
}
