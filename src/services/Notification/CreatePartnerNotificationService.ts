import { addHours, format, isAfter, isBefore } from "date-fns";
import prismaClient from "../../prisma";

interface NotificationRequest {
  title: string;
  message: string;
  userId: string;
  url: string;
  send_at: Date;
}

class CreatePartnerNotificationService {
  async execute({ title, message, userId, url, send_at }: NotificationRequest) {
    const partner = await prismaClient.partner.findUnique({
      where: {
        id: userId,
      },
    });

    if (!partner) {
      throw new Error("Parceiro não encontrado");
    }

    if (!title || !message) {
      throw new Error("Titulo e mensagem são obrigatórios");
    }

    if (partner.number_sends <= 0) {
      throw new Error("Não há disparo disponivel no momento");
    }

    const notification = await prismaClient.notification.findFirst({
      where: {
        partner_id: userId,
      },
      orderBy: {
        create_at: "desc",
      },
    });

    if (notification) {
      if (
        isAfter(
          addHours(notification.create_at, partner.interval_send),
          new Date(),
        )
      ) {
        throw new Error(
          `Próxima notificação será permitida após ${format(
            addHours(notification.create_at, partner.interval_send),
            "dd/MM 'às' HH:mm",
          )}`,
        );
      }
    }

    await prismaClient.partner.update({
      where: {
        id: userId,
      },
      data: {
        number_sends: partner.number_sends - 1,
      },
    });

    await prismaClient.notification.create({
      data: {
        title,
        message,
        url,
        send_at,
        partner_id: userId,
        status: "pendente",
      },
    });
  }
}

export { CreatePartnerNotificationService };
