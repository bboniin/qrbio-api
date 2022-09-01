import prismaClient from '../../prisma'

interface ProfileRequest {
    userId: string;
}

class ListProfilesService {
    async execute({ userId }: ProfileRequest) {

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
                }
            }
        })

        return (listProfiles)
    }
}

export { ListProfilesService }