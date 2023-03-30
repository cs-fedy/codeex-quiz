import { DynamicModule, Module } from '@nestjs/common'
import { KnexModuleOptions } from './IKnexOptions'
import KnexCoreModule from './core.module'

@Module({})
export default class KnexModule {
  public static forRoot(options: KnexModuleOptions): DynamicModule {
    return {
      module: KnexModule,
      imports: [KnexCoreModule.forRoot(options)],
    }
  }
}
