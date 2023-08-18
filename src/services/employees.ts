import { sql, eq } from 'drizzle-orm'

import { db } from "../db/dbSource";
import employees, { EmployeesSelectType } from "../models/employees";

import { NotFoundError } from '../utils/errors';

export const getAllEmployees = async (skip: number, take: number) => {
    const date = new Date().toISOString();
    const start = process.hrtime();

    const data: EmployeesSelectType[] = await db.select().from(employees).limit(take).offset(skip);
    const { sql: sqlQuery } = db.select().from(employees).limit(take).offset(skip).toSQL();

    const total = await db.select({ count: sql<number>`count(*)` }).from(employees);
  
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

export const getEmployeeById = async (id: string) => {
  const date = new Date().toISOString();
  const start = process.hrtime();

  const data: EmployeesSelectType[] = await db.select().from(employees).where(eq(employees.EmployeeID, id));
  const { sql: sqlQuery } = db.select().from(employees).where(eq(employees.EmployeeID, id)).toSQL();

  const end = process.hrtime(start);
  const duration = `${(end[0] * 1000000000 + end[1]) / 1000000} ms`;

  if (!data) {
    throw new NotFoundError("Employee not found");
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