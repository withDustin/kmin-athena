import { UsePipes, ValidationPipe } from '@nestjs/common'
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CurrentAccount, CurrentOrg, UseAuthGuard } from 'core/auth'
import { P } from 'modules/auth/models'
import { Org } from 'modules/org/models/Org'
import { Nullable } from 'types'

import { AccountService } from './account.service'
import { CreateAccountInput } from './account.type'
import { Account } from './models/Account'

@Resolver((_of) => Account)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Mutation((_returns) => Account)
  @UseAuthGuard(P.Hr_CreateAccount)
  @UsePipes(ValidationPipe)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
    @CurrentAccount() account: Account,
    @CurrentOrg() org: Org,
  ): Promise<Account> {
    return this.accountService.createAccount({
      ...createAccountInput,
      createdByAccountId: account.id,
      orgId: org.id,
    })
  }

  @Query((_returns) => Account, { nullable: true })
  @UseAuthGuard()
  async account(
    @Args('id', { type: () => ID }) id: string,
    @CurrentOrg() org: Org,
  ): Promise<Nullable<Account>> {
    return this.accountService.findOneAccount({ id, orgId: org.id })
  }
}
