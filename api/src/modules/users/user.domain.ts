export default class User {
  constructor(
    public userId: string,
    public email: string,
    public password: string,
    public fullName: string,
    public username: string,
    public avatarURL: string,
    public roles: Array<string>,
  ) {}
}
