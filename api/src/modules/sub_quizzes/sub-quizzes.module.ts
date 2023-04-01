import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Models } from 'src/utils/constants'
import MultipleChoiceQuestionsModule from '../multiple_choice_questions/multiple-choice-questions.module'
import { SubQuizSchema } from './sub-quizzes.model'

const subQuizModel = MongooseModule.forFeature([{ name: Models.subQuizzes, schema: SubQuizSchema }])

@Module({
  imports: [subQuizModel, MultipleChoiceQuestionsModule],
})
export default class SubQuizzesModule {}
