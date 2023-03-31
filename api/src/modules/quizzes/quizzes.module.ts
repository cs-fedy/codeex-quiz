import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Mappers, Models, Repos } from 'src/utils/constants'
import QuizMapper from './quizzes.mapper'
import { QuizSchema } from './quizzes.model'
import QuizRepo from './quizzes.repository'

const quizModel = MongooseModule.forFeature([{ name: Models.quizzes, schema: QuizSchema }])

@Module({
  imports: [quizModel],
  providers: [
    { provide: Repos.quiz, useClass: QuizRepo },
    { provide: Mappers.quiz, useClass: QuizMapper },
  ],
  exports: [
    { provide: Repos.quiz, useClass: QuizRepo },
    { provide: Mappers.quiz, useClass: QuizMapper },
  ],
})
export default class QuizzesModule {}
