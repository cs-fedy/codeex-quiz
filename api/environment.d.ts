declare namespace NodeJS {
  export interface ProcessEnv {
    AWS_ACCESS_KEY_ID: string
    AWS_REGION: string
    AWS_SECRET_ACCESS_KEY: string
    BUCKET_NAME: string
    BASE_URL: string
    CLIENT_URL: string
    ENV: 'development' | 'production' | 'test'
    PORT: number
    FROM_EMAIL: string
    JWT_SECRET: string
    JWT_ACCESS_EXPIRATION_MINUTES: number
    JWT_REFRESH_EXPIRATION_DAYS: number
    POSTGRES_HOST: string
    POSTGRES_PASSWORD: string
    POSTGRES_PORT: number
    POSTGRES_USER: string
    POSTGRES_DB: string
    REDIS_PORT: number
    REDIS_HOST: string
    SENDGRID_KEY: string
    VERIFY_EMAIL_EXPIRATION_MINUTES: number
    REQUEST_RESET_PASSWORD_EXPIRATION_MINUTES: number
  }
}
