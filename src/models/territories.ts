import { pgTable, text } from "drizzle-orm/pg-core";
import regions from "./regions";

const territories = pgTable('territories', {
    TerritoryID: text('TerritoryID').primaryKey(),
    TerritoryDescription: text('TerritoryDescription'),
    RegionID: text('RegionID').references(() => regions.RegionID),
  });

export default territories
