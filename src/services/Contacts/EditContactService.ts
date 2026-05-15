import prismaClient from "../../prisma";

interface ContactRequest {
  id: string;
  name: string;
  group_id: string;
  userId: string;
}

class EditContactService {
  async execute({ id, name, group_id, userId }: ContactRequest) {
    if (!name) {
      throw new Error("Nome é obrigatório");
    }

    const contact = await prismaClient.contact.findFirst({
      where: {
        id: id,
        user_id: userId,
      },
    });

    if (!contact) {
      throw new Error("Contato não encontrado");
    }

    if (group_id) {
      const group = await prismaClient.group.findUnique({
        where: {
          id: group_id,
        },
      });
      if (!group) {
        throw new Error("Grupo não encontrado");
      }

      if (group.restricted_user) {
        const existContact = await prismaClient.contact.findFirst({
          where: {
            group_id: group_id,
            profile_id: contact.profile_id,
          },
        });

        if (existContact) {
          throw new Error("Contato já cadastrado no grupo");
        }

        const existContactRestricted = await prismaClient.contact.findFirst({
          where: {
            group_id: group_id,
            profile: {
              user_id: contact.user_id,
            },
          },
        });

        if (existContactRestricted) {
          throw new Error(
            "Já existe um contato dessa conta cadastrado nesse grupo",
          );
        }
      }
    }

    const contactEdited = await prismaClient.contact.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        group_id: group_id,
      },
    });

    return contactEdited;
  }
}

export { EditContactService };
