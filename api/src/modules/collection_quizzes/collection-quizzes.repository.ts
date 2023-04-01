import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import IMapper from 'src/common/mapper'
import { Mappers, Models } from 'src/utils/constants'
import Quiz from '../quizzes/quizzes.domain'
import QuizDTO from '../quizzes/quizzes.dto'
import CollectionQuiz from './collection-quizzes.domain'
import CollectionQuizDTO from './collection-quizzes.dto'
import { CollectionQuizDocument } from './collection-quizzes.model'
import ICollectionQuizRepo from './i-collection-quizzes.repository'

@Injectable()
export default class CollectionQuizRepo implements ICollectionQuizRepo {
  constructor(
    @InjectModel(Models.collectionQuizzes)
    private collectionQuizModel: Model<CollectionQuizDocument>,
    @Inject(Mappers.collectionQuiz)
    private collectionQuizMapper: IMapper<CollectionQuiz, CollectionQuizDTO>,
    @Inject(Mappers.quiz) private quizMapper: IMapper<Quiz, QuizDTO>,
  ) {}

  async saveCollectionQuiz(args: CollectionQuiz): Promise<CollectionQuiz> {
    const newCollectionQuiz = this.collectionQuizMapper.toPersistence(args)
    const savedCollectionQuiz = await this.collectionQuizModel.create(newCollectionQuiz)

    return this.collectionQuizMapper.toDomain(savedCollectionQuiz)
  }

  async exist(collectionId: string, quizId: string): Promise<boolean> {
    const existingCollectionQuiz = await this.collectionQuizModel.findOne({
      collectionId,
      quizId,
    })

    return !!existingCollectionQuiz
  }

  async listCollectionQuizzes(collectionId: string): Promise<Array<Quiz>> {
    const collectionQuizzes = await this.collectionQuizModel
      .find({ collectionId })
      .populate('quizId')

    const mappedQuizzes = collectionQuizzes.map((collectionQuiz) =>
      this.quizMapper.toDomain(collectionQuiz.quizId as any),
    )

    return mappedQuizzes
  }
}
