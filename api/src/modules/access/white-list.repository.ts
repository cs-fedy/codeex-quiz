import { Inject, Injectable } from '@nestjs/common'
import { Repos, accessKey } from 'src/utils/constants'
import ICacheRepo from '../cache/i-cache.repository'
import IWhiteListRepo from './i-white-list.repository'

@Injectable()
export default class WhiteListRepo implements IWhiteListRepo {
  constructor(@Inject(Repos.cache) private whiteListCache: ICacheRepo<string>) {}

  async add(userId: string, token: string): Promise<void> {
    const key = this.getKey(userId)
    await this.whiteListCache.push(key, token)
  }

  async remove(userId: string, token: string): Promise<void> {
    const key = this.getKey(userId)
    await this.whiteListCache.remove(key, token)
  }

  async exists(userId: string, token: string): Promise<boolean> {
    const key = this.getKey(userId)
    const tokenIndex = await this.whiteListCache.search(key, token)
    return tokenIndex > -1
  }

  async clear(userId: string): Promise<void> {
    const key = this.getKey(userId)
    await this.whiteListCache.clear(key)
  }

  private getKey(userId: string): string {
    return `${accessKey}_${userId}`
  }
}
