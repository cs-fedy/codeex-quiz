import User from './user.domain'

export default interface IUserRepo {
  createUser(user: User): Promise<User>
}
