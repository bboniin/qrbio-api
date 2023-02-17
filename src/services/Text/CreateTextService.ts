import prismaClient from '../../prisma'

interface TextRequest {
    name: string;
    profile_id: string;
    text: string;
    open: boolean;
    order: number;
    alignment: string;
    icon_name: string;
    userId: string;
}

class CreateTextService {
    async execute({ name, userId, alignment, icon_name, profile_id, text, order, open }: TextRequest) {

        const textCreated = await prismaClient.text.create({
            data: {
                name: name,
                text: text,
                open: open,
                alignment: alignment,
                user_id: userId,
                order: order,
                icon_name: icon_name,
                profile_id: profile_id,
            }
        })

        return (textCreated)
    }
}

export { CreateTextService }