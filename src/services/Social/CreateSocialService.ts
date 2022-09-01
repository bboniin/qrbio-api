import prismaClient from '../../prisma'

interface SocialRequest {
    name: string;
    profile_id: string;
    url: string;
    order: number;
    userId: string;
}

class CreateSocialService {
    async execute({ name, userId, profile_id, url, order }: SocialRequest) {

        const socialCreated = await prismaClient.social.create({
            data: {
                name: name,
                url: url,
                order: order,
                user_id: userId,
                profile_id: profile_id,
            }
        })

        return (socialCreated)
    }
}

export { CreateSocialService }