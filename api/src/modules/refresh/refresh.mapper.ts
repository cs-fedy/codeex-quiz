import { Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import Refresh from './refresh.domain'
import RefreshDTO from './refresh.dto'

@Injectable()
export default class RefreshMapper implements IMapper<Refresh, RefreshDTO> {
  toDomain(raw: any): Refresh {
    return new Refresh(raw.id, raw.token, raw.owner, raw.expires_in)
  }

  toPersistence(domain: Refresh): any {
    return {
      id: domain.refreshId,
      token: domain.token,
      owner: domain.owner,
      expires_in: domain.expiresIn,
    }
  }

  toDTO(domain: Refresh): RefreshDTO {
    return new RefreshDTO(domain.token, domain.expiresIn.getTime())
  }
}
