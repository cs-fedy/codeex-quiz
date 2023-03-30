import {
  DynamicModule,
  Global,
  Inject,
  Module,
  OnApplicationShutdown,
  Provider,
} from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import knex, { Knex } from 'knex'
import { defer, lastValueFrom } from 'rxjs'
import { KnexModuleOptions } from './IKnexOptions'
import { KNEX_MODULE_OPTIONS } from './constants'
import { getConnectionToken, handleRetry } from './utils'

@Global()
@Module({})
export default class KnexCoreModule implements OnApplicationShutdown {
  constructor(
    @Inject(KNEX_MODULE_OPTIONS)
    private readonly options: KnexModuleOptions,
    private readonly moduleRef: ModuleRef,
  ) {}

  async onApplicationShutdown(): Promise<any> {
    const token = getConnectionToken(this.options)
    const connection = this.moduleRef.get<Knex>(token)
    connection && (await connection.destroy())
  }

  static forRoot(options: KnexModuleOptions): DynamicModule {
    const knexModuleOptions = {
      provide: KNEX_MODULE_OPTIONS,
      useValue: options,
    }

    const connectionProvider: Provider = {
      provide: getConnectionToken(options),
      useFactory: async () => await this.createConnectionFactory(options),
    }

    return {
      module: KnexCoreModule,
      providers: [connectionProvider, knexModuleOptions],
      exports: [connectionProvider],
    }
  }

  private static async createConnectionFactory(options: KnexModuleOptions): Promise<Knex> {
    return lastValueFrom(
      defer(async () => {
        return knex(options.config)
      }).pipe(handleRetry(options.retryAttempts, options.retryDelay)),
    )
  }
}
