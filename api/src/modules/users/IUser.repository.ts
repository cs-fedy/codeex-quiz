import User from './user.domain'

export default interface IUserRepo {
  createUser(user: User): Promise<User>
  getUserById(userId: string): Promise<User | null>
  getUserByEmail(email: string): Promise<User | null>
  getUserByUsername(username: string): Promise<User | null>
}
