import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Mappers, Models, Repositories, Services } from 'src/utils/constants'
import UserMapper from './user.mapper'
import { UserSchema } from './user.model'
import UserRepo from './user.repository'
import UserService from './user.services'

const userModel = MongooseModule.forFeature([
  { schema: UserSchema, name: Models.user },
])

@Module({
  imports: [userModel],
  providers: [
    {
      provide: Mappers.userMapper,
      useClass: UserMapper,
    },
    {
      provide: Repositories.userRepository,
      useClass: UserRepo,
    },
    {
      provide: Services.userService,
      useClass: UserService,
    },
  ],
  exports: [
    {
      provide: Services.userService,
      useClass: UserService,
    },
  ],
})
export default class UsersModule {}
