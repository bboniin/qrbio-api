import prismaClient from '../../prisma'

interface PixRequest {
    name: string;
    profile_id: string;
    message: string;
    visible_message: boolean;
    order: number;
    userId: string;
}

class CreatePixService {
    async execute({ name, userId, profile_id, visible_message, message, order }: PixRequest) {
        if (name === "") {
            throw new Error("Nome do botão é obrigátorio")
        }

        const pixCreated = await prismaClient.pix.create({
            data: {
                name: name,
                message: message,
                visible_message: visible_message,
                user_id: userId,
                order: order,
                profile_id: profile_id,
            }
        })

        return (pixCreated)
    }
}

export { CreatePixService }