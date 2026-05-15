import prismaClient from "../../prisma";

interface ContactRequest {
  id: string;
  userId: string;
}

class DeleteContactService {
  async execute({ id, userId }: ContactRequest) {
    const contact = await prismaClient.contact.findFirst({
      where: {
        id: id,
        user_id: userId,
      },
    });

    if (!contact) {
      throw new Error("Contato não encontrado");
    }

    const contactDeleted = await prismaClient.contact.delete({
      where: {
        id: id,
      },
    });

    return contactDeleted;
  }
}

export { DeleteContactService };
