import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ScheduleModule } from '@nestjs/schedule'
import AccountsModule from './account/accounts.module'
import AdminModule from './admin/admin.module'
import AuthModule from './auth/auth.module'
import BookmarksModule from './bookmarks/bookmarks.module'
import CollectionQuizzesModule from './collection_quizzes/collection-quizzes.module'
import CollectionsModule from './collections/collections.module'
import EnrolledMultipleChoiceQuestionsModule from './enrolled_multiple_choice_questions/enrolled-multiple-choice-questions.module'
import EnrolledQuizzesModule from './enrolled_quizzes/enrolled-quizzes.module'
import EnrolledSubQuizzesModule from './enrolled_sub_quizzes/enrolled-sub-quizzes.module'
import EnrolledTrueFalseQuestionsModule from './enrolled_true_false_questions/enrolled-true-false-questions.module'
import EnrolledUniqueChoiceQuestionsModule from './enrolled_unique_choice_questions/enrolled-unique-choice-questions.module'
import LeaderboardModule from './leaderboard/leaderboard.module'
import MultipleChoiceQuestionsModule from './multiple_choice_questions/multiple-choice-questions.module'
import NotificationsModule from './notifications/notifications.module'
import ProfilesModule from './profiles/profiles.module'
import QuizzesApprovalModule from './quiz_approval/quiz-approval.module'
import QuizzesModule from './quizzes/quizzes.module'
import ResetPasswordModule from './reset_password/reset-password.module'
import SubQuizzesModule from './sub_quizzes/sub-quizzes.module'
import TopicQuizzesModule from './topic_quizzes/topic-quizzes.module'
import TopicsModule from './topics/topics.module'
import TrueFalseQuestionsModule from './true_false_questions/true-false-questions.module'
import UniqueChoiceQuestionsModule from './unique_choice_questions/unique-choice-questions.module'
import UsersModule from './users/users.module'

const config = ConfigModule.forRoot()

const connection = process.env.MONGODB_URL
const mongoConnection = MongooseModule.forRoot(connection)

const bullConnection = BullModule.forRoot({
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
})

const schedule = ScheduleModule.forRoot()

@Module({
  imports: [
    config,
    schedule,
    bullConnection,
    mongoConnection,
    AuthModule,
    UsersModule,
    ProfilesModule,
    AccountsModule,
    ResetPasswordModule,
    QuizzesModule,
    AdminModule,
    CollectionsModule,
    CollectionQuizzesModule,
    NotificationsModule,
    QuizzesApprovalModule,
    SubQuizzesModule,
    MultipleChoiceQuestionsModule,
    UniqueChoiceQuestionsModule,
    TrueFalseQuestionsModule,
    BookmarksModule,
    EnrolledQuizzesModule,
    EnrolledSubQuizzesModule,
    EnrolledMultipleChoiceQuestionsModule,
    EnrolledUniqueChoiceQuestionsModule,
    EnrolledTrueFalseQuestionsModule,
    TopicsModule,
    TopicQuizzesModule,
    LeaderboardModule,
  ],
})
export default class AppModule {}
