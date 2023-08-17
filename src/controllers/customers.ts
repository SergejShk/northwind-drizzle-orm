import { Request } from "express";

import { Controller } from "./contrller";
import { getAllCustomers, getCustomerById, getCustomersBySearch } from "../services/customers";

import { asyncWrapper } from "../utils/errorHandlers";

class CustomersController extends Controller {
  constructor() {
    super("customers");
    this.router
      .get("/", asyncWrapper(this.getAll))
      .get("/:id", asyncWrapper(this.getById))
      .get("/search/:query", asyncWrapper(this.getBySearch));
  }

  private getAll = async (req: Request, res: any) => {
    let page = req.query.page ? Number(req.query.page) : 1;
    const take = 20;
    let skip = page * take - take;
    const data = await getAllCustomers(skip, take);

    return res.status(200).json(data);
  };

  private getById = async (req: Request, res: any) => {
    const id = req.params.id;
    const product = await getCustomerById(id);

    return res.status(200).json(product);
  };

  private getBySearch = async (req: Request, res: any) => {
    const { query } = req.params;
    const data = await getCustomersBySearch(query);

    res.status(200).json(data);
  };
}

export default new CustomersController();