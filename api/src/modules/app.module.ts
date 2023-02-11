import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import AuthModule from './auth/auth.module'
import UsersModule from './users/users.module'

const config = ConfigModule.forRoot()

const connection = process.env.MONGODB_URL
const mongoConnection = MongooseModule.forRoot(connection)

@Module({
  imports: [config, mongoConnection, AuthModule, UsersModule],
})
export class AppModule {}
