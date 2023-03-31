import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import IMapper from 'src/common/mapper'
import { Mappers, Models } from 'src/utils/constants'
import IRefreshRepo from './IRefresh.repository'
import Refresh from './refresh.domain'
import RefreshDTO from './refresh.dto'
import { RefreshDocument } from './refresh.model'

@Injectable()
export default class RefreshRepo implements IRefreshRepo {
  constructor(
    @InjectModel(Models.refreshes) private refreshModel: Model<RefreshDocument>,
    @Inject(Mappers.refresh)
    private refreshMapper: IMapper<Refresh, RefreshDTO>,
  ) {}

  async createRefreshToken(refresh: Refresh): Promise<Refresh> {
    const newRefresh = this.refreshMapper.toPersistence(refresh)
    const createdRefresh = await this.refreshModel.create(newRefresh)
    return this.refreshMapper.toDomain(createdRefresh)
  }

  async getToken(token: string): Promise<Refresh | null> {
    const existingRefresh = await this.refreshModel.findOne({ token })
    return existingRefresh ? this.refreshMapper.toDomain(existingRefresh) : null
  }

  async removeToken(token: string): Promise<void> {
    await this.refreshModel.findOneAndRemove({ token })
  }
}
