import { Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import User from './users.domain'
import UserDTO from './users.dto'

@Injectable()
export default class UsersMapper implements IMapper<User, UserDTO> {
  toDomain(raw: any): User {
    return new User(
      raw._id,
      raw.email,
      raw.username,
      raw.password,
      raw.fullName,
      raw.roles,
      raw.avatarURL,
      raw.isConfirmed,
    )
  }

  toPersistence(domain: User): any {
    return {
      _id: domain.userId,
      email: domain.email,
      username: domain.username,
      password: domain.password,
      fullName: domain.fullName,
      roles: domain.roles,
      avatarURL: domain.avatarURL,
      isConfirmed: domain.isConfirmed,
    }
  }

  toDTO(domain: User): UserDTO {
    return new UserDTO(
      domain.userId,
      domain.email,
      domain.username,
      domain.fullName,
      domain.roles,
      domain.avatarURL,
      domain.isConfirmed,
    )
  }
}
