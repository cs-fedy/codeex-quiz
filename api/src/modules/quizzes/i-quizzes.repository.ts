import Quiz from './quizzes.domain'

export default interface IQuizRepo {
  saveQuiz(args: Quiz): Promise<Quiz>
  getQuizById(quizId: string): Promise<Quiz | null>
  listQuizzesByCreatorId(creator: string): Promise<Array<Quiz>>
}
