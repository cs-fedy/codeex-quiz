import { Inject, Injectable } from '@nestjs/common'
import * as crypto from 'crypto'
import * as moment from 'moment'
import IMapper from 'src/common/mapper'
import { Mappers, Repos } from 'src/utils/constants'
import generateId from 'src/utils/generateId'
import IRefreshRepo from './IRefresh.repository'
import IRefreshService from './IRefresh.services'
import Refresh from './refresh.domain'
import RefreshDTO from './refresh.dto'

@Injectable()
export default class RefreshService implements IRefreshService {
  constructor(
    @Inject(Repos.refresh) private refreshRepo: IRefreshRepo,
    @Inject(Mappers.refresh)
    private refreshMapper: IMapper<Refresh, RefreshDTO>,
  ) {}

  async createRefreshToken(userId: string): Promise<RefreshDTO> {
    const refreshToken = crypto.randomUUID()
    const expiresIn = moment().add(process.env.JWT_REFRESH_EXPIRATION_DAYS, 'days').toDate()

    const createdRefresh = await this.refreshRepo.createRefreshToken({
      refreshId: generateId(),
      token: refreshToken,
      expiresIn,
      owner: userId,
    })

    return this.refreshMapper.toDTO(createdRefresh)
  }
}
