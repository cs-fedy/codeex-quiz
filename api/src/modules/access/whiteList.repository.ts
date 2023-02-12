import { Inject, Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'
import { accessKey } from 'src/utils/constants'
import { IORedisKey } from '../redis/redis.module'
import IWhiteListRepo from './IWhiteList.repository'

@Injectable()
export default class WhiteListRepo implements IWhiteListRepo {
  constructor(@Inject(IORedisKey) private readonly redisClient: Redis) {}

  async add(userId: string, token: string): Promise<void> {
    const key = this.getKey(userId)
    await this.redisClient.lpush(key, token)
  }

  async remove(userId: string, token: string): Promise<void> {
    const key = this.getKey(userId)
    await this.redisClient.lrem(key, 1, token)
  }

  async exists(userId: string, token: string): Promise<boolean> {
    const key = this.getKey(userId)
    const existingTokenPosition = await this.redisClient.lpos(key, token)
    return existingTokenPosition !== null
  }

  private getKey(userId: string): string {
    return `${accessKey}_${userId}`
  }
}
