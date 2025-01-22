import prismaClient from "../../prisma";

interface ProfileRequest {
  nicknameCopy: string;
  nicknames: string;
  copyLinks: boolean;
  copyPixs: boolean;
  copySocial: boolean;
  copyEmergency: boolean;
  copyPartners: boolean;
  copyInfos: boolean;
  copyText: boolean;
}

class CopyProfileService {
  async execute({
    nicknameCopy,
    nicknames,
    copyText,
    copyLinks,
    copyPixs,
    copySocial,
    copyEmergency,
    copyPartners,
    copyInfos,
  }: ProfileRequest) {
    const profile = await prismaClient.profile.findUnique({
      where: {
        nickname: nicknameCopy,
      },
      include: {
        links: true,
        sociais: true,
        texts: true,
        partners: true,
        pix: true,
        emergency: true,
      },
    });

    if (!profile) {
      throw new Error("Nenhum perfil foi encontrado");
    }

    const nicknamesCopy = nicknames
      .split(",")
      .map((item) => item.replace(/\s+/g, ""));

    Promise.all(
      await nicknamesCopy.map(async (item) => {
        const profileCopy = await prismaClient.profile.findUnique({
          where: {
            nickname: item,
          },
        });

        if (profileCopy) {
          if (copyText) {
            await profile.texts.map(async (item) => {
              await prismaClient.text.create({
                data: {
                  name: item.name,
                  text: item.text,
                  open: item.open,
                  alignment: item.alignment,
                  user_id: profileCopy.user_id,
                  order: item.order,
                  icon_name: item.icon_name,
                  profile_id: profileCopy.id,
                },
              });
            });
          }
          if (copySocial) {
            await profile.sociais.map(async (item) => {
              await prismaClient.social.create({
                data: {
                  name: item.name,
                  url: item.url,
                  order: item.order,
                  user_id: profileCopy.user_id,
                  profile_id: profileCopy.id,
                },
              });
            });
          }
          if (copyLinks) {
            await profile.links.map(async (item) => {
              await prismaClient.link.create({
                data: {
                  name: item.name,
                  url: item.url,
                  user_id: profileCopy.user_id,
                  order: item.order,
                  icon_name: item.icon_name,
                  profile_id: profileCopy.id,
                },
              });
            });
          }
        }
      })
    );
  }
}

export { CopyProfileService };
