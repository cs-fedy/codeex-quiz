import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Models } from 'src/utils/constants'
import { MultipleChoiceQuestion } from '../multiple_choice_questions/multiple-choice-questions.model'
import { Quiz } from '../quizzes/quizzes.model'
import { User } from '../users/users.model'

export type EnrolledMultipleChoiceQuestionDocument =
  HydratedDocument<EnrolledMultipleChoiceQuestion>

@Schema({ collection: Models.enrolledSubQuizzes })
export class EnrolledMultipleChoiceQuestion {
  __type: string
  userId: User | string
  quizId: Quiz | string
  subQuizType: string
  subQuizId: MultipleChoiceQuestion | string
  points: number
  isCompleted: boolean
  answerCorrectness: boolean
  completionTime: number
  createdAt: Date

  @Prop([Number])
  userAnswer: Array<number>
}

export const EnrolledMultipleChoiceQuestionSchema = SchemaFactory.createForClass(
  EnrolledMultipleChoiceQuestion,
)
