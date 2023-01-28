import prismaClient from '../../prisma'

interface EmergencyRequest {
    id: string;
    userId: string;
}

class DeleteEmergencyService {
    async execute({ id, userId }: EmergencyRequest) {

        const getEmergency = await prismaClient.emergency.findUnique({
            where: {
                id: id
            }
        })

        if (getEmergency.user_id != userId) {
            throw new Error("Esse perfil não pertence ao Usuário")
        }

        const EmergencyDeleted = await prismaClient.emergency.delete({
            where: {
                id: id,
            }
        })
        return (EmergencyDeleted)
    }
}

export { DeleteEmergencyService }