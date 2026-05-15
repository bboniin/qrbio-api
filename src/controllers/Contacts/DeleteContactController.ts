import { Request, Response } from "express";
import { DeleteContactService } from "../../services/Contacts/DeleteContactService";

class DeleteContactController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    let userId = req.userId;

    const deleteContactService = new DeleteContactService();

    const contactDeleted = await deleteContactService.execute({
      id,
      userId,
    });

    return res.json(contactDeleted);
  }
}

export { DeleteContactController };
