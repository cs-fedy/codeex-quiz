import { SubQuizTypes } from '../sub_quizzes/sub-quizzes.domain'

export default class UniqueChoiceQuestionDTO {
  constructor(
    public subQuizId: string,
    public type: SubQuizTypes,
    public quizId: string,
    public title: string,
    public options: Array<string>,
    public idealOption: number,
    public points: number,
    public timeLimit: number,
    public dificulity: number,
    public coverImageURL?: string,
    public prevSubQuizId?: string,
    public nextSubQuizId?: string,
  ) {}
}
