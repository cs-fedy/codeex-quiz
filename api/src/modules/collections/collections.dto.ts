export default class CollectionDTO {
  constructor(
    public collectionId: string,
    public title: string,
    public coverImageURL: string,
    public isVisible: boolean,
    public creator: string,
  ) {}
}
