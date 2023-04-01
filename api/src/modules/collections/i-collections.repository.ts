import Collection from './collections.domain'

export default interface ICollectionRepo {
  saveCollection(args: Collection): Promise<Collection>
  getCollectionById(quizId: string): Promise<Collection | null>
  listCollectionsByCreatorId(creator: string): Promise<Array<Collection>>
  listCollections(): Promise<Array<Collection>>
}
