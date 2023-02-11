export default interface IWhiteListRepo {
  add(userId: string, token: string): Promise<void>
  remove(userId: string, token: string): Promise<void>
  exists(userId: string, token: string): Promise<boolean>
}
