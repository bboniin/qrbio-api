import prismaClient from '../../prisma'

interface LinkRequest {
    name: string;
    profile_id: string;
    url: string;
    order: number;
    userId: string;
    icon_name: string;
}

class CreateLinkService {
    async execute({ name, userId, profile_id, icon_name, url, order }: LinkRequest) {

        const linkCreated = await prismaClient.link.create({
            data: {
                name: name,
                url: url,
                user_id: userId,
                order: order,
                icon_name: icon_name,
                profile_id: profile_id,
            }
        })

        return (linkCreated)
    }
}

export { CreateLinkService }