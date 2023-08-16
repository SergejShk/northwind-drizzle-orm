import { pgTable, text } from "drizzle-orm/pg-core";

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

export default customers
