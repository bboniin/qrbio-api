import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/Partner/CreateCategoryService";

class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const { name, color, order, visible_app } = req.body;

    const createCategoryService = new CreateCategoryService();

    const categoryCreated = await createCategoryService.execute({
      name,
      color,
      order,
      visible_app,
    });

    return res.json(categoryCreated);
  }
}

export { CreateCategoryController };
