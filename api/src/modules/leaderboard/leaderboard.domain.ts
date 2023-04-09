export default class Leaderboard {
  constructor(
    public version: number,
    public userId: string,
    public points: number,
    public createdAt: Date,
  ) {}
}
