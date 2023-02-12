import { IsNotEmpty } from 'class-validator'

export default class GetLoggedUserArgs {
  @IsNotEmpty()
  userId: string
}
