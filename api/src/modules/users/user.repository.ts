import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import IMapper from 'src/common/mapper'
import { Mappers, Models } from 'src/utils/constants'
import IUserRepo from './IUser.repository'
import User from './user.domain'
import UserDTO from './user.dto'
import { UserDocument } from './user.model'

@Injectable()
export default class UserRepo implements IUserRepo {
  constructor(
    @InjectModel(Models.user) private userModel: Model<UserDocument>,
    @Inject(Mappers.user) private userMapper: IMapper<User, UserDTO>,
  ) {}

  async createUser(user: User): Promise<User> {
    const createdUser = await this.userModel.create(user)
    return this.userMapper.toDomain(createdUser)
  }

  async getUserById(userId: string): Promise<User | null> {
    const existingUser = await this.userModel.findById(userId)
    if (!existingUser) return null
    return this.userMapper.toDomain(existingUser)
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const existingUser = await this.userModel.findOne({ email })
    if (!existingUser) return null
    return this.userMapper.toDomain(existingUser)
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const existingUser = await this.userModel.findOne({ username })
    if (!existingUser) return null
    return this.userMapper.toDomain(existingUser)
  }
}
