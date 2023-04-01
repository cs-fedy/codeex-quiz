import { Roles } from 'src/utils/constants'

export default class UserDTO {
  constructor(
    public userId: string,
    public email: string,
    public username: string,
    public fullName: string,
    public roles: Array<Roles>,
    public avatarURL: string,
    public isConfirmed: boolean,
  ) {}
}
