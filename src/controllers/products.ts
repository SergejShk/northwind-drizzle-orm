import { Request } from "express";

import { Controller } from "./contrller";
import { getAllProducts } from "../services/products";

import { asyncWrapper } from "../utils/errorHandlers";

class ProductsController extends Controller {
  constructor() {
    super("products");
    this.router
      .get("/", asyncWrapper(this.getAll))
  }

  private getAll = async (req: Request, res: any) => {
    let page = req.query.page ? Number(req.query.page) : 1;
    
    const take = 20;
    let skip = page * take - take;

    const data = await getAllProducts(skip, take);

    return res.status(200).json(data);
  };
}

export default new ProductsController();