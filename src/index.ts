import "reflect-metadata";
import dotenv from "dotenv";

import { app } from "app";

dotenv.config();
const PORT = process.env.PORT || 3000;

const serverStart = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error: any) {
    console.log(error.message);
    process.exit(1);
  }
};

serverStart();