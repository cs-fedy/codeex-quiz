export type NewEmailUpdatedArgs = {
  oldEmail: string
  newEmail: string
  userId: string
}

export type NewPasswordUpdatedArgs = {
  userId: string
}

export default interface IProfileEvents {
  newEmailUpdated(args: NewEmailUpdatedArgs): Promise<void>
  newPasswordUpdated(args: NewPasswordUpdatedArgs): Promise<void>
}
