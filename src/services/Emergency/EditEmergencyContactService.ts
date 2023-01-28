import prismaClient from '../../prisma'

interface EmergencyRequest {
    name: string;
    kinship: string;
    contact: string;
    visible: boolean;
    id: string;
}

class EditEmergencyContactService {
    async execute({ id, visible, name, kinship, contact }: EmergencyRequest) {
        if (name === "" || kinship === "" || contact === "") {
            throw new Error("Nome, telefone e parentesco é obrigátorio")
        }

        const EmergencyEdited = await prismaClient.emergencyContact.update({
            where: {
                id: id
            },
            data: {
                name: name,
                kinship: kinship,
                contact: contact,
                visible: visible
            }
        })

        return (EmergencyEdited)
    }
}

export { EditEmergencyContactService }