import SubQuiz, { SubQuizTypes } from '../sub_quizzes/sub-quizzes.domain'

export default class MultipleChoiceQuestion implements SubQuiz {
  constructor(
    public subQuizId: string,
    public type: SubQuizTypes,
    public quizId: string,
    public title: string,
    public options: Array<string>,
    public idealOptions: Array<number>,
    public points: number,
    public timeLimit: number,
    public dificulity: number,
    public coverImageURL?: string,
  ) {}
}
