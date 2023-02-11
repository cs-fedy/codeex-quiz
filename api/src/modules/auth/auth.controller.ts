import { Controller, Get } from '@nestjs/common'

@Controller('auth')
export default class AuthController {
  @Get('hello')
  sayHello() {
    return 'hello world'
  }
}
