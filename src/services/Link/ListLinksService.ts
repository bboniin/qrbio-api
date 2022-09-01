import prismaClient from '../../prisma'

interface LinkRequest {
    id: string;
}

class ListLinksService {
    async execute({ id }: LinkRequest) {

        const listLinks = await prismaClient.link.findMany({
            where: {
                profile_id: id
            },
            orderBy: {
                order: "asc"
            }
        })

        return (listLinks)
    }
}

export { ListLinksService }