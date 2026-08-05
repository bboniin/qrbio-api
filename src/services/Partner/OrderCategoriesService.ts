import prismaClient from "../../prisma";

interface CategoriesRequest {
  categories: string[];
}

class OrderCategoriesService {
  async execute({ categories }: CategoriesRequest) {
    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      throw new Error(
        "É necessário fornecer uma lista válida de categorias para reordenar.",
      );
    }

    const updateOperations = categories.map((category, index) => {
      if (!category) {
        throw new Error(`ID inválido encontrado na posição ${index}`);
      }

      return prismaClient.category.update({
        where: {
          id: category,
        },
        data: {
          order: index + 1,
        },
      });
    });

    const updatedCategories = await prismaClient.$transaction(updateOperations);

    return updatedCategories;
  }
}

export { OrderCategoriesService };
