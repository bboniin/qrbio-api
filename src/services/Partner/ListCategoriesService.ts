import prismaClient from "../../prisma";

class ListCategoriesService {
  async execute() {
    const categories = await prismaClient.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return categories;
  }
}

export { ListCategoriesService };
