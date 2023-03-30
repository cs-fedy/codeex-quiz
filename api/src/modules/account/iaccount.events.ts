export type NewConfirmEmailRequestArgs = { userId: string }
export default interface IAccountEvents {
  newConfirmEmailRequest(args: NewConfirmEmailRequestArgs): Promise<void>
}
