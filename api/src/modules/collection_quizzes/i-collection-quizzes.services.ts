import Either from 'src/utils/either'
import {
  CollectionNotFound,
  CollectionQuizExist,
  NotCollectionOwner,
  QuizNotAvailable,
  QuizNotFound,
} from 'src/utils/types'
import CollectionQuizDTO from './collection-quizzes.dto'

export type AddQuizArgs = {
  userId: string
  quizId: string
  collectionId: string
}

export type AddQuizResult = Either<
  QuizNotFound | QuizNotAvailable | CollectionNotFound | NotCollectionOwner | CollectionQuizExist,
  CollectionQuizDTO
>

export default interface ICollectionQuizService {
  addQuiz(args: AddQuizArgs): Promise<AddQuizResult>
}
