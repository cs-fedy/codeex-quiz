import TopicQuiz from './topic-quizzes.domain'

export default interface ITopicQuizRepo {
  saveTopicQuiz(args: TopicQuiz): Promise<TopicQuiz>
  exist(topicId: string, quizId: string): Promise<boolean>
  listTopicQuizzes(topicId: string): Promise<Array<TopicQuiz>>
}
