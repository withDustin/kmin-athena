/* THIS IS AN AUTO-GENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY. */

import { DocumentNode } from 'graphql'
import * as Apollo from '@apollo/client'
import * as ApolloReactHoc from '@apollo/client/react/hoc'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any
}

export type Account = BaseModel & {
  id: Scalars['ID']
  orgId: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  username: Scalars['String']
  email: Scalars['String']
  displayName: Scalars['String']
  status: AccountStatus
  roles: Array<Scalars['String']>
  availability: AccountAvailability
}

export type BaseModel = {
  id: Scalars['ID']
  orgId: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
}

/** Status of an account. */
export enum AccountStatus {
  Pending = 'Pending',
  Active = 'Active',
  Deactivated = 'Deactivated',
}

export enum AccountAvailability {
  Online = 'Online',
  Offline = 'Offline',
  Away = 'Away',
}

export type Org = BaseModel & {
  id: Scalars['ID']
  orgId: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  namespace: Scalars['String']
  name: Scalars['String']
}

export type AuthenticatePayload = {
  account: Account
  org: Org
  permissions: Array<Permission>
}

export enum Permission {
  Hr_Access = 'Hr_Access',
  Hr_CreateAccount = 'Hr_CreateAccount',
  Hr_ListOrgAccounts = 'Hr_ListOrgAccounts',
  Hr_UpdateOrgAccount = 'Hr_UpdateOrgAccount',
  NoPermission = 'NoPermission',
}

export type SignInPayload = {
  token: Scalars['String']
  account: Account
  org: Org
  permissions: Array<Permission>
}

export type OrgAccountsPayload = {
  accounts: Array<Account>
  totalCount: Scalars['Int']
}

export type Query = {
  account?: Maybe<Account>
  orgAccounts: OrgAccountsPayload
  authenticate: AuthenticatePayload
}

export type QueryAccountArgs = {
  id: Scalars['ID']
}

export type QueryOrgAccountsArgs = {
  pageOptions: PageOptionsInput
  orgId: Scalars['ID']
}

export type PageOptionsInput = {
  skip: Scalars['Int']
  limit: Scalars['Int']
}

export type Mutation = {
  createAccount: Account
  signIn: SignInPayload
}

export type MutationCreateAccountArgs = {
  input: CreateAccountInput
}

export type MutationSignInArgs = {
  password: Scalars['String']
  identity: Scalars['String']
  orgNamespace: Scalars['String']
}

export type CreateAccountInput = {
  username: Scalars['String']
  email: Scalars['String']
  displayName: Scalars['String']
  roles: Array<Scalars['String']>
}

export type AuthAccountFragment = Pick<
  Account,
  'id' | 'orgId' | 'status' | 'email' | 'username' | 'displayName'
>

export type AuthOrgFragment = Pick<Org, 'id' | 'name' | 'namespace'>

export type SignInMutationVariables = Exact<{
  orgNamespace: Scalars['String']
  identity: Scalars['String']
  password: Scalars['String']
}>

export type SignInMutation = {
  signIn: Pick<SignInPayload, 'token'> & {
    account: AuthAccountFragment
    org: AuthOrgFragment
  }
}

export type AuthenticateQueryVariables = Exact<{ [key: string]: never }>

export type AuthenticateQuery = {
  authenticate: Pick<AuthenticatePayload, 'permissions'> & {
    account: AuthAccountFragment
    org: AuthOrgFragment
  }
}

export type AccountAvatarQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type AccountAvatarQuery = {
  account?: Maybe<
    Pick<Account, 'id' | 'email' | 'username' | 'displayName' | 'availability'>
  >
}

export type AccountDisplayNameQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type AccountDisplayNameQuery = {
  account?: Maybe<Pick<Account, 'id' | 'username' | 'displayName'>>
}

export type OrgAccountListQueryVariables = Exact<{
  orgId: Scalars['ID']
  skip: Scalars['Int']
  limit: Scalars['Int']
}>

export type OrgAccountListQuery = {
  orgAccounts: Pick<OrgAccountsPayload, 'totalCount'> & {
    accounts: Array<
      Pick<
        Account,
        | 'id'
        | 'email'
        | 'displayName'
        | 'username'
        | 'roles'
        | 'availability'
        | 'status'
      >
    >
  }
}

export const AuthAccountFragmentDoc: DocumentNode = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AuthAccount' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Account' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'orgId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'username' } },
          { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
        ],
      },
    },
  ],
}
export const AuthOrgFragmentDoc: DocumentNode = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AuthOrg' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Org' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'namespace' } },
        ],
      },
    },
  ],
}
export const SignInDocument: DocumentNode = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SignIn' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orgNamespace' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'identity' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'password' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'signIn' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'password' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'password' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'identity' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'identity' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orgNamespace' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orgNamespace' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'account' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AuthAccount' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'org' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AuthOrg' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AuthAccount' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Account' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'orgId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'username' } },
          { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AuthOrg' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Org' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'namespace' } },
        ],
      },
    },
  ],
}
export type SignInMutationFn = Apollo.MutationFunction<
  SignInMutation,
  SignInMutationVariables
>
export type SignInProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: Apollo.MutationFunction<
    SignInMutation,
    SignInMutationVariables
  >
} &
  TChildProps
export function withSignIn<
  TProps,
  TChildProps = {},
  TDataName extends string = 'mutate'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    SignInMutation,
    SignInMutationVariables,
    SignInProps<TChildProps, TDataName>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    SignInMutation,
    SignInMutationVariables,
    SignInProps<TChildProps, TDataName>
  >(SignInDocument, {
    alias: 'signIn',
    ...operationOptions,
  })
}

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      orgNamespace: // value for 'orgNamespace'
 *      identity: // value for 'identity'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignInMutation,
    SignInMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<SignInMutation, SignInMutationVariables>(
    SignInDocument,
    options,
  )
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  SignInMutation,
  SignInMutationVariables
>
export const AuthenticateDocument: DocumentNode = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Authenticate' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'authenticate' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'account' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AuthAccount' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'org' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AuthOrg' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'permissions' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AuthAccount' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Account' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'orgId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'username' } },
          { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AuthOrg' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Org' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'namespace' } },
        ],
      },
    },
  ],
}
export type AuthenticateProps<
  TChildProps = {},
  TDataName extends string = 'data'
> = {
  [key in TDataName]: ApolloReactHoc.DataValue<
    AuthenticateQuery,
    AuthenticateQueryVariables
  >
} &
  TChildProps
export function withAuthenticate<
  TProps,
  TChildProps = {},
  TDataName extends string = 'data'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    AuthenticateQuery,
    AuthenticateQueryVariables,
    AuthenticateProps<TChildProps, TDataName>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    AuthenticateQuery,
    AuthenticateQueryVariables,
    AuthenticateProps<TChildProps, TDataName>
  >(AuthenticateDocument, {
    alias: 'authenticate',
    ...operationOptions,
  })
}

/**
 * __useAuthenticateQuery__
 *
 * To run a query within a React component, call `useAuthenticateQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthenticateQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthenticateQuery(
  baseOptions?: Apollo.QueryHookOptions<
    AuthenticateQuery,
    AuthenticateQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<AuthenticateQuery, AuthenticateQueryVariables>(
    AuthenticateDocument,
    options,
  )
}
export function useAuthenticateLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AuthenticateQuery,
    AuthenticateQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<AuthenticateQuery, AuthenticateQueryVariables>(
    AuthenticateDocument,
    options,
  )
}
export type AuthenticateQueryHookResult = ReturnType<
  typeof useAuthenticateQuery
>
export type AuthenticateLazyQueryHookResult = ReturnType<
  typeof useAuthenticateLazyQuery
>
export type AuthenticateQueryResult = Apollo.QueryResult<
  AuthenticateQuery,
  AuthenticateQueryVariables
>
export const AccountAvatarDocument: DocumentNode = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AccountAvatar' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'account' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'availability' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
}
export type AccountAvatarProps<
  TChildProps = {},
  TDataName extends string = 'data'
> = {
  [key in TDataName]: ApolloReactHoc.DataValue<
    AccountAvatarQuery,
    AccountAvatarQueryVariables
  >
} &
  TChildProps
export function withAccountAvatar<
  TProps,
  TChildProps = {},
  TDataName extends string = 'data'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    AccountAvatarQuery,
    AccountAvatarQueryVariables,
    AccountAvatarProps<TChildProps, TDataName>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    AccountAvatarQuery,
    AccountAvatarQueryVariables,
    AccountAvatarProps<TChildProps, TDataName>
  >(AccountAvatarDocument, {
    alias: 'accountAvatar',
    ...operationOptions,
  })
}

/**
 * __useAccountAvatarQuery__
 *
 * To run a query within a React component, call `useAccountAvatarQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountAvatarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountAvatarQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAccountAvatarQuery(
  baseOptions: Apollo.QueryHookOptions<
    AccountAvatarQuery,
    AccountAvatarQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<AccountAvatarQuery, AccountAvatarQueryVariables>(
    AccountAvatarDocument,
    options,
  )
}
export function useAccountAvatarLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AccountAvatarQuery,
    AccountAvatarQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<AccountAvatarQuery, AccountAvatarQueryVariables>(
    AccountAvatarDocument,
    options,
  )
}
export type AccountAvatarQueryHookResult = ReturnType<
  typeof useAccountAvatarQuery
>
export type AccountAvatarLazyQueryHookResult = ReturnType<
  typeof useAccountAvatarLazyQuery
>
export type AccountAvatarQueryResult = Apollo.QueryResult<
  AccountAvatarQuery,
  AccountAvatarQueryVariables
>
export const AccountDisplayNameDocument: DocumentNode = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AccountDisplayName' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'account' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
              ],
            },
          },
        ],
      },
    },
  ],
}
export type AccountDisplayNameProps<
  TChildProps = {},
  TDataName extends string = 'data'
> = {
  [key in TDataName]: ApolloReactHoc.DataValue<
    AccountDisplayNameQuery,
    AccountDisplayNameQueryVariables
  >
} &
  TChildProps
export function withAccountDisplayName<
  TProps,
  TChildProps = {},
  TDataName extends string = 'data'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    AccountDisplayNameQuery,
    AccountDisplayNameQueryVariables,
    AccountDisplayNameProps<TChildProps, TDataName>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    AccountDisplayNameQuery,
    AccountDisplayNameQueryVariables,
    AccountDisplayNameProps<TChildProps, TDataName>
  >(AccountDisplayNameDocument, {
    alias: 'accountDisplayName',
    ...operationOptions,
  })
}

/**
 * __useAccountDisplayNameQuery__
 *
 * To run a query within a React component, call `useAccountDisplayNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountDisplayNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountDisplayNameQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAccountDisplayNameQuery(
  baseOptions: Apollo.QueryHookOptions<
    AccountDisplayNameQuery,
    AccountDisplayNameQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    AccountDisplayNameQuery,
    AccountDisplayNameQueryVariables
  >(AccountDisplayNameDocument, options)
}
export function useAccountDisplayNameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AccountDisplayNameQuery,
    AccountDisplayNameQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    AccountDisplayNameQuery,
    AccountDisplayNameQueryVariables
  >(AccountDisplayNameDocument, options)
}
export type AccountDisplayNameQueryHookResult = ReturnType<
  typeof useAccountDisplayNameQuery
>
export type AccountDisplayNameLazyQueryHookResult = ReturnType<
  typeof useAccountDisplayNameLazyQuery
>
export type AccountDisplayNameQueryResult = Apollo.QueryResult<
  AccountDisplayNameQuery,
  AccountDisplayNameQueryVariables
>
export const OrgAccountListDocument: DocumentNode = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'OrgAccountList' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orgId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'orgAccounts' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pageOptions' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'skip' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'skip' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'limit' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'limit' },
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orgId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orgId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'accounts' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'displayName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'username' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'roles' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'availability' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'status' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
              ],
            },
          },
        ],
      },
    },
  ],
}
export type OrgAccountListProps<
  TChildProps = {},
  TDataName extends string = 'data'
> = {
  [key in TDataName]: ApolloReactHoc.DataValue<
    OrgAccountListQuery,
    OrgAccountListQueryVariables
  >
} &
  TChildProps
export function withOrgAccountList<
  TProps,
  TChildProps = {},
  TDataName extends string = 'data'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    OrgAccountListQuery,
    OrgAccountListQueryVariables,
    OrgAccountListProps<TChildProps, TDataName>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    OrgAccountListQuery,
    OrgAccountListQueryVariables,
    OrgAccountListProps<TChildProps, TDataName>
  >(OrgAccountListDocument, {
    alias: 'orgAccountList',
    ...operationOptions,
  })
}

/**
 * __useOrgAccountListQuery__
 *
 * To run a query within a React component, call `useOrgAccountListQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrgAccountListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrgAccountListQuery({
 *   variables: {
 *      orgId: // value for 'orgId'
 *      skip: // value for 'skip'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useOrgAccountListQuery(
  baseOptions: Apollo.QueryHookOptions<
    OrgAccountListQuery,
    OrgAccountListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<OrgAccountListQuery, OrgAccountListQueryVariables>(
    OrgAccountListDocument,
    options,
  )
}
export function useOrgAccountListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    OrgAccountListQuery,
    OrgAccountListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<OrgAccountListQuery, OrgAccountListQueryVariables>(
    OrgAccountListDocument,
    options,
  )
}
export type OrgAccountListQueryHookResult = ReturnType<
  typeof useOrgAccountListQuery
>
export type OrgAccountListLazyQueryHookResult = ReturnType<
  typeof useOrgAccountListLazyQuery
>
export type OrgAccountListQueryResult = Apollo.QueryResult<
  OrgAccountListQuery,
  OrgAccountListQueryVariables
>
