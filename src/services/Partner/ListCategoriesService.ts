import prismaClient from "../../prisma";

class ListCategoriesService {
  async execute() {
    const categories = await prismaClient.category.findMany({
      orderBy: {
        name: "desc",
      },
    });

    return categories;
  }
}

export { ListCategoriesService };
