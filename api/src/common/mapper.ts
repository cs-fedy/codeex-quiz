export default interface IMapper<T> {
  toDomain(raw: any): T
  toPersistence(domain: T): any
  toDTO(domain: T): unknown
}
