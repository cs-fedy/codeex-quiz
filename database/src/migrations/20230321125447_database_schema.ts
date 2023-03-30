import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table) => {
    table.string("id").primary()
    table.string("full_name").notNullable()
    table.string("email").unique().notNullable()
    table.string("username").unique().notNullable()
    table.string("password").notNullable()
    table.string("avatar_url").notNullable()
    table.boolean("is_confirmed").defaultTo(false)
    table.specificType("roles", "text ARRAY").notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users")
}
