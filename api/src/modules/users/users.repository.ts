import { Inject, Injectable } from '@nestjs/common'
import { Knex } from 'knex'
import IMapper from 'src/common/mapper'
import { Mappers, Models } from 'src/utils/constants'
import { InjectConnection } from '../knex/decorators'
import IUsersRepo from './IUsers.repository'
import User from './users.domain'
import UserDTO from './users.dto'

@Injectable()
export default class UsersRepo implements IUsersRepo {
  constructor(
    @InjectConnection() private knexConnection: Knex,
    @Inject(Mappers.user) private userMapper: IMapper<User, UserDTO>,
  ) {}

  async getUserById(userId: string): Promise<User | null> {
    const table = this.knexConnection(Models.users)
    const fetchedUser = await table.select('*').where('id', userId).first()
    return fetchedUser ? this.userMapper.toDomain(fetchedUser) : null
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const table = this.knexConnection(Models.users)
    const fetchedUser = await table.select('*').where('email', email).first()
    return fetchedUser ? this.userMapper.toDomain(fetchedUser) : null
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const table = this.knexConnection(Models.users)
    const fetchedUser = await table.select('*').where('username', username).first()

    return fetchedUser ? this.userMapper.toDomain(fetchedUser) : null
  }

  async saveUser(args: User): Promise<User> {
    const table = this.knexConnection(Models.users)
    const newUser = this.userMapper.toPersistence(args)
    const [savedUser] = await table.insert(newUser).onConflict('id').merge().returning('*')

    return this.userMapper.toDomain(savedUser)
  }
}
