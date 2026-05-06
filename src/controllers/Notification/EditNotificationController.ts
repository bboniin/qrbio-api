import { Request, Response } from "express";
import { EditNotificationService } from "../../services/Notification/EditNotificationService";

class EditNotificationController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const { title, message, url, send_at } = req.body;

    let userId = req.userId;

    const editNotificationService = new EditNotificationService();

    const notification = await editNotificationService.execute({
      id,
      userId,
      title,
      message,
      url,
      send_at,
    });

    return res.json(notification);
  }
}

export { EditNotificationController };
