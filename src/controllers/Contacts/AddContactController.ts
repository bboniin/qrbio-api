import { Request, Response } from "express";
import { AddContactService } from "../../services/Contacts/AddContactService";

class AddContactController {
  async handle(req: Request, res: Response) {
    const addContactService = new AddContactService();

    let { name, group_id, profile_id } = req.body;

    let userId = req.userId;

    const contactCreated = await addContactService.execute({
      name,
      group_id,
      profile_id,
      userId,
    });

    return res.json(contactCreated);
  }
}

export { AddContactController };
