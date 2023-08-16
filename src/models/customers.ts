import { pgTable, text } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';

import orders from "./orders";

const customers = pgTable('customers', {
    CustomerID: text('CustomerID').primaryKey(),
    CompanyName: text('CompanyName'),
    ContactName: text('ContactName'),
    ContactTitle: text('ContactTitle'),
    Address: text('Address'),
    City: text('City'),
    Region: text('Region'),
    PostalCode: text('PostalCode'),
    Country: text('Country'),
    Phone: text('Phone'),
    Fax: text('Fax'),
});

export const categoriesRelations = relations(customers, ({ many }) => ({
	orders: many(orders),
}));

export default customers
