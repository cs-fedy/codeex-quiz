import MultipleChoiceQuestion from './multiple-choice-question.domain'

export default interface IMultipleChoiceQuestionRepo {
  saveMultipleChoiceQuestion(args: MultipleChoiceQuestion): Promise<MultipleChoiceQuestion>
}
