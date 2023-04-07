import Topic from './topics.domain'

export default interface ITopicRepo {
  saveTopic(args: Topic): Promise<Topic>
  getTopicById(topicId: string): Promise<Topic | null>
  listTopics(): Promise<Array<Topic>>
}
