import { pgTable, serial, text } from "drizzle-orm/pg-core";

const employeeTerritories = pgTable('emplyee_territories', {
    EmployeeID: serial('EmployeeID').primaryKey(),
    TerritoryID: text('CompanyName'),
  });

export default employeeTerritories
