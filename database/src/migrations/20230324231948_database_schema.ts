import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("refreshes", (table) => {
    table.string("id").primary()
    table.string("owner").notNullable()
    table.string("token").notNullable()
    table.dateTime("expires_in").defaultTo(knex.fn.now())
    table.foreign("owner").references("users.id")
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("refreshes")
}
