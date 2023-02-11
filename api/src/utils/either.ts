type Either<E, T> = Left<E> | Right<T>

export class Left<T> {
  readonly error: T

  private constructor(error: T) {
    this.error = error
  }

  isLeft(): this is Left<T> {
    return true
  }

  isRight(): this is Right<never> {
    return false
  }

  static create<U>(value: U): Left<U> {
    return new Left(value)
  }
}

export class Right<T> {
  readonly value: T

  private constructor(value: T) {
    this.value = value
  }

  isLeft(): this is Left<never> {
    return false
  }

  isRight(): this is Right<T> {
    return true
  }

  static create<U>(value: U): Right<U> {
    return new Right(value)
  }
}

export default Either
