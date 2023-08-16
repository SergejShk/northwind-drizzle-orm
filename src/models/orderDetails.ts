import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';

import products from "./products";
import orders from "./orders";

const orderDetails = pgTable('order_details', {
	ID: serial('ID').primaryKey(),
    OrderID: text('OrderID').references(() => orders.OrderID),
    ProductID: text('ProductID').references(() => products.ProductID),
    UnitPrice: text('UnitPrice'),
    Quantity: text('Quantity'),
    Discount: text('Discount'),
});

export const ordersRelations = relations(orderDetails, ({ one }) => ({
	order: one(orders, {
		fields: [orderDetails.OrderID],
		references: [orders.OrderID],
	}),
	product: one(products, {
		fields: [orderDetails.OrderID],
		references: [products.ProductID],
	}),
}));

export default orderDetails
