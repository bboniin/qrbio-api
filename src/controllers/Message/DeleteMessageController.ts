import { Request, Response } from "express";
import { DeleteMessageService } from "../../services/Message/DeleteMessageService";

class DeleteMessageController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteMessageService = new DeleteMessageService();

    const messageDeleted = await deleteMessageService.execute({
      id,
    });

    return res.json(messageDeleted);
  }
}

export { DeleteMessageController };
