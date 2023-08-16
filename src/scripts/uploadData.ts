import fs from "fs";
import csvtojson from "csvtojson";

import { db } from "../db/dbSource";

import Categories from "../models/categories";
import Customers from "../models/customers";
import Employees from "../models/employees";
import EmployeeTerritories from "../models/employeeTerritories";
import OrderDetails from "../models/orderDetails";
import Orders from "../models/orders";
import Products from "../models/products";
import Regions from "../models/regions";
import Shippers from "../models/shippers";
import Suppliers from "../models/suppliers";
import Territories from "../models/territories";

export const getFiles = async () => {
  try {
    const files = await fs.promises.readdir("data");

    return files;
  } catch (err) {
    throw err;
  }
};

const getTableSchema = (name: string) => {
    switch (name) {
        case "Categories":
            return Categories;
        case "Customers":
            return Customers;
        case "Employees":
            return Employees;
        case "EmployeeTerritories":
            return EmployeeTerritories;
        case "OrderDetails":
            return OrderDetails;
        case "Orders":
            return Orders;
        case "Products":
            return Products;
        case "Regions":
            return Regions;
        case "Shippers":
            return Shippers;
        case "Suppliers":
            return Suppliers;
        case "Territories":
            return Territories;

        default: return null;
    }
}

const uploadFile = async (fileName: string) => {
  const dataByJSON = await csvtojson().fromFile(`data/${fileName}`);

  const tableName = getTableName(fileName);
        
  const table = getTableSchema(tableName);
    
  try {
    if (!table) {
        return
    }

    await db.insert(table).values(dataByJSON).onConflictDoNothing();
  } catch (err) {
    console.log(err);
  }
};

const getTableName = (fileName: string): string => {
  return fileName.split(".").at(0)!;
};

const generateDataToDB = async () => {
  const files = getFiles();

  await Promise.all(
    (
      await files
    )?.map((file) => {
      uploadFile(file);
    })
  );

  return "Files uploaded";
};

generateDataToDB();