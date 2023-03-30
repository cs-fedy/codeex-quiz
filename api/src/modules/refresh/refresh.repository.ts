import { Inject, Injectable } from '@nestjs/common'
import { Knex } from 'knex'
import IMapper from 'src/common/mapper'
import { Mappers, Models } from 'src/utils/constants'
import { InjectConnection } from '../knex/decorators'
import IRefreshRepo from './IRefresh.repository'
import Refresh from './refresh.domain'
import RefreshDTO from './refresh.dto'

@Injectable()
export default class RefreshRepo implements IRefreshRepo {
  constructor(
    @InjectConnection() private knexConnection: Knex,
    @Inject(Mappers.refresh)
    private refreshMapper: IMapper<Refresh, RefreshDTO>,
  ) {}

  async createRefreshToken(refresh: Refresh): Promise<Refresh> {
    const table = this.knexConnection(Models.refreshes)
    const newRefresh = this.refreshMapper.toPersistence(refresh)
    const [createdRefresh] = await table.insert(newRefresh).returning('*')
    return this.refreshMapper.toDomain(createdRefresh)
  }

  async getToken(token: string): Promise<Refresh | null> {
    const table = this.knexConnection(Models.refreshes)
    const existingRefresh = await table.select('*').where('token', token).first()
    return existingRefresh ? this.refreshMapper.toDomain(existingRefresh) : null
  }

  async removeToken(token: string): Promise<void> {
    const table = this.knexConnection(Models.refreshes)
    await table.where('token', token).del()
  }
}
