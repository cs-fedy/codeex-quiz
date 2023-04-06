import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, HydratedDocument } from 'mongoose'
import { Models } from 'src/utils/constants'
import Quiz from '../quizzes/quizzes.domain'
import { SubQuiz } from '../sub_quizzes/sub-quizzes.model'

export type TrueFalseQuestionDocument = HydratedDocument<TrueFalseQuestion>

@Schema({ collection: Models.subQuizzes })
export class TrueFalseQuestion extends Document {
  __type: string
  quizId: Quiz | string
  title: string
  coverImageURL?: string
  points: number
  timeLimit: number
  dificulity: number
  prevSubQuizId?: SubQuiz | string
  nextSubQuizId?: SubQuiz | string

  @Prop(Boolean)
  idealOption: boolean
}

export const TrueFalseQuestionSchema = SchemaFactory.createForClass(TrueFalseQuestion)
