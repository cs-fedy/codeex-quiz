import { Roles } from 'src/utils/constants'

export default class User {
  constructor(
    public userId: string,
    public email: string,
    public username: string,
    public password: string,
    public fullName: string,
    public roles: Array<Roles>,
    public avatarURL: string,
    public isConfirmed: boolean,
  ) {}
}
