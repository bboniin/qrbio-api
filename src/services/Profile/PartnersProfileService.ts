import prismaClient from "../../prisma";

interface PartnerRequest {
  partners: object;
  partner: string;
  profile_id: string;
}

class PartnersProfileService {
  async execute({ partners, profile_id, partner }: PartnerRequest) {
    const partnersEdit = Object.values(partners);

    await Promise.all(
      partnersEdit.map(async (item) => {
        const partnerProfile = await prismaClient.partnerProfile.findFirst({
          where: {
            profile_id: profile_id,
            partner_id: item.partner_id,
          },
        });
        const partner = await prismaClient.partner.findUnique({
          where: {
            id: item.partner_id,
          },
        });
        if (!partnerProfile && partner) {
          await prismaClient.partnerProfile.create({
            data: {
              profile_id: profile_id,
              partner_id: item.partner_id,
            },
          });
        }
      })
    );

    const partnerProfile = await prismaClient.partnerProfile.findMany({
      where: {
        profile_id: profile_id,
      },
    });

    partnerProfile.map(async (item) => {
      if (
        partnersEdit.filter((data) => {
          return item.partner_id == data.partner_id;
        }).length == 0
      ) {
        await prismaClient.partnerProfile.delete({
          where: {
            id: item.id,
          },
        });
      }
    });

    const profile = await prismaClient.profile.findUnique({
      where: {
        id: profile_id,
      },
    });

    return profile;
  }
}

export { PartnersProfileService };
