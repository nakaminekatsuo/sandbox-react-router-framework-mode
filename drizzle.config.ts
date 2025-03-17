import { defineConfig } from "drizzle-kit";

// postgresの公式docker imageはSSLに対応していないので、urlで接続する
const dbCredentials = {
  host: process.env.POSTGRES_HOST!,
  port: Number(process.env.POSTGRES_PORT!),
  user: process.env.POSTGRES_USER!,
  password: process.env.POSTGRES_PASSWORD!,
  database: process.env.POSTGRES_DB!,
};

export const dbUrl = `postgresql://${dbCredentials.user}:${dbCredentials.password}@${dbCredentials.host}:${dbCredentials.port}/${dbCredentials.database}`;

export default defineConfig({
  dialect: "postgresql",
  schema: "./app/db/schema/*",
  out: "./drizzle",
  dbCredentials: {
    url: dbUrl,
  },
});
