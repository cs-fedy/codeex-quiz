declare namespace NodeJS {
  export interface ProcessEnv {
    ENV: 'development' | 'production' | 'test'
    PORT: number
    MONGO_INITDB_ROOT_URL: string
    REDIS_PORT: number
    REDIS_HOST: string
    CLIENT_URL: string
  }
}
