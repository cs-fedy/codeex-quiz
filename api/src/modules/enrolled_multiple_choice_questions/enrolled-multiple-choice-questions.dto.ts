import { EnrolledSubQuizType } from '../enrolled_sub_quizzes/enrolled-sub-quizzes.domain'
import MultipleChoiceQuestion from '../multiple_choice_questions/multiple-choice-question.domain'
import { SubQuizTypes } from '../sub_quizzes/sub-quizzes.domain'

export default class EnrolledMultipleChoiceQuestionDTO {
  constructor(
    public enrolledSubQuizType: EnrolledSubQuizType.enrolledMultipleChoiceQuestion,
    public userId: string,
    public quizId: string,
    public subQuizType: SubQuizTypes,
    public subQuiz: Omit<MultipleChoiceQuestion, 'idealOptions'>,
    public points: number,
    public isCompleted: boolean,
    public answerCorrectness: boolean,
    public completionTime: number,
    public createdAt: Date,
    public userAnswer: Array<number>,
  ) {}
}
