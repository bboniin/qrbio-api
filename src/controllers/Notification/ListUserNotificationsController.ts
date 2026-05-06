import { Request, Response } from "express";
import { ListUserNotificationsService } from "../../services/Notification/ListUserNotificationsService";

class ListUserNotificationsController {
  async handle(req: Request, res: Response) {
    let userId = req.userId;

    const listUserNotificationsService = new ListUserNotificationsService();

    const notifications = await listUserNotificationsService.execute({
      userId,
    });

    notifications.map(async (item) => {
      if (item.partner) {
        if (item.partner.photo) {
          item["photo_url"] =
            "https://qrbio-api.s3.amazonaws.com/" + item.partner.photo;
        }
      }
    });

    return res.json(notifications);
  }
}

export { ListUserNotificationsController };
