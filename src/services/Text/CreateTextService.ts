import prismaClient from '../../prisma'

interface TextRequest {
    name: string;
    profile_id: string;
    text: string;
    open: boolean;
    order: number;
    userId: string;
}

class CreateTextService {
    async execute({ name, userId, profile_id, text, order, open }: TextRequest) {

        const textCreated = await prismaClient.text.create({
            data: {
                name: name,
                text: text,
                open: open,
                user_id: userId,
                order: order,
                profile_id: profile_id,
            }
        })

        return (textCreated)
    }
}

export { CreateTextService }