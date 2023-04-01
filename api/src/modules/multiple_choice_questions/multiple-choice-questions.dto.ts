import SubQuiz, { SubQuizTypes } from '../sub_quizzes/sub-quizzes.domain'

export default class MultipleChoiceQuestionDTO implements SubQuiz {
  constructor(
    public subQuizId: string,
    public type: SubQuizTypes,
    public quizId: string,
    public title: string,
    public options: Array<string>,
    public idealOptions: Array<number>,
    public coverImageURL?: string,
  ) {}
}
