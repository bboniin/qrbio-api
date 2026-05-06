import { Request, Response } from "express";
import { ListNotificationsService } from "../../services/Notification/ListNotificationsService";

class ListNotificationsController {
  async handle(req: Request, res: Response) {
    const { partner_id, status, page } = req.query;

    let userId = req.userId;

    const listNotificationsService = new ListNotificationsService();

    const notifications = await listNotificationsService.execute({
      status: String(status) || "",
      partner_id: String(partner_id) || "",
      page: Number(page) || 0,
      userId,
    });

    return res.json(notifications);
  }
}

export { ListNotificationsController };
