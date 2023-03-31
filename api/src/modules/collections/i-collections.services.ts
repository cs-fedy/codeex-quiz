import Either from 'src/utils/either'
import CollectionDTO from './collections.dto'

export type CreateCollectionArgs = {
  title: string
  coverImageURL: string
  isVisible: boolean
  creator: string
}

export type CreateCollectionResult = Either<never, CollectionDTO>

export default interface ICollectionService {
  createCollection(args: CreateCollectionArgs): Promise<CreateCollectionResult>
}
