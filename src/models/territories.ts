import { pgTable, serial, text } from "drizzle-orm/pg-core";

const territories = pgTable('territories', {
    TerritoryID: serial('TerritoryID').primaryKey(),
    TerritoryDescription: text('TerritoryDescription'),
    RegionID: text('RegionID'),
  });

export default territories
