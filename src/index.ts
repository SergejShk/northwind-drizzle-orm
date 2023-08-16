import "reflect-metadata";
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from "postgres";
import dotenv from "dotenv";

import { app } from "./app";
 
dotenv.config();

const PORT = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL || ''

const serverStart = async () => {
  const migrationClient = postgres(dbUrl, { max: 1 });
  const migrationDb = drizzle(migrationClient);

  try {
    await migrate(migrationDb, { migrationsFolder: './drizzle' });
    
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error: any) {
    console.log(error.message);
    process.exit(1);
  }
};

serverStart();
