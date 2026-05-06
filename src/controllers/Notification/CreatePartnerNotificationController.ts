import { Request, Response } from "express";
import { CreatePartnerNotificationService } from "../../services/Notification/CreatePartnerNotificationService";

class CreatePartnerNotificationController {
  async handle(req: Request, res: Response) {
    const { title, message, url, send_at } = req.body;

    let userId = req.userId;

    const createPartnerNotificationService =
      new CreatePartnerNotificationService();

    const notification = await createPartnerNotificationService.execute({
      title,
      message,
      url,
      send_at,
      userId,
    });

    return res.json(notification);
  }
}

export { CreatePartnerNotificationController };
