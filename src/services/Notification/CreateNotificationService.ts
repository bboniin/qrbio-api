import prismaClient from "../../prisma";
import sendNotification from "../../utils/onesignal";

interface NotificationRequest {
  title: string;
  message: string;
  userId: string;
  url: string;
  send_at: Date;
}

class CreateNotificationService {
  async execute({ title, message, userId, url, send_at }: NotificationRequest) {
    const isAdmin = await prismaClient.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!isAdmin) {
      throw new Error("Rota restrita para administrador");
    }

    if (!title || !message) {
      throw new Error("Titulo e mensagem são obrigatórios");
    }

    await prismaClient.notification.create({
      data: {
        title,
        message,
        url,
        send_at: send_at || new Date(),
        status: "aprovado",
      },
    });

    await sendNotification({
      title: title,
      message: message,
      url: url,
      usersId: "",
      send_at: send_at || new Date(),
      isAdmin: isAdmin,
      large_icon: "",
    });
  }
}

export { CreateNotificationService };
