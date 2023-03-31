import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import AccountsModule from './account/account.module'
import AuthModule from './auth/auth.module'
import ProfilesModule from './profiles/profiles.module'
import ResetPasswordModule from './reset_password/reset_password.module'
import UsersModule from './users/users.module'

const config = ConfigModule.forRoot()

const connection = process.env.MONGODB_URL
const mongoConnection = MongooseModule.forRoot(connection)

const bullConnection = BullModule.forRoot({
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
})

@Module({
  imports: [
    config,
    bullConnection,
    mongoConnection,
    AuthModule,
    UsersModule,
    ProfilesModule,
    AccountsModule,
    ResetPasswordModule,
  ],
})
export default class AppModule {}
