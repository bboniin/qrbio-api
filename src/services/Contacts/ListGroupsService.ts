import prismaClient from "../../prisma";

interface ContactRequest {
  userId: string;
}

class ListGroupsService {
  async execute({ userId }: ContactRequest) {
    const groups = await prismaClient.group.findMany({
      where: {
        user_id: userId,
      },
    });

    return groups;
  }
}

export { ListGroupsService };
