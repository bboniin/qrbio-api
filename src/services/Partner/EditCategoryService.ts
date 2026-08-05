import prismaClient from "../../prisma";

interface PartnerRequest {
  name: string;
  id: string;
  color: string;
  order: number;
  visible_app: boolean;
}

class EditCategoryService {
  async execute({ name, color, order, visible_app, id }: PartnerRequest) {
    if (!name || !id || !color) {
      throw new Error("Nome, cor e id da categoria são obrigatórios");
    }

    const category = await prismaClient.category.findUnique({
      where: {
        id: id,
      },
    });

    if (!category) {
      throw new Error("Categoria não encontrada");
    }

    const categoryExist = await prismaClient.category.findFirst({
      where: {
        name: name,
      },
    });

    if (categoryExist && categoryExist?.id != id) {
      throw new Error("Categoria já existe");
    }

    const categoryEdited = await prismaClient.category.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        color: color,
        order: order,
        visible_app: visible_app,
      },
    });

    return categoryEdited;
  }
}

export { EditCategoryService };
