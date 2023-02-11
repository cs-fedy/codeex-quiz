import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Hash } from 'src/services/hashing'
import { Mappers, Models, Repositories, Services } from 'src/utils/constants'
import UserMapper from './user.mapper'
import { UserSchema } from './user.model'
import UserRepo from './user.repository'
import UserService from './user.services'

const userModel = MongooseModule.forFeature([{ schema: UserSchema, name: Models.user }])

@Module({
  imports: [userModel],
  providers: [
    { provide: Mappers.userMapper, useClass: UserMapper },
    { provide: Repositories.userRepository, useClass: UserRepo },
    { provide: Services.userService, useClass: UserService },
    { provide: Services.hash, useClass: Hash },
  ],
  exports: [
    { provide: Services.userService, useClass: UserService },
    { provide: Repositories.userRepository, useClass: UserRepo },
  ],
})
export default class UsersModule {}
