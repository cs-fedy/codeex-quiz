import { Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import Leaderboard from './leaderboard.domain'
import LeaderboardDTO from './leaderboard.dto'

@Injectable()
export default class LeaderboardMapper implements IMapper<Leaderboard, LeaderboardDTO> {
  toDomain(raw: any): Leaderboard {
    return new Leaderboard(raw.version, raw.userId, raw.points, raw.createdAt)
  }

  toPersistence(domain: Leaderboard) {
    return {
      version: domain.version,
      userId: domain.userId,
      points: domain.points,
      createdAt: domain.createdAt,
    }
  }

  toDTO(domain: Leaderboard): LeaderboardDTO {
    return new LeaderboardDTO(domain.userId, domain.points, domain.createdAt)
  }
}
