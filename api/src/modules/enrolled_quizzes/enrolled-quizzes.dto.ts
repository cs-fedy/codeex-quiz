export default class EnrolledQuizDTO {
  constructor(
    public userId: string,
    public quizId: string,
    public points: number,
    public completedSubQuizzesCount: number,
  ) {}
}
