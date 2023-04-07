import { IsNotEmpty, IsString } from 'class-validator'

export default class CreateTopicArgs {
  @IsNotEmpty({ message: 'topic label is required' })
  @IsString()
  label: string
}
