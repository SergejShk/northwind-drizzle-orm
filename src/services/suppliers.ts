import { sql, eq } from 'drizzle-orm'

import { db } from "../db/dbSource";
import suppliers, { SuppliersSelectType } from "../models/suppliers";

import { NotFoundError } from '../utils/errors';

export const getAllSuppliers = async (skip: number, take: number) => {
    const date = new Date().toISOString();
    const start = process.hrtime();

    const data: SuppliersSelectType[] = await db.select().from(suppliers).limit(take).offset(skip);
    const { sql: sqlQuery } = db.select().from(suppliers).limit(take).offset(skip).toSQL();

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

export const getSupplierById = async (id: string) => {
  const date = new Date().toISOString();
  const start = process.hrtime();

  const data: SuppliersSelectType[] = await db.select().from(suppliers).where(eq(suppliers.SupplierID, id));
  const { sql: sqlQuery } = db.select().from(suppliers).where(eq(suppliers.SupplierID, id)).toSQL();

  const end = process.hrtime(start);
  const duration = `${(end[0] * 1000000000 + end[1]) / 1000000} ms`;

  if (!data) {
    throw new NotFoundError("Supplier not found");
  }

  return {
    metrics: {
      resultCount: 1,
      type: ["selectWhere"],
    },
    stats: { date, duration, sql: sqlQuery },
    data: data[0],
  };
};