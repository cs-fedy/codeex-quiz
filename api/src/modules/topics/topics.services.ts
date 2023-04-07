import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import { Mappers, Repos } from 'src/utils/constants'
import { Left, Right } from 'src/utils/either'
import generateId from 'src/utils/generate-id'
import ITopicRepo from './i-topics.repository'
import ITopicService, {
  CreateTopicArgs,
  CreateTopicResult,
  GetTopicResult,
  ListTopicsResult,
} from './i-topics.services'
import Topic from './topics.domain'
import TopicDTO from './topics.dto'

@Injectable()
export default class TopicService implements ITopicService {
  constructor(
    @Inject(Mappers.topic) private topicMapper: IMapper<Topic, TopicDTO>,
    @Inject(Repos.topic) private topicRepo: ITopicRepo,
  ) {}

  async createTopic(args: CreateTopicArgs): Promise<CreateTopicResult> {
    const createdTopic = await this.topicRepo.saveTopic({
      ...args,
      topicId: generateId(),
    })

    const mappedTopic = this.topicMapper.toDTO(createdTopic)
    return Right.create(mappedTopic)
  }

  async getTopic(topicId: string): Promise<GetTopicResult> {
    const existingTopic = await this.topicRepo.getTopicById(topicId)
    if (!existingTopic)
      return Left.create({
        code: 'topic_not_found',
        status: HttpStatus.NOT_FOUND,
        message: 'topic not found',
      })

    const mappedTopic = this.topicMapper.toDTO(existingTopic)
    return Right.create(mappedTopic)
  }

  async listTopics(): Promise<ListTopicsResult> {
    const topics = await this.topicRepo.listTopics()
    const mappedTopics = topics.map(this.topicMapper.toDTO)
    return Right.create(mappedTopics)
  }
}
