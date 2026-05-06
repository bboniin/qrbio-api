import prismaClient from "../../prisma";
import sendNotification from "../../utils/onesignal";

interface NotificationRequest {
  userId: string;
  id: string;
}

class ApprovedNotificationService {
  async execute({ id, userId }: NotificationRequest) {
    const isAdmin = await prismaClient.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!isAdmin) {
      throw new Error("Rota restrita para administrador");
    }

    const notification = await prismaClient.notification.findFirst({
      where: {
        id: id,
        status: "pendente",
      },
    });

    if (!notification) {
      throw new Error("Notificação não encontrada");
    }

    await prismaClient.notification.update({
      where: {
        id: id,
      },
      data: {
        status: "aprovado",
      },
    });

    const partner = await prismaClient.partner.findUnique({
      where: {
        id: notification.partner_id,
      },
    });

    const users = await prismaClient.user.findMany({
      where: {
        profiles: {
          some: {
            partners: {
              some: {
                partner_id: notification.partner_id,
              },
            },
          },
        },
      },
    });

    const userIds = users.map((user) => user.id);

    await sendNotification({
      title: notification.title,
      message: notification.message,
      url: notification.url,
      usersId: userIds,
      send_at: notification.send_at,
      large_icon: "https://qrbio-api.s3.amazonaws.com/" + partner.photo,
      isAdmin: false,
    });
  }
}

export { ApprovedNotificationService };
