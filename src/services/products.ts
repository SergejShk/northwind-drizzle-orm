import { sql, eq } from 'drizzle-orm'

import { db } from "../db/dbSource";
import products, { ProductsSelectType } from '../models/products';
import suppliers from "../models/suppliers";

import { NotFoundError } from '../utils/errors';

export const getAllProducts = async (skip: number, take: number) => {
    const date = new Date().toISOString();
    const start = process.hrtime();

    const data: ProductsSelectType[] = await db.select().from(products).limit(take).offset(skip);
    const { sql: sqlQuery } = db.select().from(products).limit(take).offset(skip).toSQL();

    const total = await db.select({ count: sql<number>`count(*)` }).from(products);
  
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

export const getProductById = async (id: string) => {
    const date = new Date().toISOString();
    const start = process.hrtime();
  
    const [data] = await db.select().from(products)
        .leftJoin(suppliers, eq(products.SupplierID, suppliers.SupplierID))
        .where(eq(products.ProductID, id));

    const { sql: sqlQuery } = db.select().from(products)
        .leftJoin(suppliers, eq(products.SupplierID, suppliers.SupplierID))
        .where(eq(products.ProductID, id)).toSQL();
  
    const end = process.hrtime(start);
    const duration = `${(end[0] * 1000000000 + end[1]) / 1000000} ms`;
  
    if (!data) {
      throw new NotFoundError("Not found");
    }
    
    const result = Object.entries(data || []).reduce((acc: any, [key, value]) => {
      if (data.suppliers && key === "SupplierID") {
        acc[key] = value;
        acc.Supplier = data?.suppliers.CompanyName;
      } else if (key === "suppliers") {
      } else if (key === "UnitPrice") {
        acc[key] = `$${value}`;
      } else {
        acc[key] = value;
      }
  
      return acc;
    }, {});
  
    return {
      metrics: {
        resultCount: 1,
        type: ["selectWithJoin"],
      },
      stats: { date, duration, sql: sqlQuery },
      data: result.products,
    };
  };
  