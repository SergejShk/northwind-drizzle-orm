import { pgTable, serial, text } from "drizzle-orm/pg-core";

const regions = pgTable('regions', {
    RegionID: serial('RegionID').primaryKey(),
    RegionDescription: text('RegionDescription'),
  });

export default regions
