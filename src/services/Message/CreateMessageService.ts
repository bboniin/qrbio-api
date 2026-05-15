import prismaClient from "../../prisma";

interface MessageRequest {
  title: string;
  message: string;
}

class CreateMessageService {
  async execute({ title, message }: MessageRequest) {
    if (!title || !message) {
      throw new Error("Nome e mensagem são obrigatórios");
    }

    const messageCreated = await prismaClient.message.create({
      data: {
        title: title,
        message: message,
      },
    });

    return messageCreated;
  }
}

export { CreateMessageService };
