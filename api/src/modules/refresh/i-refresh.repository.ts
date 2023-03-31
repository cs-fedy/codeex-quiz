import Refresh from './refresh.domain'

export default interface IRefreshRepo {
  createRefreshToken(refresh: Refresh): Promise<Refresh>
  getToken(token: string): Promise<Refresh | null>
  removeToken(token: string): Promise<void>
}
