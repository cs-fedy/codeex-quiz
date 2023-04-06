import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Models } from 'src/utils/constants'
import { Quiz } from '../quizzes/quizzes.model'
import { UniqueChoiceQuestion } from '../unique_choice_questions/unique-choice-questions.model'
import { User } from '../users/users.model'

export type EnrolledUniqueChoiceQuestionDocument = HydratedDocument<EnrolledUniqueChoiceQuestion>

@Schema({ collection: Models.enrolledSubQuizzes })
export class EnrolledUniqueChoiceQuestion {
  __type: string
  userId: User | string
  quizId: Quiz | string
  subQuizType: string
  subQuizId: UniqueChoiceQuestion | string
  points: number
  isCompleted: boolean
  answerCorrectness: boolean
  completionTime: number
  createdAt: Date

  @Prop(Number)
  userAnswer: number
}

export const EnrolledUniqueChoiceQuestionSchema = SchemaFactory.createForClass(
  EnrolledUniqueChoiceQuestion,
)
