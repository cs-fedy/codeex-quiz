export enum Models {
  user = 'user',
  refresh = 'refresh',
}

export enum Mappers {
  user = 'userMapper',
  refresh = 'refreshMapper',
}

export enum Repositories {
  user = 'userRepository',
  refresh = 'refreshRepository',
  whiteList = 'whiteListRepository',
}

export enum Services {
  user = 'userService',
  access = 'accessService',
  hash = 'hashService',
  refresh = 'refreshService',
  auth = 'authService',
}

export enum Roles {
  user = 'user',
  admin = 'admin',
}

export enum Routes {
  auth = 'auth',
  register = 'register',
  login = 'login',
  refresh = 'refresh',
  logout = 'logout',
}

export const defaultAvatar = 'https://opus-platform-s3.s3.eu-central-1.amazonaws.com/DSC_0221.jpg'
export const accessKey = 'access'
export const refreshKey = 'refresh'
