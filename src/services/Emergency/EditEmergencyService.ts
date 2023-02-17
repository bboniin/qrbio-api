import prismaClient from '../../prisma'

interface EmergencyRequest {
    message: string;
    id: string;
    name: string;
    userId: string;
}

class EditEmergencyService {
    async execute({ id, name, userId, message }: EmergencyRequest) {

        const getEmergency = await prismaClient.emergency.findUnique({
            where: {
                id: id
            }
        })

        if (getEmergency.user_id != userId) {
            throw new Error("Esse perfil não pertence ao Usuário")
        }

        if (!message || !name) {
            throw new Error("Nome do botão e mensagem é obrigátorio")
        }

        const emergencyEdited = await prismaClient.emergency.update({
            where: {
                id: id
            },
            data: {
                name: name,
                message: message
            }
        })

        return (emergencyEdited)
    }
}

export { EditEmergencyService }