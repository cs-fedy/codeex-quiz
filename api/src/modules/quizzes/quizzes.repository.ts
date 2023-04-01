import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import IMapper from 'src/common/mapper'
import { Mappers, Models } from 'src/utils/constants'
import IQuizRepo from './i-quizzes.repository'
import Quiz from './quizzes.domain'
import QuizDTO from './quizzes.dto'
import { QuizDocument } from './quizzes.model'

@Injectable()
export default class QuizRepo implements IQuizRepo {
  constructor(
    @InjectModel(Models.quizzes) private quizModel: Model<QuizDocument>,
    @Inject(Mappers.quiz) private quizMapper: IMapper<Quiz, QuizDTO>,
  ) {}

  async saveQuiz(args: Quiz): Promise<Quiz> {
    const newQuiz = this.quizMapper.toPersistence(args)
    const savedQuiz = await this.quizModel.findByIdAndUpdate(args.quizId, newQuiz, {
      upsert: true,
      new: true,
    })

    return this.quizMapper.toDomain(savedQuiz)
  }

  async getQuizById(quizId: string): Promise<Quiz | null> {
    const fetchedQuiz = await this.quizModel.findById(quizId)
    return fetchedQuiz ? this.quizMapper.toDomain(fetchedQuiz) : null
  }

  async listQuizzesByCreatorId(creator: string): Promise<Array<Quiz>> {
    const quizzes = await this.quizModel.find({ creator })
    const mappedQuizzes = quizzes.map(this.quizMapper.toDomain)
    return mappedQuizzes
  }
}
