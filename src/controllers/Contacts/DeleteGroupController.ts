import { Request, Response } from "express";
import { DeleteGroupService } from "../../services/Contacts/DeleteGroupService";

class DeleteGroupController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    let userId = req.userId;

    const deleteGroupService = new DeleteGroupService();

    const groupDeleted = await deleteGroupService.execute({
      id,
      userId,
    });

    return res.json(groupDeleted);
  }
}

export { DeleteGroupController };
