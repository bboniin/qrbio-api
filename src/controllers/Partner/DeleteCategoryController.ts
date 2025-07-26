import { Request, Response } from "express";
import { DeleteCategoryService } from "../../services/Partner/DeleteCategoryService";

class DeleteCategoryController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteCategoryService = new DeleteCategoryService();

    const categoryDeleted = await deleteCategoryService.execute({
      id,
    });

    return res.json(categoryDeleted);
  }
}

export { DeleteCategoryController };
