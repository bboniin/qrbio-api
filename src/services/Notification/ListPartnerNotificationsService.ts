import { addHours, differenceInHours, differenceInMinutes } from "date-fns";
import prismaClient from "../../prisma";

interface NotificationRequest {
  userId: string;
  page: number;
}

class ListPartnerNotificationsService {
  async execute({ userId, page }: NotificationRequest) {
    const partner = await prismaClient.partner.findUnique({
      where: {
        id: userId,
      },
    });

    if (!partner) {
      throw new Error("Parceiro não encontrado");
    }

    const notifications = await prismaClient.notification.findMany({
      where: {
        partner_id: userId,
      },
      orderBy: {
        create_at: "desc",
      },
      take: 30,
      skip: 30 * page,
    });

    const total = await prismaClient.notification.count({
      where: {
        partner_id: userId,
      },
    });

    const latestNotification = await prismaClient.notification.findFirst({
      where: {
        partner_id: userId,
      },
      orderBy: {
        create_at: "desc",
      },
    });

    const minutesDiff =
      differenceInMinutes(
        addHours(latestNotification.create_at, partner.interval_send),
        new Date(),
      ) + 1;

    const isWithinRange = minutesDiff > 0;

    return {
      notifications,
      total,
      notification: latestNotification,
      minutesDiff,
      isWithinRange,
    };
  }
}

export { ListPartnerNotificationsService };
