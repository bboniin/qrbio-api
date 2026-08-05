import { Request, Response } from "express";
import { OrderCategoriesService } from "../../services/Partner/OrderCategoriesService";

class OrderCategoriesController {
  async handle(req: Request, res: Response) {
    const { categories } = req.body;

    const orderCategoriesService = new OrderCategoriesService();

    const categoryEdited = await orderCategoriesService.execute({
      categories,
    });

    return res.json(categoryEdited);
  }
}

export { OrderCategoriesController };
