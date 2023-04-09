export default class LeaderboardDTO {
  constructor(public userId: string, public points: number, public createdAt: Date) {}
}
