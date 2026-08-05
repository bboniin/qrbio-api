import { Request, Response } from "express";
import { EditCategoryService } from "../../services/Partner/EditCategoryService";

class EditCategoryController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const { name, color, order, visible_app } = req.body;

    const editCategoryService = new EditCategoryService();

    const categoryEdited = await editCategoryService.execute({
      name,
      id,
      color,
      order,
      visible_app,
    });

    return res.json(categoryEdited);
  }
}

export { EditCategoryController };
