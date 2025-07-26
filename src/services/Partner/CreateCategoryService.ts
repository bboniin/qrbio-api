import prismaClient from "../../prisma";

interface PartnerRequest {
  name: string;
}

class CreateCategoryService {
  async execute({ name }: PartnerRequest) {
    if (!name) {
      throw new Error("Nome da categoria é obrigatório");
    }

    const category = await prismaClient.category.findFirst({
      where: {
        name: name,
      },
    });

    if (category) {
      throw new Error("Categoria já existe");
    }

    const categoryCreated = await prismaClient.category.create({
      data: {
        name: name,
      },
    });

    return categoryCreated;
  }
}

export { CreateCategoryService };
