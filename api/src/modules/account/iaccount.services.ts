import UserDTO from 'src/modules/users/users.dto'
import Either from 'src/utils/either'
import { ExpiredInvalidCode, InvalidOperation } from 'src/utils/types'

export type ConfirmEmailArgs = {
  userId: string
  confirmationCode: number
}

export type ConfirmEmailResult = Either<ExpiredInvalidCode, UserDTO>
export type RequestConfirmEmailResult = Either<InvalidOperation, { done: boolean }>

export default interface IAccountService {
  confirmEmail(args: ConfirmEmailArgs): Promise<ConfirmEmailResult>
  requestConfirmEmail(userId: string): Promise<RequestConfirmEmailResult>
}
