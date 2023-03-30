export type NewUserExistArgs = { userId: string }
export default interface IUserEvents {
  newUserExist(args: NewUserExistArgs): Promise<void>
}
