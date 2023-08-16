import { pgTable, text } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';

import categories from "./categories";
import suppliers from "./suppliers";

const products = pgTable('products', {
    ProductID: text('ProductID').primaryKey(),
    ProductName: text('ProductName'),
    SupplierID: text('SupplierID').references(() => suppliers.SupplierID),
    CategoryID: text('CategoryID').references(() => categories.CategoryID),
    QuantityPerUnit: text('QuantityPerUnit'),
    UnitPrice: text('UnitPrice'),
    UnitsInStock: text('UnitsInStock'),
    ReorderLevel: text('ReorderLevel'),
    Discontinued: text('Discontinued'),
});

export const categoriesRelations = relations(products, ({ many }) => ({
	suppliers: many(suppliers),
}));

export default products
