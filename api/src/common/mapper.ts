export default interface IMapper<T, U> {
  toDomain(raw: any): T
  toPersistence(domain: T): any
  toDTO(domain: T): U
}
