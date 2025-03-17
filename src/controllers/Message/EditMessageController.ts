import { Request, Response } from "express";
import { EditMessageService } from "../../services/Message/EditMessageService";

class EditMessageController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const { title, message } = req.body;

    const editMessageService = new EditMessageService();

    const messageEdited = await editMessageService.execute({
      id,
      title,
      message,
    });

    return res.json(messageEdited);
  }
}

export { EditMessageController };
