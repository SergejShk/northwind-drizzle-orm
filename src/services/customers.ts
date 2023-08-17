import { sql, eq } from 'drizzle-orm'

import { db } from "../db/dbSource";
import customers, { CustomersSelectType } from "../models/customers";

import { NotFoundError } from '../utils/errors';

export const getAllCustomers = async (skip: number, take: number) => {
    const date = new Date().toISOString();
    const start = process.hrtime();
  
    const data: CustomersSelectType[] = await db.select().from(customers).limit(take).offset(skip);
    const sqlQuery = db.select().from(customers).limit(take).offset(skip).toSQL();
    const total = await db.select({ count: sql<number>`count(*)` }).from(customers);
  
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

  export const getCustomerById = async (id: string) => {
    const date = new Date().toISOString();
    const start = process.hrtime();
  
    const data: CustomersSelectType[] = await db.select().from(customers).where(eq(customers.CustomerID, id));
    const sqlQuery = db.select().from(customers).where(eq(customers.CustomerID, id)).toSQL();
  
    const end = process.hrtime(start);
    const duration = `${(end[0] * 1000000000 + end[1]) / 1000000} ms`;
  
    if (!data) {
      throw new NotFoundError("Not found");
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
  