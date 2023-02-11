export default class RefreshDTO {
  constructor(public token: string, public expiresIn: number) {}
}
