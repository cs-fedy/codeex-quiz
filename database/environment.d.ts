declare namespace NodeJS {
  export interface ProcessEnv {
    POSTGRES_DB: string
    POSTGRES_USER: string
    POSTGRES_PASSWORD: string
    LOCAL_POSTGRES_HOST: string
    POSTGRES_PORT: number
  }
}
