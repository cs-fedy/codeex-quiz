import { Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import User from './user.domain'
import UserDTO from './user.dto'

@Injectable()
export default class UserMapper implements IMapper<User> {
  toDomain(raw: any): User {
    return new User(
      raw.id,
      raw.email,
      raw.password,
      raw.fullName,
      raw.username,
      raw.avatarURL,
      raw.roles,
    )
  }

  toPersistence(domain: User) {
    return {
      id: domain.userId,
      email: domain.email,
      password: domain.password,
      fullName: domain.fullName,
      username: domain.username,
      avatarURL: domain.avatarURL,
      roles: domain.roles,
    }
  }

  toDTO(domain: User): UserDTO {
    return new UserDTO(
      domain.userId,
      domain.email,
      domain.fullName,
      domain.username,
      domain.avatarURL,
      domain.roles,
    )
  }
}
