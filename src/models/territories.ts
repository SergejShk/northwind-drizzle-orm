import { pgTable, text } from "drizzle-orm/pg-core";

const territories = pgTable('territories', {
    TerritoryID: text('TerritoryID').primaryKey(),
    TerritoryDescription: text('TerritoryDescription'),
    RegionID: text('RegionID'),
  });

export default territories
