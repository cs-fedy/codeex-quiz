import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Mappers, Models, Repositories } from 'src/utils/constants'
import UserMapper from './user.mapper'
import { UserSchema } from './user.model'
import UserRepo from './user.repository'

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
  ],
})
export default class UsersModule {}
