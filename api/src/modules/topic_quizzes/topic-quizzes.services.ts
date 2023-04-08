import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import { Mappers, Repos } from 'src/utils/constants'
import { Left, Right } from 'src/utils/either'
import IQuizRepo from '../quizzes/i-quizzes.repository'
import ITopicRepo from '../topics/i-topics.repository'
import ITopicQuizRepo from './i-topic-quizzes.repository'
import ITopicQuizService, {
  AddTopicQuizArgs,
  AddTopicQuizResult,
  ListTopicQuizzesResult,
} from './i-topic-quizzes.services'
import TopicQuiz from './topic-quizzes.domain'
import TopicQuizDTO from './topic-quizzes.dto'

@Injectable()
export default class TopicQuizService implements ITopicQuizService {
  constructor(
    @Inject(Repos.topicQuiz) private topicQuizRepo: ITopicQuizRepo,
    @Inject(Mappers.topicQuiz) private topicQuizMapper: IMapper<TopicQuiz, TopicQuizDTO>,
    @Inject(Repos.topic) private topicRepo: ITopicRepo,
    @Inject(Repos.quiz) private quizRepo: IQuizRepo,
  ) {}

  async addTopicQuiz(args: AddTopicQuizArgs): Promise<AddTopicQuizResult> {
    const existingQuiz = await this.quizRepo.getQuizById(args.quizId)
    if (!existingQuiz)
      return Left.create({
        code: 'quiz_not_found',
        status: HttpStatus.NOT_FOUND,
        message: 'quiz not found',
      })

    if (existingQuiz.creator !== args.userId)
      return Left.create({
        code: 'not_quiz_owner',
        status: HttpStatus.FORBIDDEN,
        message: 'not quiz owner',
      })

    const existingTopic = await this.topicRepo.getTopicById(args.topicId)
    if (!existingTopic)
      return Left.create({
        code: 'topic_not_found',
        status: HttpStatus.NOT_FOUND,
        message: 'topic not found',
      })

    const createdTopicQuiz = await this.topicQuizRepo.saveTopicQuiz(args)
    const mappedTopicQuiz = this.topicQuizMapper.toDTO(createdTopicQuiz)
    return Right.create(mappedTopicQuiz)
  }

  async listTopicQuizzes(topicId: string): Promise<ListTopicQuizzesResult> {
    const existingTopic = await this.topicRepo.getTopicById(topicId)
    if (!existingTopic)
      return Left.create({
        code: 'topic_not_found',
        status: HttpStatus.NOT_FOUND,
        message: 'topic not found',
      })

    const topicQuizzes = await this.topicQuizRepo.listTopicQuizzes(topicId)
    const mappedTopicQuizzes = topicQuizzes.map(this.topicQuizMapper.toDTO)
    return Right.create(mappedTopicQuizzes)
  }
}
