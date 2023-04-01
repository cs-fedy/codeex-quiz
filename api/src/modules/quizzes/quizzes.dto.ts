export default class QuizDTO {
  constructor(
    public quizId: string,
    public title: string,
    public description: string,
    public coverImageURL: string,
    public isVisible: boolean,
    public isApproved: boolean,
    public creator: string,
  ) {}
}
