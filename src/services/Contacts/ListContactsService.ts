import prismaClient from "../../prisma";

interface ContactRequest {
  userId: string;
  name: string;
}

class ListContactsService {
  async execute({ userId, name }: ContactRequest) {
    const contacts = await prismaClient.contact.findMany({
      where: {
        user_id: userId,
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
      include: {
        group: true,
        profile: true,
      },
    });

    contacts.map((item) => {
      if (item.profile.photo) {
        item.profile["photo_url"] =
          "https://qrbio-api.s3.amazonaws.com/" + item.profile.photo;
      }
    });

    return contacts;
  }
}

export { ListContactsService };
