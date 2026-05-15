import prismaClient from "../../prisma";

interface ContactRequest {
  id: string;
  userId: string;
}

class DeleteGroupService {
  async execute({ id, userId }: ContactRequest) {
    const group = await prismaClient.group.findFirst({
      where: {
        id: id,
        user_id: userId,
      },
    });

    if (!group) {
      throw new Error("Grupo não encontrado");
    }

    const groupDeleted = await prismaClient.group.delete({
      where: {
        id: id,
      },
    });

    return groupDeleted;
  }
}

export { DeleteGroupService };
