import RefreshDTO from './refresh.dto'

export default interface IRefreshService {
  createRefreshToken(userId: string): Promise<RefreshDTO>
}
