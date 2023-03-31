import Collection from './collections.domain'

export default interface ICollectionRepo {
  saveCollection(args: Collection): Promise<Collection>
  getCollectionById(quizId: string): Promise<Collection | null>
}
