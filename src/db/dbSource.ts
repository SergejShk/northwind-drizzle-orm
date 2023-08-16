import dotenv from "dotenv";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from "postgres";

dotenv.config();

const dbUrl = process.env.DB_URL || ''

const migrationClient = postgres(dbUrl, { 
    max: 1,
    ssl: {
        rejectUnauthorized: false,
    },
});

export const migrationDb = drizzle(migrationClient);

export const queryClient = postgres(dbUrl, { 
    ssl: {
        rejectUnauthorized: false,
    },
});
export const db = drizzle(queryClient);
