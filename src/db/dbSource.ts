import dotenv from "dotenv";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from "postgres";

dotenv.config();

const dbUrl = process.env.DB_URL || ''

const migrationClient = postgres(dbUrl, { max: 1 });
export const migrationDb = drizzle(migrationClient);

const queryClient = postgres(dbUrl);
export const db = drizzle(queryClient);
