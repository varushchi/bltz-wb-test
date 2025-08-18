import type { Knex } from "knex";
import "dotenv/config";

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.POSTGRES_HOST || "localhost",
      database: process.env.POSTGRES_DB || "postgres",
      user: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_PASSWORD || "postgres",
      port: Number(process.env.POSTGRES_PORT) || 5432,
    },
    pool: { min: 2, max: 10 },
    migrations: {
      tableName: "knex_migrations",
      directory: "./postgres/migrations",
    },
  },
};

export default knexConfig;
