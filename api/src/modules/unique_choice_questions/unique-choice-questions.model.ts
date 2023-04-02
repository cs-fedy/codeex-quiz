import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, HydratedDocument } from 'mongoose'
import { Models } from 'src/utils/constants'
import Quiz from '../quizzes/quizzes.domain'

export type UniqueChoiceQuestionDocument = HydratedDocument<UniqueChoiceQuestion>

@Schema({ collection: Models.subQuizzes })
export class UniqueChoiceQuestion extends Document {
  __type: string
  quizId: Quiz | string
  title: string
  coverImageURL?: string
  points: number
  timeLimit: number

  @Prop([String])
  options: Array<string>

  @Prop(Number)
  idealOption: number
}

export const UniqueChoiceQuestionSchema = SchemaFactory.createForClass(UniqueChoiceQuestion)
