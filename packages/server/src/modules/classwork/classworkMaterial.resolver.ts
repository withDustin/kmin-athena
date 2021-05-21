import { forwardRef, Inject, UsePipes, ValidationPipe } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { DocumentType } from '@typegoose/typegoose'
import { ForbiddenError, ID } from 'type-graphql'

import { CurrentAccount, CurrentOrg, UseAuthGuard } from 'core'
import { AuthService } from 'modules/auth/auth.service'
import { P } from 'modules/auth/models'
import { Org } from 'modules/org/models/Org'
import { Nullable } from 'types'

import { ClassworkService } from './classwork.service'
import { CreateClassworkMaterialInput } from './classwork.type'
import { Classwork } from './models/Classwork'
import { ClassworkMaterial } from './models/ClassworkMaterial'

@Resolver((_of) => Classwork)
export class ClassworkMaterialResolver {
  constructor(
    private readonly classworkService: ClassworkService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  /**
   *START MATERIAL RESOLVER
   */
  @Mutation((_return) => ClassworkMaterial)
  @UseAuthGuard(P.Classwork_CreateClassworkMaterial)
  @UsePipes(ValidationPipe)
  async createClassworkMaterial(
    @Args('courseId', { type: () => ID }) courseId: string,
    @Args('CreateClassworkMaterialInput')
    createClassworkMaterialInput: CreateClassworkMaterialInput,
    @CurrentOrg() org: Org,
    @CurrentAccount() account: Account,
  ): Promise<ClassworkMaterial> {
    return this.classworkService.createClassworkMaterial(
      account.id,
      org.id,
      courseId,
      createClassworkMaterialInput,
    )
  }
  // TODO: Delete this line and start the code here

  // TODO: classworkService.findClassworkMaterial

  // TODO: classworkService.updateClassworkMaterial

  // TODO: classworkService.updateClassworkMaterialPublication

  // TODO: classworkService.removeAttachmentsFromClassworkMaterial

  @Mutation((_return) => ClassworkMaterial)
  @UseAuthGuard(P.Classwork_ListClassworkMaterial)
  async findClassworkMaterialById(
    @Args('classworkMaterial', { type: () => ID })
    classworkMaterial: string,
    @Args('orgId', { type: () => ID }) orgId: string,
    @CurrentOrg() org: Org,
  ): Promise<Nullable<DocumentType<ClassworkMaterial>>> {
    if (orgId !== org.id) {
      throw new ForbiddenError()
    }

    return this.classworkService.findClassworkMaterialById(classworkMaterial)
  }
  /**
   * END MATERIAL RESOLVER
   */
}
