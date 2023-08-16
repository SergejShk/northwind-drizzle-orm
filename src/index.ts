import "reflect-metadata";
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import dotenv from "dotenv";

import { app } from "./app";
import { migrationDb } from "./db/dbSource";
 
dotenv.config();

const PORT = process.env.PORT || 3000;

const serverStart = async () => {
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
