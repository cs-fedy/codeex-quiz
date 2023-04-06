import { SubQuizTypes } from '../sub_quizzes/sub-quizzes.domain'

export default class EnrolledSubQuizDTO {
  constructor(
    public enrolledSubQuizType: string,
    public userId: string,
    public quizId: string,
    public subQuizType: SubQuizTypes,
    public subQuizId: string,
    public points: number,
    public isCompleted: boolean,
    public answerCorrectness: boolean,
    public completionTime: number,
    public createdAt: Date,
  ) {}
}
