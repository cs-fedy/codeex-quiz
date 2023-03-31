export type NewResetPasswordRequestArgs = {
  userId: string
  code: number
  expiresIn: string
}

export type NewPasswordUpdatedArgs = {
  userId: string
}

export default interface IResetPasswordEvents {
  newResetPasswordRequest(args: NewResetPasswordRequestArgs): Promise<void>
  newPasswordUpdated(args: NewPasswordUpdatedArgs): Promise<void>
}
