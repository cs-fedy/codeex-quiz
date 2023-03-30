import { Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import User from './users.domain'
import UserDTO from './users.dto'

@Injectable()
export default class UsersMapper implements IMapper<User, UserDTO> {
  toDomain(raw: any): User {
    return new User(
      raw.id,
      raw.email,
      raw.username,
      raw.password,
      raw.full_name,
      raw.roles,
      raw.avatar_url,
      raw.is_confirmed,
    )
  }

  toPersistence(domain: User): any {
    return {
      id: domain.userId,
      email: domain.email,
      username: domain.username,
      password: domain.password,
      full_name: domain.fullName,
      roles: domain.roles,
      avatar_url: domain.avatarURL,
      is_confirmed: domain.isConfirmed,
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
