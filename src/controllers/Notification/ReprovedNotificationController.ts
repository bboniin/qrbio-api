import { Request, Response } from "express";
import { ReprovedNotificationService } from "../../services/Notification/ReprovedNotificationService";

class ReprovedNotificationController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    let userId = req.userId;

    const reprovedNotificationService = new ReprovedNotificationService();

    const notification = await reprovedNotificationService.execute({
      id,
      userId,
    });

    return res.json(notification);
  }
}

export { ReprovedNotificationController };
