import { config } from "dotenv";
import { Config } from "drizzle-kit";

config({ path: ".env.local", quiet: true });

const migrationUrl =
  process.env.DATABASE_MIGRATION_URL ?? process.env.DATABASE_URL;

if (!migrationUrl) {
  throw new Error("DATABASE_MIGRATION_URL or DATABASE_URL is not configured.");
}

export default {
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: migrationUrl,
  },
  strict: true,
  verbose: true,
} satisfies Config;
