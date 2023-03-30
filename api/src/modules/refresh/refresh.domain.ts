export default class Refresh {
  constructor(
    public refreshId: string,
    public token: string,
    public owner: string,
    public expiresIn: Date,
  ) {}
}
