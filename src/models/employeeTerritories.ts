import { pgTable, text } from "drizzle-orm/pg-core";

const employeeTerritories = pgTable('emplyee_territories', {
    EmployeeID: text('EmployeeID').primaryKey(),
    TerritoryID: text('CompanyName'),
  });

export default employeeTerritories
