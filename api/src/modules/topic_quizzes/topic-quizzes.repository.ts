import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import IMapper from 'src/common/mapper'
import { Mappers, Models } from 'src/utils/constants'
import ITopicQuizRepo from './i-topic-quizzes.repository'
import TopicQuiz from './topic-quizzes.domain'
import TopicQuizDTO from './topic-quizzes.dto'
import { TopicQuizDocument } from './topic-quizzes.model'

@Injectable()
export default class TopicQuizRepo implements ITopicQuizRepo {
  constructor(
    @InjectModel(Models.topicQuizzes) private topicQuizModel: Model<TopicQuizDocument>,
    @Inject(Mappers.topicQuiz) private topicQuizMapper: IMapper<TopicQuiz, TopicQuizDTO>,
  ) {}

  async saveTopicQuiz(args: TopicQuiz): Promise<TopicQuiz> {
    const newTopicQuiz = this.topicQuizMapper.toPersistence(args)
    const savedTopicQuiz = await this.topicQuizModel.findOneAndUpdate(
      { topicId: args.topicId, quizId: args.quizId },
      newTopicQuiz,
      { upsert: true, new: true },
    )

    const mappedTopicQuiz = this.topicQuizMapper.toDomain(savedTopicQuiz)
    return mappedTopicQuiz
  }

  async exist(topicId: string, quizId: string): Promise<boolean> {
    const existingTopicQuiz = await this.topicQuizModel.findOne({
      topicId: topicId,
      quizId: quizId,
    })

    return !!existingTopicQuiz
  }

  async listTopicQuizzes(topicId: string): Promise<Array<TopicQuiz>> {
    const topicQuizzes = await this.topicQuizModel.find({ topicId })
    return topicQuizzes.map(this.topicQuizMapper.toDomain)
  }
}
