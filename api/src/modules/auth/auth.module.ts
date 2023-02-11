import { Module } from '@nestjs/common'
import UsersModule from '../users/users.module'
import AuthController from './auth.controller'

@Module({
  controllers: [AuthController],
  imports: [UsersModule],
})
export default class AuthModule {}
