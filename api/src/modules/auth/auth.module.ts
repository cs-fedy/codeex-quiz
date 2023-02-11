import { Module } from '@nestjs/common'
import AccessModule from '../access/access.module'
import RefreshModule from '../refresh/refresh.module'
import UsersModule from '../users/users.module'
import AuthController from './auth.controller'

@Module({
  imports: [UsersModule, RefreshModule, RefreshModule, AccessModule],
  controllers: [AuthController],
})
export default class AuthModule {}
