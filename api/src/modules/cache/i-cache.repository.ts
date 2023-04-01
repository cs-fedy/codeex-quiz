export default interface ICacheRepo<T> {
  push(key: string, value: any): Promise<void>
  remove(key: string, element: any): Promise<void>
  list(key: string): Promise<Array<T>>
  search(key: string, element: T): Promise<number>
  clear(key: string): Promise<void>
}
