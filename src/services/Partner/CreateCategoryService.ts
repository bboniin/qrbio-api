import prismaClient from "../../prisma";

interface PartnerRequest {
  name: string;
  color: string;
  order: number;
  visible_app: boolean;
}

class CreateCategoryService {
  async execute({ name, color, order, visible_app }: PartnerRequest) {
    if (!name || !color) {
      throw new Error("Nome da categoria e cor são obrigatórios");
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
        color: color,
        order: order,
        visible_app: visible_app,
      },
    });

    return categoryCreated;
  }
}

export { CreateCategoryService };
