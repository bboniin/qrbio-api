import prismaClient from '../../prisma'

interface SocialRequest {
    id: string;
}

class ListSociaisService {
    async execute({ id }: SocialRequest) {

        const listSociais = await prismaClient.social.findMany({
            where: {
                profile_id: id
            },
            orderBy: {
                order: "asc"
            }
        })

        return (listSociais)
    }
}

export { ListSociaisService }