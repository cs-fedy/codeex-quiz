import TrueFalseQuestion from './true-false-question.domain'

export default interface ITrueFalseQuestionRepo {
  saveTrueFalseQuestion(args: TrueFalseQuestion): Promise<TrueFalseQuestion>
  getTrueFalseQuestion(subQuizId: string): Promise<TrueFalseQuestion | null>
}
