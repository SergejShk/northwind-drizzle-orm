import { Request } from "express";

import { Controller } from "./contrller";
import { getAllCustomers } from "../services/customers";

import { asyncWrapper } from "../utils/errorHandlers";

class CustomersController extends Controller {
  constructor() {
    super("customers");
    this.router
      .get("/", asyncWrapper(this.getAll))
  }

  private getAll = async (req: Request, res: any) => {
    let page = req.query.page ? Number(req.query.page) : 1;
    const take = 20;
    let skip = page * take - take;
    const data = await getAllCustomers(skip, take);

    return res.status(200).json(data);
  };
}

export default new CustomersController();