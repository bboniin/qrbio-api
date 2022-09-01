import prismaClient from '../../prisma'

interface LinkRequest {
    name: string;
    id: string;
    userId: string;
    url: string;
}

class EditLinkService {
    async execute({ name, id, userId, url }: LinkRequest) {

        const getLink = await prismaClient.link.findUnique({
            where: {
                id: id
            }
        })

        if (getLink.user_id != userId) {
            throw new Error("Esse perfil não pertence ao Usuário.")
        }

        if (name === "" || url === "") {
            throw new Error("Nome e url é obrigátorio")
        }

        const linkEdited = await prismaClient.link.update({
            where: {
                id: id
            },
            data: {
                name: name,
                url: url,
            }
        })

        return (linkEdited)
    }
}

export { EditLinkService }