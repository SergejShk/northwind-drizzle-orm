import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import postgres from "postgres";

dotenv.config();

// import suppliers from "./controllers/suppliers";
const dbUrl = process.env.DB_URL || ''

import { errorHandler } from "./utils/errorHandlers";

export const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// app.use(suppliers.path, suppliers.router);

const queryClient = postgres(dbUrl, { 
  ssl: {
      rejectUnauthorized: false,
  },
});

const getDbData = async () => {
  return await queryClient`select * from suppliers`
};

app.get('/', async (_, res) => {
  const response = await getDbData()

  res.send(response)
})

app.use((_, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use(errorHandler);