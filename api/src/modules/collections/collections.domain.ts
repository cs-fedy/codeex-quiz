export default class Collection {
  constructor(
    public collectionId: string,
    public title: string,
    public coverImageURL: string,
    public isVisible: boolean,
    public creator: string,
  ) {}
}
