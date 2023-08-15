import { pgTable, serial, text } from "drizzle-orm/pg-core";

const prodacts = pgTable('prodacts', {
    ProductID: serial('ProductID').primaryKey(),
    ProductName: text('ProductName'),
    SupplierID: text('SupplierID'),
    CategoryID: text('CategoryID'),
    QuantityPerUnit: text('QuantityPerUnit'),
    UnitPrice: text('UnitPrice'),
    UnitsInStock: text('UnitsInStock'),
    ReorderLevel: text('ReorderLevel'),
    Discontinued: text('Discontinued'),
  });

export default prodacts
