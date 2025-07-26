import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/Partner/CreateCategoryService";

class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const { name } = req.body;

    let userId = req.userId;

    let photo = "";

    if (req.file) {
      photo = req.file.filename;
    }

    const createCategoryService = new CreateCategoryService();

    const categoryCreated = await createCategoryService.execute({
      name,
    });

    return res.json(categoryCreated);
  }
}

export { CreateCategoryController };
