import prismaClient from "../../prisma";
import sendNotification from "../../utils/onesignal";

interface NotificationRequest {
  title: string;
  message: string;
  userId: string;
  url: string;
  id: string;
  send_at: Date;
}

class EditNotificationService {
  async execute({
    title,
    message,
    id,
    userId,
    url,
    send_at,
  }: NotificationRequest) {
    const isAdmin = await prismaClient.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!isAdmin) {
      throw new Error("Rota restrita para administrador");
    }

    const notification = await prismaClient.notification.findUnique({
      where: {
        id: id,
      },
    });

    if (!notification) {
      throw new Error("Notificação não encontrada");
    }

    if (!title || !message) {
      throw new Error("Titulo e mensagem são obrigatórios");
    }

    await prismaClient.notification.update({
      where: {
        id: id,
      },
      data: {
        title,
        message,
        url,
        send_at,
      },
    });
  }
}

export { EditNotificationService };
