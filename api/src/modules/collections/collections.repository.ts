import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import IMapper from 'src/common/mapper'
import { Mappers, Models } from 'src/utils/constants'
import Collection from './collections.domain'
import CollectionDTO from './collections.dto'
import { CollectionDocument } from './collections.model'
import ICollectionRepo from './i-collections.repository'

@Injectable()
export default class CollectionRepo implements ICollectionRepo {
  constructor(
    @InjectModel(Models.collections)
    private collectionModel: Model<CollectionDocument>,
    @Inject(Mappers.collection)
    private collectionMapper: IMapper<Collection, CollectionDTO>,
  ) {}

  async saveCollection(args: Collection): Promise<Collection> {
    const newCollection = this.collectionMapper.toPersistence(args)
    const savedCollection = await this.collectionModel.findByIdAndUpdate(
      args.collectionId,
      newCollection,
      {
        upsert: true,
        new: true,
      },
    )

    return this.collectionMapper.toDomain(savedCollection)
  }

  async getCollectionById(collectionId: string): Promise<Collection | null> {
    const fetchedCollection = await this.collectionModel.findById(collectionId)
    return fetchedCollection ? this.collectionMapper.toDomain(fetchedCollection) : null
  }
}
