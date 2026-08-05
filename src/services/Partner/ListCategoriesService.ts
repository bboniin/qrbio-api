import prismaClient from "../../prisma";

class ListCategoriesService {
  async execute() {
    const categories = await prismaClient.category.findMany({
      orderBy: {
        order: "asc",
      },
    });

    return categories;
  }
}

export { ListCategoriesService };
