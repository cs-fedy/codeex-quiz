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
export default class UsersModule {}
