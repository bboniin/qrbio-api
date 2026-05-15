import prismaClient from "../../prisma";

interface ContactRequest {
  name: string;
  profile_id: string;
  group_id: string;
  userId: string;
}

class AddContactService {
  async execute({ name, userId, profile_id, group_id }: ContactRequest) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const profile = await prismaClient.profile.findUnique({
      where: {
        id: profile_id,
      },
    });
    if (!profile) {
      throw new Error("Perfil não encontrado");
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

      const existContact = await prismaClient.contact.findFirst({
        where: {
          group_id: group_id,
          profile_id: profile_id,
        },
      });

      if (existContact) {
        throw new Error("Contato já cadastrado no grupo");
      }
      if (group.restricted_user) {
        const existContactRestricted = await prismaClient.contact.findFirst({
          where: {
            group_id: group_id,
            profile: {
              user_id: profile.user_id,
            },
          },
        });

        if (existContactRestricted) {
          throw new Error(
            "Já existe um contato dessa conta cadastrado nesse grupo",
          );
        }
      }
    } else {
      const existContact = await prismaClient.contact.findFirst({
        where: {
          group_id: null,
          profile_id: profile_id,
        },
      });

      if (existContact) {
        throw new Error("Esse contato já existe na sua agenda");
      }
    }

    if (!name) {
      throw new Error("Nome do contato é obrigatório");
    }

    const addContact = await prismaClient.contact.create({
      data: {
        name: name,
        user_id: userId,
        profile_id: profile_id,
        group_id: group_id,
      },
    });

    return addContact;
  }
}

export { AddContactService };
