import { Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import Collection from './collections.domain'
import CollectionDTO from './collections.dto'

@Injectable()
export default class CollectionMapper implements IMapper<Collection, CollectionDTO> {
  toDomain(raw: any): Collection {
    return new Collection(raw._id, raw.title, raw.coverImageURL, raw.isVisible, raw.creator)
  }

  toPersistence(domain: Collection): any {
    return {
      _id: domain.collectionId,
      title: domain.title,
      coverImageURL: domain.coverImageURL,
      isVisible: domain.isVisible,
      creator: domain.creator,
    }
  }

  toDTO(domain: Collection): CollectionDTO {
    return new CollectionDTO(
      domain.collectionId,
      domain.title,
      domain.coverImageURL,
      domain.isVisible,
      domain.creator,
    )
  }
}
