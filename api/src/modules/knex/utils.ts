import { Logger } from '@nestjs/common'
import { Observable, delay, retryWhen, scan } from 'rxjs'
import { KnexModuleOptions } from './IKnexOptions'

const logger = new Logger('KnexModule')

export function handleRetry(
  retryAttempts = 9,
  retryDelay = 3000,
): <T>(source: Observable<T>) => Observable<T> {
  return <T>(source: Observable<T>) =>
    source.pipe(
      retryWhen((e) =>
        e.pipe(
          scan((errorCount, error: Error) => {
            logger.error(
              `Unable to connect to the database. Retrying (${errorCount + 1})...`,
              error.stack,
            )
            if (errorCount + 1 >= retryAttempts) {
              throw error
            }
            return errorCount + 1
          }, 0),
          delay(retryDelay),
        ),
      ),
    )
}

export const getConnectionToken = (connection: KnexModuleOptions) => connection.name
