import prismaClient from '../../prisma'

interface EmergencyRequest {
    visible: boolean;
    id: string;
}

class ActiveEmergencyContactService {
    async execute({ id, visible, }: EmergencyRequest) {

        const emergencyEdited = await prismaClient.emergencyContact.update({
            where: {
                id: id
            },
            data: {
                visible: visible
            }
        })

        return (emergencyEdited)
    }
}

export { ActiveEmergencyContactService }