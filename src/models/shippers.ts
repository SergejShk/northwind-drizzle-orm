import { pgTable, serial, text } from "drizzle-orm/pg-core";

const shippers = pgTable('shippers', {
    ShipperID: serial('ShipperID').primaryKey(),
    CompanyName: text('CompanyName'),
    Phone: text('Phone'),
});

export default shippers
