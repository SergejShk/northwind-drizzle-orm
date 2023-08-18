import { sql, eq } from 'drizzle-orm'

import { db } from "../db/dbSource";
import orders, { OrdersType } from "../models/orders";
import orderDetails, { OrderDetailsType } from '../models/orderDetails';
import products, { ProductsType } from '../models/products';
import shippers, { ShippersType } from '../models/shippers';

import { getPreparedAllOrders, getPreparedDataOrder } from "../utils/prepareDataOrders";
import { NotFoundError } from '../utils/errors';

export const getAllOrders = async (skip: number, take: number) => {
    const date = new Date().toISOString();
    const start = process.hrtime();

    const data = await db.select().from(orders)
        .leftJoin(orderDetails, eq(orders.OrderID, orderDetails.OrderID))
        .leftJoin(products, eq(orderDetails.OrderID, products.ProductID))
        .limit(take).offset(skip);

    const { sql: sqlQuery } = db.select().from(orders)
        .leftJoin(orderDetails, eq(orders.OrderID, orderDetails.OrderID))
        .leftJoin(products, eq(orderDetails.OrderID, products.ProductID))
        .limit(take).offset(skip).toSQL();

    const total = await db.select({ count: sql<number>`count(*)` }).from(orders);
  
    const end = process.hrtime(start);
    const duration = `${(end[0] * 1000000000 + end[1]) / 1000000} ms`;

    const result = data.reduce<Record<number, { orders: OrdersType; orderDetails: OrderDetailsType[] }>>(
        (acc, row) => {
          const orders = row.orders;
          const orderDetail = row.order_details;
       
          if (!acc[Number(orders.OrderID)]) {
            acc[Number(orders.OrderID)] = { orders, orderDetails: [] };
          }
       
          if (orderDetail) {
            acc[Number(orders.OrderID)].orderDetails.push(orderDetail);
          }
       
          return acc;
        },
        {}
      );

    const preparedData = getPreparedAllOrders(Object.values(result));

    return {
      metrics: {
        resultCount: data.length,
        type: ["select"],
      },
      stats: { date, duration, sql: sqlQuery },
      total: total[0].count,
      data: preparedData,
    };
};

export const getOrderById = async (id: string) => {
  const date = new Date().toISOString();
  const start = process.hrtime();

  const data = await db.select().from(orders)
    .leftJoin(orderDetails, eq(orders.OrderID, orderDetails.OrderID))
    .leftJoin(products, eq(orderDetails.ProductID, products.ProductID))
    .leftJoin(shippers, eq(orders.ShipVia, shippers.ShipperID))
    .where(eq(orders.OrderID, id))

  const { sql: sqlQuery } = db.select().from(orders)
    .leftJoin(orderDetails, eq(orders.OrderID, orderDetails.OrderID))
    .leftJoin(products, eq(orderDetails.ProductID, products.ProductID))
    .leftJoin(shippers, eq(orders.ShipVia, shippers.ShipperID))
    .where(eq(orders.OrderID, id)).toSQL();

  const end = process.hrtime(start);
  const duration = `${(end[0] * 1000000000 + end[1]) / 1000000} ms`;

  if (!data) {
    throw new NotFoundError("Order not found");
  }

  const result = data.reduce<Record<number, { orders: OrdersType; orderDetails: OrderDetailsType[], shippers: ShippersType[], products: ProductsType[] }>>(
    (acc, row) => {
      const orders = row.orders;
      const orderDetail = row.order_details;
      const shippers = row.shippers;
      const products = row.products;
   
      if (!acc[Number(orders.OrderID)]) {
        acc[Number(orders.OrderID)] = { orders, orderDetails: [], shippers: [], products: [] };
      }
   
      if (orderDetail) {
        acc[Number(orders.OrderID)].orderDetails.push(orderDetail);
      }
      
      if (shippers) {
        acc[Number(orders.OrderID)].shippers.push(shippers);
      }

      if (products) {
        acc[Number(orders.OrderID)].products.push(products);
      }
   
      return acc;
    },
    {}
  );

  const preparedData = getPreparedDataOrder(Object.values(result));
    
  return {
    metrics: {
      resultCount: 1,
      type: ["selectWhere"],
    },
    stats: { date, duration, sql: sqlQuery },
    data: preparedData,
  };
};