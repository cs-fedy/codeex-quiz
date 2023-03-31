import Quiz from '../quizzes/quizzes.domain'
import CollectionQuiz from './collection-quizzes.domain'

export default interface ICollectionQuizRepo {
  saveCollectionQuiz(args: CollectionQuiz): Promise<CollectionQuiz>
  exist(collectionId: string, quizId: string): Promise<boolean>
  listCollectionQuizzes(collectionId: string): Promise<Array<Quiz>>
}
