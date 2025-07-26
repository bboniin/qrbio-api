import prismaClient from "../../prisma";

class ListAdminCategoriesService {
  async execute() {
    const categories = await prismaClient.category.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        partners: true,
      },
    });

    return categories;
  }
}

export { ListAdminCategoriesService };
