import { Request, Response } from "express";
import { EditCategoryService } from "../../services/Partner/EditCategoryService";

class EditCategoryController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const { name } = req.body;

    let userId = req.userId;

    let photo = "";

    if (req.file) {
      photo = req.file.filename;
    }

    const editCategoryService = new EditCategoryService();

    const categoryEdited = await editCategoryService.execute({
      name,
      id,
    });

    return res.json(categoryEdited);
  }
}

export { EditCategoryController };
