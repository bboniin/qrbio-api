import prismaClient from "../../prisma";

interface ContactRequest {
  id: string;
  name: string;
  description: string;
  restricted_user: boolean;
  userId: string;
}

class EditGroupService {
  async execute({
    id,
    name,
    description,
    userId,
    restricted_user,
  }: ContactRequest) {
    if (!name) {
      throw new Error("Nome é obrigatório");
    }

    const group = await prismaClient.group.findFirst({
      where: {
        id: id,
        user_id: userId,
      },
    });

    if (!group) {
      throw new Error("Contato não encontrado");
    }

    const groupName = await prismaClient.group.findFirst({
      where: {
        name: name,
        user_id: userId,
      },
    });

    if (groupName && groupName.id != id) {
      throw new Error("Já existe um grupo com esse nome");
    }

    const groupEdited = await prismaClient.group.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        description: description,
        restricted_user: restricted_user,
      },
    });

    return groupEdited;
  }
}

export { EditGroupService };
