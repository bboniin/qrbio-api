import { Request, Response } from "express";
import { ListAdminCategoriesService } from "../../services/Partner/ListAdminCategoriesService";

class ListAdminCategoriesController {
  async handle(req: Request, res: Response) {
    const listAdminCategoriesService = new ListAdminCategoriesService();

    const listCategories = await listAdminCategoriesService.execute();

    return res.json(listCategories);
  }
}

export { ListAdminCategoriesController };
