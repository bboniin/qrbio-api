import { Request, Response } from "express";
import { ListCategoriesService } from "../../services/Partner/ListCategoriesService";

class ListCategoriesController {
  async handle(req: Request, res: Response) {
    const listCategoriesService = new ListCategoriesService();

    const listCategories = await listCategoriesService.execute();

    return res.json(listCategories);
  }
}

export { ListCategoriesController };
