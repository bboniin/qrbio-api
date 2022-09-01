import prismaClient from '../../prisma'

interface SocialRequest {
    id: string;
}

class DeleteSocialService {
    async execute({ id }: SocialRequest) {

        const socialDeleted = await prismaClient.social.delete({
            where: {
                id: id
            }
        })
        return (socialDeleted)
    }
}

export { DeleteSocialService }