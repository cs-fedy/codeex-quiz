import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import IMapper from 'src/common/mapper'
import { Mappers, Models } from 'src/utils/constants'
import ILeaderboardRepo from './i-leaderboard.repository'
import Leaderboard from './leaderboard.domain'
import LeaderboardDTO from './leaderboard.dto'
import { LeaderboardDocument } from './leaderboard.model'

@Injectable()
export default class LeaderboardRepo implements ILeaderboardRepo {
  constructor(
    @InjectModel(Models.leaderboard) private leaderboardModel: Model<LeaderboardDocument>,
    @Inject(Mappers.leaderboard) private leaderboardMapper: IMapper<Leaderboard, LeaderboardDTO>,
  ) {}

  async getRecentVersion(): Promise<number> {
    const versionsQuery = await this.leaderboardModel.find().distinct('version').select('version')
    const versions = versionsQuery.map(({ version }) => version) as Array<number>
    return Math.max(...versions, 0)
  }

  async addLeaderboard(args: Array<Leaderboard>): Promise<Array<Leaderboard>> {
    const newLeaderboardList = args.map(this.leaderboardMapper.toPersistence)
    const savedLeaderboardList = await this.leaderboardModel.create(newLeaderboardList)
    return savedLeaderboardList.map(this.leaderboardMapper.toDomain)
  }

  async listRecentLeaderboard(): Promise<Array<Leaderboard>> {
    const latestVersion = await this.getRecentVersion()
    const leaderboardList = await this.leaderboardModel.find({ version: latestVersion })
    const mappedList = leaderboardList.map(this.leaderboardMapper.toDomain)
    return mappedList
  }
}
