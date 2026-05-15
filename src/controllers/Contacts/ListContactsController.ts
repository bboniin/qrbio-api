import { Request, Response } from "express";
import { ListContactsService } from "../../services/Contacts/ListContactsService";

class ListContactsController {
  async handle(req: Request, res: Response) {
    let userId = req.userId;

    const { name } = req.query;

    const listContactsService = new ListContactsService();

    const listContacts = await listContactsService.execute({
      userId,
      name: name ? String(name) : "",
    });

    return res.json(listContacts);
  }
}

export { ListContactsController };
