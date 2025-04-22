import prismaClient from "../../prisma";

interface PartnerRequest {
  id: string;
  auth: boolean;
  page: number;
  search: string;
}

class GetPartnerService {
  async execute({ id, auth, search, page }: PartnerRequest) {
    const partner = await prismaClient.partner.findUnique({
      where: {
        id: id,
      },
    });

    if (!partner) {
      throw new Error("Parceiro não encontrado");
    }

    if (auth) {
      partner["profilesTotal"] = await prismaClient.profile.findMany({
        where: {
          partners: {
            some: {
              partner_id: partner.id,
            },
          },
          ...(search
            ? {
                OR: [
                  {
                    nickname: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                  {
                    name: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                ],
              }
            : {}),
        },
      });

      partner["profilesTotal"] = partner["profilesTotal"].length;

      partner["profiles"] = await prismaClient.profile.findMany({
        where: {
          partners: {
            some: {
              partner_id: partner.id,
            },
          },
          ...(search
            ? {
                OR: [
                  {
                    nickname: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                  {
                    name: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                ],
              }
            : {}),
        },
        include: {
          sociais: true,
        },
        skip: page * 1,
        take: 1,
      });
    }

    return partner;
  }
}

export { GetPartnerService };
