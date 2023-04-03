export default class EnrolledQuiz {
  constructor(
    public userId: string,
    public quizId: string,
    public points: number,
    public completedSubQuizzesCount: number,
  ) {}
}
