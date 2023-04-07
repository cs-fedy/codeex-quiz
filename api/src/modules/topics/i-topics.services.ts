import Either from 'src/utils/either'
import { TopicNotFound } from 'src/utils/types'
import TopicDTO from './topics.dto'

export type CreateTopicArgs = { label: string }
export type CreateTopicResult = Either<never, TopicDTO>
export type GetTopicResult = Either<TopicNotFound, TopicDTO>
export type ListTopicsResult = Either<never, Array<TopicDTO>>

export default interface ITopicService {
  createTopic(args: CreateTopicArgs): Promise<CreateTopicResult>
  getTopic(topicId: string): Promise<GetTopicResult>
  listTopics(): Promise<ListTopicsResult>
}
