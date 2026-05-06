import prismaClient from "../../prisma";
import sendNotification from "../../utils/onesignal";

interface NotificationRequest {
  userId: string;
  id: string;
}

class ReprovedNotificationService {
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

    const partner = await prismaClient.partner.findUnique({
      where: {
        id: userId,
      },
    });

    if (partner) {
      await prismaClient.partner.update({
        where: {
          id: notification.partner_id,
        },
        data: {
          number_sends: partner.number_sends - 1,
        },
      });
    }

    await prismaClient.notification.update({
      where: {
        id: id,
      },
      data: {
        status: "reprovado",
      },
    });
  }
}

export { ReprovedNotificationService };
