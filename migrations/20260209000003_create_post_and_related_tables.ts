import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // Create post table
  await knex.schema.createTable("post", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.string("foodName", 255);
    table.string("foodNameNative", 255);
    table.string("description", 255);
    table.string("difficulty", 255);
    table.string("recipeSource", 255);
    table.string("suitedOccasion", 255);
    table.boolean("isTraditional");
    table.boolean("isActive");
    table.string("country", 255);
    table.integer("downVote");
    table.integer("upVote");
    table.integer("timeToCook");
    table.boolean("isFlagged");
    table.string("note", 255);
    table.boolean("isRecipe");
    table.text("ingredients", "medium");
    table.text("instructions", "medium");
    table.string("servingSize", 255);
    table.string("imageUrl", 255);
    table.string("videoUrl", 255);
    table.uuid("authorId");
    table
      .foreign("authorId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });

  // Create post_comment table
  await knex.schema.createTable("post_comment", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.string("comment", 255);
    table.uuid("postId").notNullable();
    table.uuid("userId").notNullable();
    table
      .foreign("postId")
      .references("id")
      .inTable("post")
      .onDelete("CASCADE");
    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });

  // Create upvote_post table
  await knex.schema.createTable("upvote_post", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.uuid("postId").notNullable();
    table.uuid("userId").notNullable();
    table
      .foreign("postId")
      .references("id")
      .inTable("post")
      .onDelete("CASCADE");
    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });

  // Create downvote_post table
  await knex.schema.createTable("downvote_post", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.uuid("postId").notNullable();
    table.uuid("userId").notNullable();
    table
      .foreign("postId")
      .references("id")
      .inTable("post")
      .onDelete("CASCADE");
    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });

  // Create comment_upvote table
  await knex.schema.createTable("comment_upvote", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.uuid("postCommentId").notNullable();
    table.uuid("userId").notNullable();
    table
      .foreign("postCommentId")
      .references("id")
      .inTable("post_comment")
      .onDelete("CASCADE");
    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });

  // Create comment_downvote table
  await knex.schema.createTable("comment_downvote", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.uuid("postCommentId").notNullable();
    table.uuid("userId").notNullable();
    table
      .foreign("postCommentId")
      .references("id")
      .inTable("post_comment")
      .onDelete("CASCADE");
    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });

  // Create saved_post table
  await knex.schema.createTable("saved_post", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.string("text", 255);
    table.string("categoryName", 255);
    table.uuid("postId").notNullable();
    table.uuid("userId").notNullable();
    table
      .foreign("postId")
      .references("id")
      .inTable("post")
      .onDelete("CASCADE");
    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });

  // Create tagged_post table
  await knex.schema.createTable("tagged_post", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.string("text", 255);
    table.uuid("postId").notNullable();
    table.uuid("userId").notNullable();
    table
      .foreign("postId")
      .references("id")
      .inTable("post")
      .onDelete("CASCADE");
    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });

  // Create flag_post table
  await knex.schema.createTable("flag_post", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.string("text", 255);
    table.uuid("postId").notNullable();
    table.uuid("userId").notNullable();
    table
      .foreign("postId")
      .references("id")
      .inTable("post")
      .onDelete("CASCADE");
    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });

  // Create post_report table
  await knex.schema.createTable("post_report", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.string("reason", 255);
    table.uuid("postId").notNullable();
    table.uuid("userId").notNullable();
    table
      .foreign("postId")
      .references("id")
      .inTable("post")
      .onDelete("CASCADE");
    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("post_report");
  await knex.schema.dropTableIfExists("flag_post");
  await knex.schema.dropTableIfExists("tagged_post");
  await knex.schema.dropTableIfExists("saved_post");
  await knex.schema.dropTableIfExists("comment_downvote");
  await knex.schema.dropTableIfExists("comment_upvote");
  await knex.schema.dropTableIfExists("downvote_post");
  await knex.schema.dropTableIfExists("upvote_post");
  await knex.schema.dropTableIfExists("post_comment");
  await knex.schema.dropTableIfExists("post");
}
