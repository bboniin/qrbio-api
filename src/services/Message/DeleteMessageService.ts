import prismaClient from "../../prisma";

interface MessageRequest {
  id: string;
}

class DeleteMessageService {
  async execute({ id }: MessageRequest) {
    const messageDeleted = await prismaClient.message.delete({
      where: {
        id: id,
      },
    });
    return messageDeleted;
  }
}

export { DeleteMessageService };
