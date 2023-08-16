import { Request } from "express";

import { Controller } from "./contrller";
import { getAllSuppliers } from "../services/suppliers";
import { asyncWrapper } from "../utils/errorHandlers";

class SuppliersController extends Controller {
  constructor() {
    super("suppliers");
    this.router
      .get("/", asyncWrapper(this.getAll))
  }

  private getAll = async (req: Request, res: any) => {
    let page = req.query.page ? Number(req.query.page) : 1;
    
    const take = 20;
    let skip = page * take - take;

    const data = await getAllSuppliers(skip, take);

    return res.status(200).json(data);
  };
}

export default new SuppliersController();