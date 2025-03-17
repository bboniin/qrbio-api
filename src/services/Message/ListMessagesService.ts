import prismaClient from "../../prisma";

interface MessageRequest {
  page: number;
  search: string;
  all: boolean;
}

class ListMessagesService {
  async execute({ page, all, search }: MessageRequest) {
    let filter = {};
    let searchWhere = {};

    if (!all) {
      filter["take"] = 25;
      filter["page"] = page;
      if (!search) {
        searchWhere = {
          name: {
            contains: search,
            mode: "insensitive",
          },
        };
      }
    }

    const listMessagesTotal = await prismaClient.message.count({
      where: searchWhere,
    });

    const listMessages = await prismaClient.message.findMany({
      ...filter,
      where: searchWhere,
      orderBy: {
        update_at: "desc",
      },
    });

    return {
      messages: listMessages,
      total: listMessagesTotal,
    };
  }
}

export { ListMessagesService };
