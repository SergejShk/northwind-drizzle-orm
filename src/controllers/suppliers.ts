import { Request } from "express";

import { Controller } from "./contrller";
import { getAllSuppliers, getSupplierById } from "../services/suppliers";
import { asyncWrapper } from "../utils/errorHandlers";

class SuppliersController extends Controller {
  constructor() {
    super("suppliers");
    this.router
      .get("/", asyncWrapper(this.getAll))
      .get("/:id", asyncWrapper(this.getById));
  }

  private getAll = async (req: Request, res: any) => {
    let page = req.query.page ? Number(req.query.page) : 1;
    
    const take = 20;
    let skip = page * take - take;

    const data = await getAllSuppliers(skip, take);

    return res.status(200).json(data);
  };

  private getById = async (req: Request, res: any) => {
    const id = req.params.id;
    const supplier = await getSupplierById(id);

    return res.status(200).json(supplier);
  };
}

export default new SuppliersController();