import { pgTable, text } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';

import customers from "./customers";
import employees from "./employees";
import orderDetails from "./orderDetails";
import shippers from "./shippers";

const orders = pgTable('orders', {
    OrderID: text('OrderID').primaryKey(),
    CustomerID: text('CustomerID').references(() => customers.CustomerID),
    EmployeeID: text('EmployeeID').references(() => employees.EmployeeID),
    OrderDate: text('OrderDate'),
    RequiredDate: text('RequiredDate'),
    ShippedDate: text('ShippedDate'),
    ShipVia: text('ShipVia'),
    Freight: text('Freight'),
    ShipName: text('ShipName'),
    ShipAddress: text('ShipAddress'),
    ShipCity: text('ShipCity'),
    ShipRegion: text('ShipRegion'),
    ShipPostalCode: text('ShipPostalCode'),
    ShipCountry: text('ShipCountry'),
});

export const ordersRelations = relations(orders, ({ one, many }) => ({
	customer: one(customers, {
		fields: [orders.CustomerID],
		references: [customers.CustomerID],
	}),
	shipper: one(shippers, {
		fields: [orders.ShipVia],
		references: [shippers.ShipperID],
	}),
  orderDetails: many(orderDetails),
}));

export default orders
