import User from './users.domain'

export default interface IUsersRepo {
  saveUser(args: User): Promise<User>
  getUserById(userId: string): Promise<User | null>
  getUserByEmail(email: string): Promise<User | null>
  getUserByUsername(username: string): Promise<User | null>
}
