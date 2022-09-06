import prismaClient from '../../prisma'

interface LinkRequest {
    id: string;
    userId: string;
    links: object;
}

class OrderLinksService {
    async execute({ id, userId, links }: LinkRequest) {

        if (!userId) {
            throw new Error("Token é obrigátorio")
        }

        if (!links) {
            throw new Error("Links é obrigátorio")
        }


        Object.values(links).map(async (item, index) => {
            await prismaClient.link.update({
                where: {
                    id: item.id
                },
                data: {
                    order: index,
                    visible: item.visible,
                }
            })
        })


        const getLinks = await prismaClient.link.findMany({
            where: {
                profile_id: id
            },
            orderBy: {
                order: "asc"
            }
        })


        return (getLinks)
    }
}

export { OrderLinksService }