import "server-only";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured.");
}

type SqlClient = ReturnType<typeof postgres>;

const globalForDatabase = globalThis as typeof globalThis & {
  invitationSqlClient?: SqlClient;
};

const sqlClient =
  globalForDatabase.invitationSqlClient ??
  postgres(connectionString, {
    prepare: false,
    max: 1,
    connect_timeout: 15,
    idle_timeout: 20,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDatabase.invitationSqlClient = sqlClient;
}

export const db = drizzle(sqlClient, { schema });
