import { join } from 'path'

import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypegooseModule } from 'nestjs-typegoose'

import { config } from 'core'
import { AccountModule } from 'modules/account/account.module'

const appModules = [AccountModule]

@Module({
  imports: [
    ...(config.IS_PROD
      ? [
          ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../../../../web', 'build'),
          }),
        ]
      : []),

    TypegooseModule.forRoot(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: config.IS_PROD ? true : 'schema.gql',
      introspection: true,
      playground: !config.IS_PROD,
    }),

    ...appModules,
  ],
})
export class AppModule {}
