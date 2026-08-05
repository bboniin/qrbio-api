import prismaClient from "../../prisma";

class ListAdminCategoriesService {
  async execute() {
    const categories = await prismaClient.category.findMany({
      orderBy: {
        order: "asc",
      },
      include: {
        partners: true,
      },
    });

    return categories;
  }
}

export { ListAdminCategoriesService };
