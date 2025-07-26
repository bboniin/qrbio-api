import prismaClient from "../../prisma";

interface PartnerRequest {
  name: string;
  id: string;
}

class EditCategoryService {
  async execute({ name, id }: PartnerRequest) {
    if (!name || !id) {
      throw new Error("Nome e id da categoria são obrigatórios");
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
      },
    });

    return categoryEdited;
  }
}

export { EditCategoryService };
