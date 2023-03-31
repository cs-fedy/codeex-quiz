import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import { Mappers, Repos } from 'src/utils/constants'
import { Left, Right } from 'src/utils/either'
import generateId from 'src/utils/generate-id'
import Collection from './collections.domain'
import CollectionDTO from './collections.dto'
import ICollectionRepo from './i-collections.repository'
import ICollectionService, {
  CreateCollectionArgs,
  CreateCollectionResult,
  GetCollectionArgs,
  GetCollectionResult,
  ListCreatorCollectionsArgs,
  ListCreatorCollectionsResult,
  ListPublicCollectionsResult,
} from './i-collections.services'

@Injectable()
export default class CollectionService implements ICollectionService {
  constructor(
    @Inject(Repos.collection) private collectionRepo: ICollectionRepo,
    @Inject(Mappers.collection)
    private collectionMapper: IMapper<Collection, CollectionDTO>,
  ) {}

  async createCollection(args: CreateCollectionArgs): Promise<CreateCollectionResult> {
    const newCollection = { ...args, collectionId: generateId() }
    const createdCollection = await this.collectionRepo.saveCollection(newCollection)
    const mappedCollection = this.collectionMapper.toDTO(createdCollection)
    return Right.create(mappedCollection)
  }

  async getCollection(args: GetCollectionArgs): Promise<GetCollectionResult> {
    const existingCollection = await this.collectionRepo.getCollectionById(args.collectionId)
    if (!existingCollection)
      return Left.create({
        code: 'collection_not_found',
        status: HttpStatus.NOT_FOUND,
        message: 'collection not found',
      })

    const canAccessQuiz =
      args.collectionId === existingCollection.creator || existingCollection.isVisible

    if (!canAccessQuiz)
      return Left.create({
        code: 'collection_not_available',
        status: HttpStatus.BAD_REQUEST,
        message: 'collection not available',
      })

    const mappedCollection = this.collectionMapper.toDTO(existingCollection)
    return Right.create(mappedCollection)
  }

  async listCreatorCollection(
    args: ListCreatorCollectionsArgs,
  ): Promise<ListCreatorCollectionsResult> {
    const collections = await this.collectionRepo.listCollectionsByCreatorId(args.creator)
    const filteredMappedCollections = collections
      .filter((collection) => collection.creator === args.userId || collection.isVisible)
      .map(this.collectionMapper.toDTO)

    return Right.create(filteredMappedCollections)
  }

  async listPublicCollections(userId: string): Promise<ListPublicCollectionsResult> {
    const collections = await this.collectionRepo.listCollections()
    const filteredMappedCollections = collections
      .filter((collection) => collection.creator === userId || collection.isVisible)
      .map(this.collectionMapper.toDTO)

    return Right.create(filteredMappedCollections)
  }
}
