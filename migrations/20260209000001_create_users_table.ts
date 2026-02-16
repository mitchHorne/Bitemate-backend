import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // Create users table
  await knex.schema.createTable("users", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.string("name", 255).defaultTo("");
    table.string("email", 255).notNullable().unique();
    table.string("password", 255).notNullable();
    table.boolean("isSuperuser").defaultTo(false);
    table.boolean("isStaff").defaultTo(false);
    table.boolean("isActive").defaultTo(true);
    table.string("activationKey", 255).defaultTo("active");
    table.string("otp", 255).defaultTo("otp");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users");
}
