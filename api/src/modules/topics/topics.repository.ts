import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import IMapper from 'src/common/mapper'
import { Mappers, Models } from 'src/utils/constants'
import ITopicRepo from './i-topics.repository'
import Topic from './topics.domain'
import TopicDTO from './topics.dto'
import { TopicsDocument } from './topics.model'

@Injectable()
export default class TopicRepo implements ITopicRepo {
  constructor(
    @InjectModel(Models.topics) private topicModel: Model<TopicsDocument>,
    @Inject(Mappers.topic) private topicMapper: IMapper<Topic, TopicDTO>,
  ) {}

  async saveTopic(args: Topic): Promise<Topic> {
    const newTopic = this.topicMapper.toPersistence(args)
    const savedTopic = await this.topicModel.findOneAndUpdate(
      { $or: [{ _id: args.topicId }, { label: args.label }] },
      newTopic,
      { upsert: true, new: true },
    )

    const mappedTopic = this.topicMapper.toDomain(savedTopic)
    return mappedTopic
  }

  async getTopicById(topicId: string): Promise<Topic | null> {
    const topic = await this.topicModel.findById(topicId)
    return topic ? this.topicMapper.toDomain(topic) : null
  }

  async listTopics(): Promise<Array<Topic>> {
    const topics = await this.topicModel.find()
    return topics.map(this.topicMapper.toDomain)
  }
}
