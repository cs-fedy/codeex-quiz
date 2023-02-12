import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { JwtMiddleware } from 'src/middlewares/jwt'
import { Hash } from 'src/services/hashing'
import { Services } from 'src/utils/constants'
import AccessModule from '../access/access.module'
import RefreshModule from '../refresh/refresh.module'
import UsersModule from '../users/users.module'
import AuthController from './auth.controller'
import AuthService from './auth.services'

@Module({
  imports: [UsersModule, RefreshModule, RefreshModule, AccessModule],
  controllers: [AuthController],
  providers: [
    { provide: Services.hash, useClass: Hash },
    { provide: Services.auth, useClass: AuthService },
  ],
})
export default class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('auth/logout')
  }
}
