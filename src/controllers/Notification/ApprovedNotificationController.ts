import { Request, Response } from "express";
import { ApprovedNotificationService } from "../../services/Notification/ApprovedNotificationService";

class ApprovedNotificationController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    let userId = req.userId;

    const approvedNotificationService = new ApprovedNotificationService();

    const notification = await approvedNotificationService.execute({
      id,
      userId,
    });

    return res.json(notification);
  }
}

export { ApprovedNotificationController };
