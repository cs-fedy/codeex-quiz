declare namespace NodeJS {
  export interface ProcessEnv {
    ENV: 'development' | 'production' | 'test'
    PORT: number
    MONGODB_URL: string
    REDIS_PORT: number
    REDIS_HOST: string
    CLIENT_URL: string
    SENDGRID_KEY: string
    FROM_EMAIL: string
  }
}
