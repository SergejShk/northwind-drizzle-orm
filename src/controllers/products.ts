import { Request } from "express";

import { Controller } from "./contrller";
import { getAllProducts, getProductById, getProductsBySearch } from "../services/products";

import { asyncWrapper } from "../utils/errorHandlers";

class ProductsController extends Controller {
  constructor() {
    super("products");
    this.router
      .get("/", asyncWrapper(this.getAll))
      .get("/:id", asyncWrapper(this.getById))
      .get("/search/:query", asyncWrapper(this.getBySearch));
  }

  private getAll = async (req: Request, res: any) => {
    let page = req.query.page ? Number(req.query.page) : 1;
    
    const take = 20;
    let skip = page * take - take;

    const data = await getAllProducts(skip, take);

    return res.status(200).json(data);
  };

  private getById = async (req: Request, res: any) => {
    const id = req.params.id;
    const product = await getProductById(id);

    return res.status(200).json(product);
  };

  private getBySearch = async (req: Request, res: any) => {
    const { query } = req.params;
    const data = await getProductsBySearch(query);

    res.status(200).json(data);
  };
}

export default new ProductsController();