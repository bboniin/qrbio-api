import { Request, Response } from "express";
import { CreateNotificationService } from "../../services/Notification/CreateNotificationService";

class CreateNotificationController {
  async handle(req: Request, res: Response) {
    const { title, message, url, send_at } = req.body;

    let userId = req.userId;

    const createNotificationService = new CreateNotificationService();

    const notification = await createNotificationService.execute({
      title,
      message,
      url,
      send_at,
      userId,
    });

    return res.json(notification);
  }
}

export { CreateNotificationController };
