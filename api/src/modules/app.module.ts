import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import AccountsModule from './account/account.module'
import AuthModule from './auth/auth.module'
import { KNEX_POSTGRES_DB } from './knex/constants'
import KnexModule from './knex/knex.module'
import ProfilesModule from './profiles/profiles.module'
import ResetPasswordModule from './reset_password/reset_password.module'
import UsersModule from './users/users.module'

const config = ConfigModule.forRoot()

const knex = KnexModule.forRoot({
  name: KNEX_POSTGRES_DB,
  config: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
  },
})

const bullConnection = BullModule.forRoot({
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
})

@Module({
  imports: [
    knex,
    config,
    bullConnection,
    AuthModule,
    UsersModule,
    ProfilesModule,
    AccountsModule,
    ResetPasswordModule,
  ],
})
export default class AppModule {}
