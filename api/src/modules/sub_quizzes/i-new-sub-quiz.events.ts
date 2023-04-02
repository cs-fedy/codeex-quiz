export type NewSubQuizArgs = { subQuizId: string; quizId: string }
export default interface INewSubQuizEvents {
  newSubQuiz(args: NewSubQuizArgs): Promise<void>
}
