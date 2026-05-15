import { Request, Response } from "express";
import { EditContactService } from "../../services/Contacts/EditContactService";

class EditContactController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    let { name, group_id } = req.body;

    let userId = req.userId;

    const editContactService = new EditContactService();

    const contactEdit = await editContactService.execute({
      name,
      group_id,
      userId,
      id,
    });

    return res.json(contactEdit);
  }
}

export { EditContactController };
