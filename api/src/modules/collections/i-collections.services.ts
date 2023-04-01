import Either from 'src/utils/either'
import { CollectionNotAvailable, CollectionNotFound } from 'src/utils/types'
import CollectionDTO from './collections.dto'

export type CreateCollectionArgs = {
  title: string
  coverImageURL: string
  isVisible: boolean
  creator: string
}

export type CreateCollectionResult = Either<never, CollectionDTO>

export type GetCollectionArgs = {
  userId: string
  collectionId: string
}

export type GetCollectionResult = Either<CollectionNotFound | CollectionNotAvailable, CollectionDTO>

export type ListCreatorCollectionsArgs = {
  userId: string
  creator: string
}

export type ListCreatorCollectionsResult = Either<never, Array<CollectionDTO>>
export type ListPublicCollectionsResult = Either<never, Array<CollectionDTO>>

export default interface ICollectionService {
  createCollection(args: CreateCollectionArgs): Promise<CreateCollectionResult>
  getCollection(args: GetCollectionArgs): Promise<GetCollectionResult>
  listCreatorCollection(args: ListCreatorCollectionsArgs): Promise<ListCreatorCollectionsResult>
  listPublicCollections(userId: string): Promise<ListPublicCollectionsResult>
}
