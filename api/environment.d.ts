declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    PORT: number
    MONGODB_URL: string
    JWT_SECRET: string
    REDIS_PORT: number
    REDIS_HOST: string
    CLIENT_URL: string
    BASE_URL: string
    JWT_ACCESS_EXPIRATION_MINUTES: number
    JWT_REFRESH_EXPIRATION_DAYS: number
  }
}
