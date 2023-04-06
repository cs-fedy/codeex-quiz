import { SubQuizTypes } from '../sub_quizzes/sub-quizzes.domain'
import SubQuizDTO from '../sub_quizzes/sub-quizzes.dto'

export default class MultipleChoiceQuestionDTO implements SubQuizDTO {
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
