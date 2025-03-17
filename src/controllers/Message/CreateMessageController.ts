import { Request, Response } from "express";
import { CreateMessageService } from "../../services/Message/CreateMessageService";

class CreateMessageController {
  async handle(req: Request, res: Response) {
    const { title, message } = req.body;

    const createMessageService = new CreateMessageService();

    const messageCreated = await createMessageService.execute({
      title,
      message,
    });

    return res.json(messageCreated);
  }
}

export { CreateMessageController };
