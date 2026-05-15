import { Request, Response } from "express";
import { ListGroupsService } from "../../services/Contacts/ListGroupsService";

class ListGroupsController {
  async handle(req: Request, res: Response) {
    let userId = req.userId;

    const listGroupsService = new ListGroupsService();

    const listGroups = await listGroupsService.execute({
      userId,
    });

    return res.json(listGroups);
  }
}

export { ListGroupsController };
