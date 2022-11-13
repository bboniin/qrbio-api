import { format } from 'date-fns';
import prismaClient from '../../prisma'

interface ProfileRequest {
    userId: string;
}

class ListProfilesService {
    async execute({ userId }: ProfileRequest) {

        const user = await prismaClient.user.findFirst({
            where: {
                id: userId
            }
        })

        if (!user) {
            throw new Error("Essa conta foi deletada")
        }

        const listProfiles = await prismaClient.profile.findMany({
            where: {
                user_id: userId
            },
            orderBy: {
                create_at: "asc"
            },
            include: {
                links: {
                    orderBy: {
                        order: 'asc',
                    },
                },
                sociais: {
                    orderBy: {
                        order: 'asc',
                    },
                },
                viewsProfiles: {
                    where: {
                        date: format(new Date(), "dd/MM/yyyy")
                    },
                }
            }
        })

        await listProfiles.map(async (item) => {
            item["viewsDay"] = item["viewsProfiles"].length
            item["viewsProfiles"] = undefined
            if (item.photo) {
                item["photo_url"] = "https://edish.s3.sa-east-1.amazonaws.com/" + item.photo
            }
            item["background_image"] = "https://edish.s3.sa-east-1.amazonaws.com/" + item.background_image
        })

        return (listProfiles)
    }
}

export { ListProfilesService }