import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, HydratedDocument } from 'mongoose'
import { Models } from 'src/utils/constants'
import Quiz from '../quizzes/quizzes.domain'

export type MultipleChoiceQuestionDocument = HydratedDocument<MultipleChoiceQuestion>

@Schema({ collection: Models.subQuizzes })
export class MultipleChoiceQuestion extends Document {
  __type: string
  quizId: Quiz | string
  title: string
  coverImageURL?: string

  @Prop([String])
  options: Array<string>

  @Prop([Number])
  //* idealOptions represents the index of the ideal options in the options list
  idealOptions: Array<number>
}

export const MultipleChoiceQuestionSchema = SchemaFactory.createForClass(MultipleChoiceQuestion)
