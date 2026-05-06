import { addDays } from "date-fns";
import prismaClient from "../../prisma";

interface NotificationRequest {
  userId: string;
}

class ListUserNotificationsService {
  async execute({ userId }: NotificationRequest) {
    const partners = await prismaClient.partner.findMany({
      where: {
        partners: {
          some: {
            profile: { user_id: userId },
          },
        },
      },
      select: { id: true },
    });

    const partnerIds = partners.map((p) => p.id);

    const notifications = await prismaClient.notification.findMany({
      where: {
        send_at: {
          gte: addDays(new Date(), -7),
          lte: new Date(),
        },
        AND: [
          {
            OR: [{ partner_id: { in: partnerIds } }, { partner_id: null }],
          },
        ],
      },
      orderBy: {
        send_at: "desc",
      },
      include: {
        partner: true,
      },
    });

    return notifications;
  }
}

export { ListUserNotificationsService };
