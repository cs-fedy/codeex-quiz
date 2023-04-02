export enum SubQuizTypes {
  multipleChoiceQuestion = 'multiple_choice_questions',
  uniqueChoiceQuestion = 'unique_choice_questions',
  trueFalseQuestion = 'true_false_questions',
}

export default class SubQuiz {
  constructor(
    public subQuizId: string,
    public type: SubQuizTypes,
    public quizId: string,
    public title: string,
    public points: number,
    public timeLimit: number,
    public coverImageURL?: string,
  ) {}
}
