import type { Knex } from "knex";
import "dotenv/config";

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.POSTGRES_HOST || "db",
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
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
