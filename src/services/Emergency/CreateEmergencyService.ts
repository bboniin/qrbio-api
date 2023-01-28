import prismaClient from '../../prisma'

interface EmergencyRequest {
    profile_id: string;
    message: string;
    name: string;
    order: number;
    userId: string;
}

class CreateEmergencyService {
    async execute({ userId, name, profile_id, message, order }: EmergencyRequest) {
        if (!message || !name) {
            throw new Error("Nome do botão e mensagem é obrigátorio")
        }

        const EmergencyCreated = await prismaClient.emergency.create({
            data: {
                name: name,
                message: message,
                user_id: userId,
                order: order,
                profile_id: profile_id,
            }
        })

        return (EmergencyCreated)
    }
}

export { CreateEmergencyService }