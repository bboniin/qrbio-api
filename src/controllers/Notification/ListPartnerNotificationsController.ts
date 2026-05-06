import { Request, Response } from "express";
import { ListPartnerNotificationsService } from "../../services/Notification/ListPartnerNotificationsService";

class ListPartnerNotificationsController {
  async handle(req: Request, res: Response) {
    const { page } = req.query;

    let userId = req.userId;

    const listPartnerNotificationsService =
      new ListPartnerNotificationsService();

    const notifications = await listPartnerNotificationsService.execute({
      userId,
      page: Number(page) || 0,
    });

    return res.json(notifications);
  }
}

export { ListPartnerNotificationsController };
