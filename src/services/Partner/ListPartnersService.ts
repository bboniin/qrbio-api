import prismaClient from "../../prisma";

interface PartnerRequest {
  page: string;
  search: string;
}

class ListPartnersService {
  async execute({ page, search }: PartnerRequest) {
    const listPartnersTotal = await prismaClient.partner.findMany({
      orderBy: {
        update_at: "desc",
      },
      where: search
        ? {
            OR: [
              {
                label: {
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
        : {},
    });

    const listPartners = await prismaClient.partner.findMany({
      skip: parseInt(page) * 25,
      take: 25,
      where: search
        ? {
            OR: [
              {
                label: {
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
        : {},
      orderBy: {
        update_at: "desc",
      },
      include: {
        categories: true,
      },
    });

    listPartners.map(async (item) => {
      if (item.photo) {
        item["photo_url"] = "https://qrbio-api.s3.amazonaws.com/" + item.photo;
      }
    });

    return {
      partners: listPartners,
      total: listPartnersTotal.length,
    };
  }
}

export { ListPartnersService };
