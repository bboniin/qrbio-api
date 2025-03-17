import prismaClient from "../../prisma";

interface MessageRequest {
  title: string;
  id: string;
  message: string;
}

class EditMessageService {
  async execute({ title, id, message }: MessageRequest) {
    if (!title || !message) {
      throw new Error("Nome e mensagem são obrigátorios");
    }

    const messageEdited = await prismaClient.message.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        message: message,
      },
    });

    return messageEdited;
  }
}

export { EditMessageService };
