import { EnrolledSubQuizType } from '../enrolled_sub_quizzes/enrolled-sub-quizzes.domain'
import { SubQuizTypes } from '../sub_quizzes/sub-quizzes.domain'
import UniqueChoiceQuestion from '../unique_choice_questions/unique-choice-question.domain'

export default class EnrolledUniqueChoiceQuestionDTO {
  constructor(
    public enrolledSubQuizType: EnrolledSubQuizType.enrolledUniqueChoiceQuestion,
    public userId: string,
    public quizId: string,
    public subQuizType: SubQuizTypes,
    public subQuiz: Omit<UniqueChoiceQuestion, 'idealOption'>,
    public points: number,
    public isCompleted: boolean,
    public answerCorrectness: boolean,
    public completionTime: number,
    public createdAt: Date,
    public userAnswer: number,
  ) {}
}
