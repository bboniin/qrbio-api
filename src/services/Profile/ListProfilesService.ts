import { format } from 'date-fns';
import prismaClient from '../../prisma'
import { ListModulesService } from './../Modules/ListModulesService';

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
                viewsProfiles: {
                    where: {
                        date: format(new Date(), "dd/MM/yyyy")
                    },
                }
            }
        })

        listProfiles.map(async (item) => {
            item["viewsDay"] = item["viewsProfiles"].length
            item["viewsProfiles"] = undefined
            if (item.photo) {
                item["photo_url"] = "https://edish.s3.sa-east-1.amazonaws.com/" + item.photo
            }
            if (item["background_image"]) {

            }
            item["background_image_url"] = "https://edish.s3.sa-east-1.amazonaws.com/" + item.background_image
        })

        return (listProfiles)
    }
}

export { ListProfilesService }