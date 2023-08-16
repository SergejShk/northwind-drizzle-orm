import { pgTable, text } from "drizzle-orm/pg-core";

const categories = pgTable('categories', {
    CategoryID: text('CategoryID').primaryKey(),
    CategoryName: text('CategoryName'),
    Description: text('Description'),
  });

export default categories
