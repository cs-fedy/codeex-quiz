import dotenv from "dotenv"
import type { Knex } from "knex"
import { join } from "path"

const environmentFilePath = join(__dirname, "../../", ".env")
dotenv.config({ path: environmentFilePath })

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.LOCAL_POSTGRES_HOST,
      port: Number.parseInt(`${process.env.POSTGRES_PORT}`),
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "migrations",
    },
    seeds: {
      directory: "seeds",
    },
  },
}

export default config
