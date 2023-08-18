import { Request } from "express";

import { Controller } from "./contrller";
import { getAllOrders, getOrderById } from "../services/orders";

import { asyncWrapper } from "../utils/errorHandlers";

class OrdersController extends Controller {
  constructor() {
    super("orders");
    this.router
      .get("/", asyncWrapper(this.getAll))
      .get("/:id", asyncWrapper(this.getById));
  }

  private getAll = async (req: Request, res: any) => {
    let page = req.query.page ? Number(req.query.page) : 1;
    
    const take = 20;
    let skip = page * take - take;

    const data = await getAllOrders(skip, take);

    return res.status(200).json(data);
  };

  private getById = async (req: Request, res: any) => {
    const id = req.params.id;
    const supplier = await getOrderById(id);

    return res.status(200).json(supplier);
  };
}

export default new OrdersController();