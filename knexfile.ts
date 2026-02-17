import type { Knex } from "knex";
import "dotenv/config";

const {
  KNEX_DB_USER,
  KNEX_DB_PASSWORD,
  KNEX_DB_HOST,
  KNEX_DB_DATABASE,
  KNEX_DB_PORT,
} = process.env;

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: {
      host: KNEX_DB_HOST,
      user: KNEX_DB_USER,
      password: KNEX_DB_PASSWORD,
      database: KNEX_DB_DATABASE,
      port: KNEX_DB_PORT ? parseInt(KNEX_DB_PORT) : 3306,
    },
    migrations: {
      directory: "./migrations",
      tableName: "knex_migrations",
      extension: "ts",
    },
    seeds: {
      directory: "./seeds",
    },
  },

  production: {
    client: "mysql2",
    connection: {
      host: KNEX_DB_HOST,
      user: KNEX_DB_USER,
      password: KNEX_DB_PASSWORD,
      database: KNEX_DB_DATABASE,
      port: KNEX_DB_PORT ? parseInt(KNEX_DB_PORT) : 3306,
    },
    migrations: {
      directory: "./migrations",
      tableName: "knex_migrations",
      extension: "ts",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};

export default config;
