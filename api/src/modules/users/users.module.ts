import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtMiddleware } from 'src/middlewares/jwt'
import { Hash } from 'src/services/hashing'
import { Mappers, Models, Repositories, Services } from 'src/utils/constants'
import AccessModule from '../access/access.module'
import UsersController from './user.controllers'
import UserMapper from './user.mapper'
import { UserSchema } from './user.model'
import UserRepo from './user.repository'
import UserService from './user.services'

const userModel = MongooseModule.forFeature([{ schema: UserSchema, name: Models.user }])
const jwt = JwtModule.register({ secret: process.env.JWT_SECRET })

@Module({
  imports: [userModel, jwt, AccessModule],
  controllers: [UsersController],
  providers: [
    { provide: Mappers.user, useClass: UserMapper },
    { provide: Repositories.user, useClass: UserRepo },
    { provide: Services.user, useClass: UserService },
    { provide: Services.hash, useClass: Hash },
  ],
  exports: [
    { provide: Services.user, useClass: UserService },
    { provide: Repositories.user, useClass: UserRepo },
  ],
})
export default class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes(UsersController)
  }
}
