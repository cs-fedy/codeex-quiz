import { SubQuizTypes } from './sub-quizzes.domain'

export default class SubQuizDTO {
  constructor(
    public subQuizId: string,
    public type: SubQuizTypes,
    public quizId: string,
    public title: string,
    public points: number,
    public timeLimit: number,
    public dificulity: number,
    public coverImageURL?: string,
  ) {}
}
