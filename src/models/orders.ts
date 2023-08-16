import { pgTable, text } from "drizzle-orm/pg-core";

const orders = pgTable('orders', {
    OrderID: text('OrderID').primaryKey(),
    CustomerID: text('CustomerID'),
    EmployeeID: text('EmployeeID'),
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

export default orders
