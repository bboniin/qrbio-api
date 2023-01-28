import prismaClient from '../../prisma'

interface EmergencyRequest {
    id: string;
}

class DeleteEmergencyContactService {
    async execute({ id }: EmergencyRequest) {
        const emergencyContactDeleted = await prismaClient.emergencyContact.delete({
            where: {
                id: id,
            }
        })
        return (emergencyContactDeleted)
    }
}

export { DeleteEmergencyContactService }