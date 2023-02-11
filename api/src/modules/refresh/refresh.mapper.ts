import { Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import Refresh from './refresh.domain'
import RefreshDTO from './refresh.dto'

@Injectable()
export default class RefreshMapper implements IMapper<Refresh, RefreshDTO> {
  toDomain(raw: any): Refresh {
    return new Refresh(raw.token, raw.owner, raw.expiresIn)
  }

  toPersistence(domain: Refresh): any {
    return {
      token: domain.token,
      owner: domain.owner,
      expiresIn: domain.expiresIn,
    }
  }

  toDTO(domain: Refresh): RefreshDTO {
    return new RefreshDTO(domain.token, domain.expiresIn.getTime())
  }
}
