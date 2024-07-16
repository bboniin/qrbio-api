import prismaClient from '../../prisma'

interface SocialRequest {
    id: string;
    visible: boolean;
    userId: string;
}

class ActiveSocialService {
    async execute({ id, userId, visible }: SocialRequest) {

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
                visible: visible
            }
        })

        return (socialEdited)
    }
}

export { ActiveSocialService }