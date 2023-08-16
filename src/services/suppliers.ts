import { sql } from 'drizzle-orm'

import { db } from "../db/dbSource";
import suppliers, { SuppliersSelectType } from "../models/suppliers";

export const getAllSuppliers = async (skip: number, take: number) => {
    const date = new Date().toISOString();
    const start = process.hrtime();

    const data: SuppliersSelectType[] = await db.select().from(suppliers).limit(take).offset(skip);
    const sqlQuery = db.select().from(suppliers).limit(take).offset(skip).toSQL();

    const total = await db.select({ count: sql<number>`count(*)` }).from(suppliers);
  
    const end = process.hrtime(start);
    const duration = `${(end[0] * 1000000000 + end[1]) / 1000000} ms`;
  
    return {
      metrics: {
        resultCount: data.length,
        type: ["select"],
      },
      stats: { date, duration, sql: sqlQuery },
      total: total[0].count,
      data,
    };
};
