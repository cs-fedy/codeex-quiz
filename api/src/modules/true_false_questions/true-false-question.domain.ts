import { SubQuizTypes } from '../sub_quizzes/sub-quizzes.domain'

export default class TrueFalseQuestion {
  constructor(
    public subQuizId: string,
    public type: SubQuizTypes,
    public quizId: string,
    public title: string,
    public idealOption: boolean,
    public points: number,
    public timeLimit: number,
    public dificulity: number,
    public coverImageURL?: string,
    public prevSubQuizId?: string,
    public nextSubQuizId?: string,
  ) {}
}
