import express from "express";
import logger from "morgan";
import cors from "cors";

import suppliers from "./controllers/suppliers";
import products from "./controllers/products";
import orders from "./controllers/orders";
import employees from "./controllers/employees";
import customers from "./controllers/customers";

import { errorHandler } from "./utils/errorHandlers";

export const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(suppliers.path, suppliers.router);
app.use(products.path, products.router);
app.use(orders.path, orders.router);
app.use(employees.path, employees.router);
app.use(customers.path, customers.router);

app.use((_, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use(errorHandler);