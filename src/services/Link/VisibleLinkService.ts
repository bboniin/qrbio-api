import prismaClient from '../../prisma'

interface LinkRequest {
    visible: string;
    id: string;
    userId: string;
}

class VisibleLinkService {
    async execute({ visible, id, userId }: LinkRequest) {

        const getLink = await prismaClient.link.findUnique({
            where: {
                id: id
            }
        })

        if (getLink.user_id != userId) {
            throw new Error("Esse perfil não pertence ao Usuário")
        }

        if (visible === "") {
            throw new Error("Visibilidade é obrigátorio")
        }

        const linkEdited = await prismaClient.link.update({
            where: {
                id: id
            },
            data: {
                visible: visible == "true" ? true : false,
            }
        })

        return (linkEdited)
    }
}

export { VisibleLinkService }