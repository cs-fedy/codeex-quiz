import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export default class ApproveQuizArgs {
  @IsNotEmpty({ message: 'notification id is required' })
  @IsString()
  notificationId: string

  @IsString()
  decision?: string

  @IsNotEmpty({ message: 'notification id is required' })
  @IsBoolean()
  approveOrNot: boolean
}
