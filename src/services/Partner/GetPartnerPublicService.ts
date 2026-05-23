import prismaClient from "../../prisma";

interface PartnerRequest {
  id: string;
}

class GetPartnerPublicService {
  async execute({ id }: PartnerRequest) {
    const partner = await prismaClient.partner.findUnique({
      where: {
        id: id,
      },
      select: {
        name: true,
        enabled_cpf: true,
      },
    });

    if (!partner) {
      throw new Error("Parceiro não encontrado");
    }

    return partner;
  }
}

export { GetPartnerPublicService };
