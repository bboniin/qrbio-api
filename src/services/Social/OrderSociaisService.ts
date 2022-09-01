import prismaClient from '../../prisma'

interface SocialRequest {
    id: string;
    userId: string;
    sociais: object;
}

class OrderSociaisService {
    async execute({ id, userId, sociais }: SocialRequest) {

        if (!userId) {
            throw new Error("Token é obrigátorio")
        }

        if (!sociais) {
            throw new Error("Redes Sociais é obrigátorio")
        }

        Object.values(sociais).map(async (item, index) => {
            await prismaClient.social.update({
                where: {
                    id: item.id
                },
                data: {
                    order: index,
                }
            })
        })


        const getSociais = await prismaClient.social.findMany({
            where: {
                profile_id: id
            },
            orderBy: {
                order: "asc"
            }
        })

        return (getSociais)
    }
}

export { OrderSociaisService }