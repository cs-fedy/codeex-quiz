import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import IMapper from 'src/common/mapper'
import { Mappers, Models } from 'src/utils/constants'
import IUserRepo from './IUser.repository'
import User from './user.domain'
import { UserDocument } from './user.model'

@Injectable()
export default class UserRepo implements IUserRepo {
  constructor(
    @InjectModel(Models.user) private userModel: Model<UserDocument>,
    @Inject(Mappers.userMapper) private userMapper: IMapper<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    const createdUser = await this.userModel.create(user)
    return this.userMapper.toDomain(createdUser)
  }
}
