import { Inject } from '@nestjs/common'
import { KNEX_POSTGRES_DB } from './constants'

export const InjectModel = (modelName: string) => Inject(modelName)
type InjectConnection = () => ParameterDecorator
export const InjectConnection: InjectConnection = () => Inject(KNEX_POSTGRES_DB)
