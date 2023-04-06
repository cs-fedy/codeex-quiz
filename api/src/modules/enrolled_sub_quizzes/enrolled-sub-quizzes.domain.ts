import { SubQuizTypes } from '../sub_quizzes/sub-quizzes.domain'

export enum EnrolledSubQuizType {
  enrolledMultipleChoiceQuestion = 'enrolled_multiple_choice_question_service',
  enrolledUniqueChoiceQuestion = 'enrolled_unique_choice_question_service',
  enrolledTrueFalseQuestion = 'enrolled_true_false_question_service',
}

export default class EnrolledSubQuiz {
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
