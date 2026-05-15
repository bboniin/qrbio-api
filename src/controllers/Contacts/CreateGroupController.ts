import { Request, Response } from "express";
import { CreateGroupService } from "../../services/Contacts/CreateGroupService";

class CreateGroupController {
  async handle(req: Request, res: Response) {
    let { name, restricted_user, description } = req.body;

    let userId = req.userId;

    const createGroupService = new CreateGroupService();

    const groupCreated = await createGroupService.execute({
      name,
      restricted_user,
      userId,
      description,
    });

    return res.json(groupCreated);
  }
}

export { CreateGroupController };
