import prismaClient from "../../prisma";

class ListProfilesPartnersService {
  async execute() {
    const listProfiles = await prismaClient.profile.findMany({
      orderBy: {
        create_at: "asc",
      },
    });

    await Promise.all(
      await listProfiles.map(async (item) => {
        if (item.partner_id) {
          const partnerProfile = await prismaClient.partnerProfile.findFirst({
            where: {
              profile_id: item.id,
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
                profile_id: item.id,
                partner_id: item.partner_id,
              },
            });
          }

          const profile = await prismaClient.profile.update({
            where: {
              id: item.id,
            },
            data: {
              partner_id: null,
            },
          });
          console.log(item.partner_id, profile.partner_id);
        }
      })
    );

    return listProfiles;
  }
}

export { ListProfilesPartnersService };
