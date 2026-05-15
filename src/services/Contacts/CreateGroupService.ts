import prismaClient from "../../prisma";

interface ContactRequest {
  name: string;
  restricted_user: boolean;
  description: string;
  userId: string;
}

class CreateGroupService {
  async execute({
    name,
    userId,
    description,
    restricted_user,
  }: ContactRequest) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    if (!name) {
      throw new Error("Nome do grupo é obrigatório");
    }

    const group = await prismaClient.group.findFirst({
      where: {
        name: name,
        user_id: userId,
      },
    });

    if (group) {
      throw new Error("Já existe um grupo com esse nome");
    }

    const createGroup = await prismaClient.group.create({
      data: {
        name: name,
        user_id: userId,
        description: description,
        restricted_user: restricted_user,
      },
    });

    return createGroup;
  }
}

export { CreateGroupService };
