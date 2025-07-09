import prismaClient from "../../prisma";

interface MapRequest {
  minLatitude: number;
  minLongitude: number;
  maxLatitude: number;
  maxLongitude: number;
  keywords: string;
  categories: string;
}

class ListMapPartnersService {
  async execute({
    minLatitude,
    minLongitude,
    maxLatitude,
    maxLongitude,
    keywords,
    categories,
  }: MapRequest) {
    let filter = {};

    if (keywords) {
      const palavrasFiltro = keywords
        .split(/[\s,;]+/)
        .map((w) => w.trim())
        .filter(Boolean);

      filter["OR"] = palavrasFiltro.flatMap((palavra) => [
        { label: { contains: palavra, mode: "insensitive" } },
        { keywords: { contains: palavra, mode: "insensitive" } },
      ]);
    }

    if (categories) {
      const categoriasArray = categories.split(",").map((c) => c.trim());

      filter["categories"] = {
        some: {
          category_id: {
            in: categoriasArray,
          },
        },
      };
    }

    const partners = await prismaClient.partner.findMany({
      where: {
        map_visible: true,
        latitude: {
          gte: minLatitude,
          lte: maxLatitude,
        },
        longitude: {
          gte: minLongitude,
          lte: maxLongitude,
        },
        ...filter,
      },
      include: {
        categories: true,
      },
    });

    return partners;
  }
}

export { ListMapPartnersService };
