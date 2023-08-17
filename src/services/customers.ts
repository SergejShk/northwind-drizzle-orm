import { sql, eq, ilike } from 'drizzle-orm'

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
  
  export const getCustomersBySearch = async (query: any) => {
    const date = new Date().toISOString();
    const start = process.hrtime();
  
    const dataCustomers: CustomersSelectType[] = await db.select().from(customers)
      .where(ilike(customers.CompanyName, `%${query}%`))
      .where(ilike(customers.ContactName, `%${query}%`))
      .where(ilike(customers.ContactTitle, `%${query}%`))
      .limit(50);

    const sqlQuery = db.select().from(customers)
      .where(ilike(customers.CompanyName, `%${query}%`))
      .where(ilike(customers.ContactName, `%${query}%`))
      .where(ilike(customers.ContactTitle, `%${query}%`))
      .limit(50).toSQL();

    const end = process.hrtime(start);
    const duration = `${(end[0] * 1000000000 + end[1]) / 1000000} ms`;
  
    if (!dataCustomers || dataCustomers.length === 0) {
      throw new NotFoundError("Not found");
    }
  
    const data = dataCustomers.map((customer) => {
      return {
        CustomerID: customer.CustomerID,
        CompanyName: customer.CompanyName,
        ContactName: customer.ContactName,
        ContactTitle: customer.ContactTitle,
        Phone: customer.Phone,
      };
    });
  
    return {
      metrics: {
        resultCount: data.length,
        type: ["selectWhere"],
      },
      stats: { date, duration, sql: sqlQuery },
      data,
    };
  };