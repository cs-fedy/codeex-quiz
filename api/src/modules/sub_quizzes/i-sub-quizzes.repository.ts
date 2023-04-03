import SubQuiz from './sub-quizzes.domain'

export default interface ISubQuizRepo {
  listQuizSubQuizzes(quizId: string): Promise<Array<SubQuiz>>
  updateSubQuizById(subQuizId: string, args: SubQuiz): Promise<SubQuiz | null>
}
