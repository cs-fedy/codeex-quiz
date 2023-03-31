import { Inject, Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import { Mappers, Repos } from 'src/utils/constants'
import { Right } from 'src/utils/either'
import generateId from 'src/utils/generate-id'
import Collection from './collections.domain'
import CollectionDTO from './collections.dto'
import ICollectionRepo from './i-collections.repository'
import ICollectionService, {
  CreateCollectionArgs,
  CreateCollectionResult,
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
}
