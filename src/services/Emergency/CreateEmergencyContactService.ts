import prismaClient from '../../prisma'

interface EmergencyRequest {
    name: string;
    kinship: string;
    emergency_id: string;
    contact: string;
    order: number;
}

class CreateEmergencyContactService {
    async execute({ name, emergency_id, kinship, contact, order }: EmergencyRequest) {
        if (name === "" || contact === "" || kinship === "") {
            throw new Error("Nome, telefone e parentesco é obrigátorio")
        }

        const emergencyCreated = await prismaClient.emergencyContact.create({
            data: {
                emergency_id: emergency_id,
                name: name,
                contact: contact,
                kinship: kinship,
                visible: true,
                order: order,
            }
        })

        return (emergencyCreated)
    }
}

export { CreateEmergencyContactService }