import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import { Mappers, Repos } from 'src/utils/constants'
import { Left, Right } from 'src/utils/either'
import ICollectionRepo from '../collections/i-collections.repository'
import IQuizRepo from '../quizzes/i-quizzes.repository'
import CollectionQuiz from './collection-quizzes.domain'
import CollectionQuizDTO from './collection-quizzes.dto'
import ICollectionQuizRepo from './i-collection-quizzes.repository'
import ICollectionQuizService, { AddQuizArgs, AddQuizResult } from './i-collection-quizzes.services'

@Injectable()
export default class CollectionQuizService implements ICollectionQuizService {
  constructor(
    @Inject(Repos.quiz) private quizRepo: IQuizRepo,
    @Inject(Repos.collection) private collectionRepo: ICollectionRepo,
    @Inject(Repos.collectionQuiz)
    private collectionQuizRepo: ICollectionQuizRepo,
    @Inject(Mappers.collectionQuiz)
    private collectionQuizMapper: IMapper<CollectionQuiz, CollectionQuizDTO>,
  ) {}

  async addQuiz(args: AddQuizArgs): Promise<AddQuizResult> {
    const existingQuiz = await this.quizRepo.getQuizById(args.quizId)
    if (!existingQuiz)
      return Left.create({
        code: 'quiz_not_found',
        status: HttpStatus.NOT_FOUND,
        message: 'quiz not found',
      })

    const quizAvailable = args.userId === existingQuiz.creator || existingQuiz.isVisible
    if (!quizAvailable)
      return Left.create({
        code: 'quiz_not_available',
        status: HttpStatus.BAD_REQUEST,
        message: 'quiz not available',
      })

    const existingCollection = await this.collectionRepo.getCollectionById(args.collectionId)
    if (!existingCollection)
      return Left.create({
        code: 'collection_not_found',
        status: HttpStatus.NOT_FOUND,
        message: 'collection not found',
      })

    if (existingCollection.creator !== args.userId)
      return Left.create({
        code: 'not_collection_owner',
        status: HttpStatus.FORBIDDEN,
        message: 'not collection owner',
      })

    const collectionQuizExist = await this.collectionQuizRepo.exist(args.collectionId, args.quizId)
    if (collectionQuizExist)
      return Left.create({
        code: 'collection_quiz_exist',
        status: HttpStatus.CONFLICT,
        message: 'collection quiz already exist',
      })

    const createdCollectionQuiz = await this.collectionQuizRepo.saveCollectionQuiz(args)
    const mappedCollectionQuiz = this.collectionQuizMapper.toDTO(createdCollectionQuiz)
    return Right.create(mappedCollectionQuiz)
  }
}
