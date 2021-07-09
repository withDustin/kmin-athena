import { UsePipes, ValidationPipe } from '@nestjs/common'
import {
  Args,
  ID,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql'
import { DocumentType } from '@typegoose/typegoose'
import { PubSub } from 'graphql-subscriptions'

import {
  CurrentAccount,
  CurrentOrg,
  Logger,
  Publication,
  UseAuthGuard,
} from 'core'
import { Account } from 'modules/account/models/Account'
import { P } from 'modules/auth/models'
import { Org } from 'modules/org/models/Org'
import { ANY, Nullable, PageOptionsInput } from 'types'

import { ClassworkService } from './classwork.service'
import {
  CreateClassworkAssignmentInput,
  UpdateClassworkAssignmentInput,
  ClassworkAssignmentPayload,
  AddAttachmentsToClassworkInput,
} from './classwork.type'
import { ClassworkAssignment } from './models/ClassworkAssignment'

const pubSub = new PubSub()
@Resolver((_of) => ClassworkAssignment)
export class ClassworkAssignmentsResolver {
  private readonly logger = new Logger(ClassworkAssignmentsResolver.name)

  constructor(private readonly classworkService: ClassworkService) {}

  /**
   *START ASSIGNMENTS RESOLVER
   */

  @Query((_return) => ClassworkAssignment)
  @UseAuthGuard(P.Classwork_ListClassworkAssignment)
  async classworkAssignment(
    @Args('id', { type: () => ID })
    classworkAssignmentId: string,
    @CurrentOrg() org: Org,
  ): Promise<Nullable<DocumentType<ClassworkAssignment>>> {
    return this.classworkService.findClassworkAssignmentById(
      org.id,
      classworkAssignmentId,
    )
  }

  @Query((_return) => ClassworkAssignmentPayload)
  @UseAuthGuard(P.Classwork_ListClassworkAssignment)
  async classworkAssignments(
    @CurrentOrg() org: Org,
    @CurrentAccount() account: Account,
    @Args('pageOptions') pageOptions: PageOptionsInput,
    @Args('courseId', { type: () => ID }) courseId: string,
    @Args('searchText', { nullable: true }) searchText?: string,
  ): Promise<ClassworkAssignmentPayload> {
    return this.classworkService.findAndPaginateClassworkAssignments(
      pageOptions,
      {
        orgId: org.id,
        accountId: account.id,
        courseId,
        searchText,
      },
    )
  }

  @Subscription((_returns) => ClassworkAssignment, {
    filter: (payload, variables) =>
      payload.classworkAssignmentCreated.courseId === variables.courseId,
  })
  classworkAssignmentCreated(
    @Args('courseId', { type: () => ID }) _courseId: string,
  ): AsyncIterator<unknown, ANY, undefined> {
    return pubSub.asyncIterator('classworkAssignmentCreated')
  }

  @Mutation((_returns) => ClassworkAssignment)
  @UseAuthGuard(P.Classwork_CreateClassworkAssignment)
  @UsePipes(ValidationPipe)
  async createClassworkAssignment(
    @Args('input')
    createClassworkAssignmentInput: CreateClassworkAssignmentInput,
    @Args('courseId', { type: () => ID }) courseId: string,
    @CurrentAccount() account: Account,
    @CurrentOrg() org: Org,
  ): Promise<ClassworkAssignment> {
    const classworkAssignment =
      await this.classworkService.createClassworkAssignment(
        account.id,
        courseId,
        org.id,
        createClassworkAssignmentInput,
      )

    pubSub.publish('classworkAssignmentCreated', {
      classworkAssignmentCreated: classworkAssignment,
    })

    return classworkAssignment
  }

  @Mutation((_returns) => ClassworkAssignment)
  @UseAuthGuard(P.Classwork_UpdateClassworkAssignment)
  @UsePipes(ValidationPipe)
  async updateClassworkAssignment(
    @Args('id', { type: () => ID }) classworkAssignmentId: string,
    @Args('updateInput') updateInput: UpdateClassworkAssignmentInput,
    @CurrentOrg() currentOrg: Org,
    @CurrentAccount() currentAccount: Account,
  ): Promise<ClassworkAssignment> {
    return this.classworkService.updateClassworkAssignment(
      {
        id: classworkAssignmentId,
        accountId: currentAccount.id,
        orgId: currentOrg.id,
      },
      updateInput,
    )
  }

  @Mutation((_return) => ClassworkAssignment)
  @UseAuthGuard(P.Classwork_SetClassworkAssignmentPublication)
  @UsePipes(ValidationPipe)
  async updateClassworkAssignmentPublication(
    @Args('id', { type: () => ID }) classworkAssignmentId: string,
    @Args('publication', { type: () => String }) publication: Publication,
    @CurrentOrg() currentOrg: Org,
    @CurrentAccount() currentAccount: Account,
  ): Promise<ClassworkAssignment> {
    return this.classworkService.updateClassworkAssignmentPublication(
      {
        id: classworkAssignmentId,
        accountId: currentAccount.id,
        orgId: currentOrg.id,
      },
      publication,
    )
  }

  @Mutation((_returns) => ClassworkAssignment)
  @UseAuthGuard(P.Classwork_AddAttachmentsToClassworkAssignment)
  async addAttachmentsToClassworkAssignment(
    @CurrentOrg() org: Org,
    @CurrentAccount() account: Account,
    @Args('classworkAssignmentId', { type: () => ID })
    classworkAssignmentId: string,
    @Args('attachmentsInput') attachmentsInput: AddAttachmentsToClassworkInput,
  ): Promise<Nullable<DocumentType<ClassworkAssignment>>> {
    return this.classworkService.addAttachmentsToClassworkAssignment(
      org.id,
      classworkAssignmentId,
      attachmentsInput,
      account.id,
    )
  }

  @Mutation((_returns) => ClassworkAssignment)
  @UseAuthGuard(P.Classwork_RemoveAttachmentsFromClassworkAssignment)
  async removeAttachmentsFromClassworkAssignments(
    @CurrentOrg() org: Org,
    @Args('classworkAssignmentId', { type: () => ID })
    classworkAssignmentId: string,
    @Args('attachments', { type: () => [String] }) attachments?: [],
  ): Promise<Nullable<DocumentType<ClassworkAssignment>>> {
    return this.classworkService.removeAttachmentsFromClassworkAssignment(
      org.id,
      classworkAssignmentId,
      attachments,
    )
  }

  /**
   * END ASSIGNMENTS RESOLVER
   */
}
