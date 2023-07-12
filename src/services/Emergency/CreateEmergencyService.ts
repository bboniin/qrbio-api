import prismaClient from '../../prisma'

interface EmergencyRequest {
    profile_id: string;
    message: string;
    name: string;
    observation: string;
    type_blood: string;
    order: number;
    userId: string;
}

class CreateEmergencyService {
    async execute({ userId, name, profile_id, observation, type_blood, message, order }: EmergencyRequest) {
        if (!message || !name) {
            throw new Error("Nome do botão e mensagem é obrigátorio")
        }

        const EmergencyCreated = await prismaClient.emergency.create({
            data: {
                name: name,
                message: message,
                user_id: userId,
                observation: observation,
                type_blood: type_blood,
                order: order,
                profile_id: profile_id,
            }
        })

        return (EmergencyCreated)
    }
}

export { CreateEmergencyService }