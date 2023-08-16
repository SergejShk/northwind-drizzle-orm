import { pgTable, serial, text } from "drizzle-orm/pg-core";
import employees from "./employees";

import territories from "./territories";

const employeeTerritories = pgTable('emplyee_territories', {
    ID: serial('ID').primaryKey(),
    EmployeeID: text('EmployeeID').references(() => employees.EmployeeID),
    TerritoryID: text('TerritoryID').references(() => territories.TerritoryID),
  });

export default employeeTerritories
