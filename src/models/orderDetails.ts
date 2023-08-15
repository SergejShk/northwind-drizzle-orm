import { pgTable, serial, text } from "drizzle-orm/pg-core";

const orderDetails = pgTable('order_details', {
    OrderID: serial('OrderID').primaryKey(),
    ProductID: text('ProductID'),
    UnitPrice: text('UnitPrice'),
    Quantity: text('Quantity'),
    Discount: text('Discount'),
  });

export default orderDetails
