import { Request, Response } from "express";
import { EditGroupService } from "../../services/Contacts/EditGroupService";

class EditGroupController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    let { name, restricted_user, description } = req.body;

    let userId = req.userId;

    const editGroupService = new EditGroupService();

    const groupEdited = await editGroupService.execute({
      name,
      restricted_user,
      description,
      id,
      userId,
    });

    return res.json(groupEdited);
  }
}

export { EditGroupController };
