import prismaClient from '../../prisma'

interface LinkRequest {
    id: string;
    userId: string;
}

class DeleteLinkService {
    async execute({ id, userId }: LinkRequest) {

        const getLink = await prismaClient.link.findUnique({
            where: {
                id: id
            }
        })

        if (getLink.user_id != userId) {
            throw new Error("Esse perfil não pertence ao Usuário.")
        }

        const linkDeleted = await prismaClient.link.delete({
            where: {
                id: id,
            }
        })
        return (linkDeleted)
    }
}

export { DeleteLinkService }