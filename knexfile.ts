import type { Knex } from "knex";
import "dotenv/config";

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env;

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
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
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
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
