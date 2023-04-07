import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Models } from 'src/utils/constants'
import { Quiz } from '../quizzes/quizzes.model'
import { TrueFalseQuestion } from '../true_false_questions/true-false-questions.model'
import { User } from '../users/users.model'

export type EnrolledTrueFalseQuestionDocument = HydratedDocument<EnrolledTrueFalseQuestion>

@Schema({ collection: Models.enrolledSubQuizzes })
export class EnrolledTrueFalseQuestion {
  __type: string
  userId: User | string
  quizId: Quiz | string
  subQuizType: string
  subQuizId: TrueFalseQuestion | string
  points: number
  isCompleted: boolean
  answerCorrectness: boolean
  completionTime: number
  createdAt: Date

  @Prop(Boolean)
  userAnswer: boolean
}

export const EnrolledTrueFalseQuestionSchema =
  SchemaFactory.createForClass(EnrolledTrueFalseQuestion)
