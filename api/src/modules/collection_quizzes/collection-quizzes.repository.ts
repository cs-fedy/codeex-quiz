import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import IMapper from 'src/common/mapper'
import { Mappers, Models } from 'src/utils/constants'
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
}
