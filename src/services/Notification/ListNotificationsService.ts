import prismaClient from "../../prisma";

interface NotificationRequest {
  status: string;
  partner_id: string;
  userId: string;
  page: number;
}

class ListNotificationsService {
  async execute({ status, userId, partner_id, page }: NotificationRequest) {
    const isAdmin = await prismaClient.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!isAdmin) {
      throw new Error("Rota restrita para administrador");
    }
    const filter = {};

    if (status) {
      filter["status"] = status;
    }
    if (partner_id) {
      filter["partner_id"] = partner_id;
    }

    const notifications = await prismaClient.notification.findMany({
      where: filter,
      skip: 30 * page,
      take: 30,
      include: {
        partner: true,
      },
      orderBy: {
        create_at: "desc",
      },
    });

    const total = await prismaClient.notification.count({ where: filter });

    return { notifications, total };
  }
}

export { ListNotificationsService };
