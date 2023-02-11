import Refresh from './refresh.domain'

export default interface IRefreshRepo {
  createRefreshToken(refresh: Refresh): Promise<Refresh>
}
