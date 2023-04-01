import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { JwtMiddleware } from 'src/middleware/jwt'
import { Services } from 'src/utils/constants'
import AccessModule from '../access/access.module'
import { FileController } from './file.controller'
import { FileService } from './file.services'

@Module({
  imports: [AccessModule],
  controllers: [FileController],
  providers: [
    {
      provide: Services.file,
      useClass: FileService,
    },
  ],
})
export class FileModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes(FileController)
  }
}
