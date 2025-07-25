import prismaClient from "../../prisma";

interface CategoryRequest {
  id: string;
}

class DeleteCategoryService {
  async execute({ id }: CategoryRequest) {
    if (!id) {
      throw new Error("Id da categoria é obrigatório");
    }

    const categoryDeleted = await prismaClient.category.delete({
      where: {
        id: id,
      },
    });

    return categoryDeleted;
  }
}

export { DeleteCategoryService };
