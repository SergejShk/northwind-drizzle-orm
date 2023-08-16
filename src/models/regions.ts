import { pgTable, text } from "drizzle-orm/pg-core";

const regions = pgTable('regions', {
    RegionID: text('RegionID').primaryKey(),
    RegionDescription: text('RegionDescription'),
  });

export default regions
