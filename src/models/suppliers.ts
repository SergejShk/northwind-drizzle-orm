import { pgTable, text } from "drizzle-orm/pg-core";

const suppliers = pgTable('suppliers', {
    SupplierID: text('SupplierID').primaryKey(),
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
    HomePage: text('HomePage'),
});

export default suppliers
