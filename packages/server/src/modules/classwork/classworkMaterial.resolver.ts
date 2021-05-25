import { forwardRef, Inject, UsePipes, ValidationPipe } from '@nestjs/common'
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { DocumentType } from '@typegoose/typegoose'

import { CurrentAccount, CurrentOrg, Publication, UseAuthGuard } from 'core'
import { AuthService } from 'modules/auth/auth.service'
import { P } from 'modules/auth/models'
import { Org } from 'modules/org/models/Org'
import { Nullable, PageOptionsInput } from 'types'

import { ClassworkService } from './classwork.service'
import {
  UpdateClassworkMaterialInput,
  CreateClassworkMaterialInput,
  ClassworkMaterialPayload,
} from './classwork.type'
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

  @Query((_return) => ClassworkMaterialPayload)
  @UseAuthGuard(P.Classwork_ListClassworkMaterial)
  async classworkMaterials(
    @CurrentOrg() org: Org,
    @CurrentAccount() account: Account,
    @Args('pageOptions') pageOptions: PageOptionsInput,
    @Args('courseId') courseId: string,
    @Args('searchText', { nullable: true }) searchText?: string,
  ): Promise<{
    classworkMaterials: DocumentType<ClassworkMaterial>[]
    count: number
  }> {
    return this.classworkService.findAndPaginateClassworkMaterials(
      pageOptions,
      {
        orgId: org.id,
        accountId: account.id,
        courseId,
        searchText,
      },
    )
  }

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

  @Mutation((_return) => ClassworkMaterial)
  @UseAuthGuard(P.Classwork_UpdateClassworkMaterial)
  @UsePipes(ValidationPipe)
  async updateClassworkMaterial(
    @CurrentOrg() org: Org,
    @CurrentAccount() account: Account,
    @Args('classworkMaterialId', { type: () => ID })
    classworkMaterialId: string,
    @Args('updateClassworkMaterialInput')
    updateClassworkMaterialInput: UpdateClassworkMaterialInput,
  ): Promise<ClassworkMaterial | null> {
    return this.classworkService.updateClassworkMaterial(
      org.id,
      account.id,
      classworkMaterialId,
      updateClassworkMaterialInput,
    )
  }

  // TODO: classworkService.updateClassworkMaterialPublication

  @Mutation((_return) => ClassworkMaterial)
  @UseAuthGuard(P.Classwork_SetClassworkMaterialPublication)
  @UsePipes(ValidationPipe)
  async updateClassworkMaterialPublication(
    @CurrentOrg() org: Org,
    @CurrentAccount() account: Account,
    @Args('classworkMaterialId', { type: () => ID, nullable: false })
    classworkMaterialId: string,
    @Args('publicationState', { type: () => Publication, nullable: false })
    publicationState: string,
  ): Promise<ClassworkMaterial> {
    return this.classworkService.updateClassworkMaterialPublication(
      {
        orgId: org.id,
        accountId: account.id,
        classworkMaterialId,
      },
      publicationState,
    )
  }

  // TODO: classworkService.removeAttachmentsFromClassworkMaterial

  @Query((_return) => ClassworkMaterial)
  @UseAuthGuard(P.Classwork_ListClassworkMaterial)
  async classworkMaterial(
    @Args('Id', { type: () => ID })
    classworkMaterialId: string,
    @CurrentOrg() org: Org,
  ): Promise<Nullable<DocumentType<ClassworkMaterial>>> {
    return this.classworkService.findClassworkMaterialById(
      org.id,
      classworkMaterialId,
    )
  }

  /**
   * END MATERIAL RESOLVER
   */
}
