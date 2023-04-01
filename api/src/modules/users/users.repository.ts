import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import IMapper from 'src/common/mapper'
import { Mappers, Models } from 'src/utils/constants'
import IUsersRepo from './i-users.repository'
import User from './users.domain'
import UserDTO from './users.dto'
import { UserDocument } from './users.model'

@Injectable()
export default class UsersRepo implements IUsersRepo {
  constructor(
    @InjectModel(Models.users) private userModel: Model<UserDocument>,
    @Inject(Mappers.user) private userMapper: IMapper<User, UserDTO>,
  ) {}

  async getUserById(userId: string): Promise<User | null> {
    const fetchedUser = await this.userModel.findById(userId)
    return fetchedUser ? this.userMapper.toDomain(fetchedUser) : null
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const fetchedUser = await this.userModel.findOne({ email })
    return fetchedUser ? this.userMapper.toDomain(fetchedUser) : null
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const fetchedUser = await this.userModel.findOne({ username })
    return fetchedUser ? this.userMapper.toDomain(fetchedUser) : null
  }

  async saveUser(args: User): Promise<User> {
    const newUser = this.userMapper.toPersistence(args)
    const savedUser = await this.userModel.findByIdAndUpdate(args.userId, newUser, {
      upsert: true,
      new: true,
    })

    return this.userMapper.toDomain(savedUser)
  }
}
