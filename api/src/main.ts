import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './modules/app.module'
import validationPipeOptions from './pipes/validationPipeOptions'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.setGlobalPrefix('/api')
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions))

  await app.listen(process.env.PORT)
}

bootstrap()
