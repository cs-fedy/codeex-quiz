import { Type } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'
import { Roles } from 'src/utils/constants'

export default class GetSubQuizArgs {
  @IsNotEmpty({ message: 'user id is required' })
  @IsString()
  userId: string

  @IsNotEmpty({ message: 'user id is required' })
  @Type(() => Array<Roles>)
  roles: Array<Roles>
}
