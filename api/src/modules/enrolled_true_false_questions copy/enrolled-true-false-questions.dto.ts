import { EnrolledSubQuizType } from '../enrolled_sub_quizzes/enrolled-sub-quizzes.domain'
import { SubQuizTypes } from '../sub_quizzes/sub-quizzes.domain'
import TrueFalseQuestion from '../true_false_questions/true-false-question.domain'

export default class EnrolledTrueFalseQuestionDTO {
  constructor(
    public enrolledSubQuizType: EnrolledSubQuizType.enrolledTrueFalseQuestion,
    public userId: string,
    public quizId: string,
    public subQuizType: SubQuizTypes,
    public subQuiz: Omit<TrueFalseQuestion, 'idealOption'>,
    public points: number,
    public isCompleted: boolean,
    public answerCorrectness: boolean,
    public completionTime: number,
    public createdAt: Date,
    public userAnswer: boolean,
  ) {}
}
