import { Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import Topic from './topics.domain'
import TopicDTO from './topics.dto'

@Injectable()
export default class TopicMapper implements IMapper<Topic, TopicDTO> {
  toDomain(raw: any): Topic {
    return new Topic(raw._id, raw.label)
  }

  toPersistence(domain: Topic) {
    return {
      _id: domain.topicId,
      label: domain.label,
    }
  }

  toDTO(domain: Topic): TopicDTO {
    return new TopicDTO(domain.topicId, domain.label)
  }
}
