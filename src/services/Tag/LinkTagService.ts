import prismaClient from "../../prisma";

interface TagRequest {
  name: string;
  profile_id: string;
  id: string;
}

class LinkTagService {
  async execute({ name, id, profile_id }: TagRequest) {
    if (!id || !profile_id) {
      throw new Error("Id da tag e do perfil é obrigátorio");
    }

    const tag = await prismaClient.tag.findFirst({
      where: {
        id: id,
      },
    });

    if (!tag) {
      throw new Error("Essa tag não existe no nosso sistema ou já foi apagada");
    }

    if (tag.profile_id) {
      throw new Error("Tag já está vinculada a um perfil");
    }

    const profile = await prismaClient.profile.findFirst({
      where: {
        id: profile_id,
      },
    });

    const tagLinked = await prismaClient.tag.update({
      where: {
        id: id,
      },
      include: {
        batch: true,
      },
      data: {
        name: name,
        profile_id: profile_id,
      },
    });

    if (tagLinked.batch.partner_id) {
      const partners = tagLinked.batch.partner_id.split(",");
      await Promise.all(
        await partners.map(async (partner_id) => {
          const partnerProfile = await prismaClient.partnerProfile.findFirst({
            where: {
              profile_id: profile_id,
              partner_id: partner_id,
            },
          });
          const partner = await prismaClient.partner.findUnique({
            where: {
              id: partner_id,
            },
          });
          if (!partnerProfile && partner) {
            await prismaClient.partnerProfile.create({
              data: {
                profile_id: profile_id,
                partner_id: partner_id,
              },
            });
          }
        })
      );
    }

    if (!profile.promotional && profile.plan_name == "free") {
      await prismaClient.profile.update({
        where: {
          id: profile_id,
        },
        data: {
          promotional: true,
        },
      });
      tagLinked["plan"] = "promocional";
    }

    return tagLinked;
  }
}

export { LinkTagService };
