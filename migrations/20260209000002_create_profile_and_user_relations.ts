import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // Create profile table
  await knex.schema.createTable("profile", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.string("username", 255);
    table.string("bio", 255);
    table.string("state", 255);
    table.string("country", 255);
    table.boolean("isEmailVerified");
    table.string("profilePhoto", 255);
    table.uuid("userId").notNullable();
    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps(true, true);
    table.timestamp("deletedAt").nullable();
  });

  // Create privacy_policy table
  await knex.schema.createTable("privacy_policy", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.string("body", 255);
    table.boolean("isActive");
    table.uuid("authorId").notNullable();
    table
      .foreign("authorId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });

  // Create terms_and_conditions table
  await knex.schema.createTable("terms_and_conditions", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.string("body", 255);
    table.boolean("isActive");
    table.uuid("userId").notNullable();
    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });

  // Create follows table
  await knex.schema.createTable("follows", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.uuid("followerId").notNullable();
    table.uuid("followingId").notNullable();
    table
      .foreign("followerId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .foreign("followingId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });

  // Create follow_request table
  await knex.schema.createTable("follow_request", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.uuid("senderId").notNullable();
    table.uuid("receiverId").notNullable();
    table
      .foreign("senderId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .foreign("receiverId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("follow_request");
  await knex.schema.dropTableIfExists("follows");
  await knex.schema.dropTableIfExists("terms_and_conditions");
  await knex.schema.dropTableIfExists("privacy_policy");
  await knex.schema.dropTableIfExists("profile");
}
