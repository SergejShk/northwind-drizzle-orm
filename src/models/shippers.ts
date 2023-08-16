import { pgTable, text } from "drizzle-orm/pg-core";

const shippers = pgTable('shippers', {
    ShipperID: text('ShipperID').primaryKey(),
    CompanyName: text('CompanyName'),
    Phone: text('Phone'),
});

export default shippers
