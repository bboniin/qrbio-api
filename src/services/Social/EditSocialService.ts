import prismaClient from '../../prisma'

interface SocialRequest {
    name: string;
    id: string;
    url: string;
    userId: string;
}

class EditSocialService {
    async execute({ name, id, userId, url }: SocialRequest) {

        if (name === "" || url === "") {
            throw new Error("Nome e url é obrigátorio")
        }

        const getSocial = await prismaClient.social.findUnique({
            where: {
                id: id
            }
        })

        if (getSocial.user_id != userId) {
            throw new Error("Esse perfil não pertence ao Usuário")
        }

        const socialEdited = await prismaClient.social.update({
            where: {
                id: id
            },
            data: {
                name: name,
                url: url
            }
        })

        return (socialEdited)
    }
}

export { EditSocialService }