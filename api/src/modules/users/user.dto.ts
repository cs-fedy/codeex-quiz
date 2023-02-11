export default class UserDTO {
  constructor(
    public userId: string,
    public email: string,
    public fullName: string,
    public username: string,
    public avatarURL: string,
    public roles: Array<string>,
  ) {}
}
