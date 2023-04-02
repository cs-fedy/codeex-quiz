import SubQuiz, { SubQuizTypes } from '../sub_quizzes/sub-quizzes.domain'

export default class UniqueChoiceQuestionDTO implements SubQuiz {
  constructor(
    public subQuizId: string,
    public type: SubQuizTypes,
    public quizId: string,
    public title: string,
    public options: Array<string>,
    public idealOption: number,
    public points: number,
    public timeLimit: number,
    public coverImageURL?: string,
  ) {}
}
