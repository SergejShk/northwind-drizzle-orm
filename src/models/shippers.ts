import { pgTable, text } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';

import orders from "./orders";

const shippers = pgTable('shippers', {
    ShipperID: text('ShipperID').primaryKey(),
    CompanyName: text('CompanyName'),
    Phone: text('Phone'),
});

export const categoriesRelations = relations(shippers, ({ many }) => ({
	orders: many(orders),
}));

export default shippers
