import prismaClient from "../../prisma";

interface MapRequest {
  minLatitude: number;
  minLongitude: number;
  maxLatitude: number;
  maxLongitude: number;
}

class ListMapPartnersService {
  async execute({
    minLatitude,
    minLongitude,
    maxLatitude,
    maxLongitude,
  }: MapRequest) {
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
      },
    });

    return partners;
  }
}

export { ListMapPartnersService };
