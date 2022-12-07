import prismaClient from '../../prisma'

interface PixRequest {
    name: string;
    message: string;
    id: string;
    visible_message: boolean;
    userId: string;
}

class EditPixService {
    async execute({ name, id, userId, visible_message, message }: PixRequest) {

        const getPix = await prismaClient.pix.findUnique({
            where: {
                id: id
            }
        })

        if (getPix.user_id != userId) {
            throw new Error("Esse perfil não pertence ao Usuário")
        }

        if (name === "") {
            throw new Error("Nome do botão é obrigátorio")
        }

        const pixEdited = await prismaClient.pix.update({
            where: {
                id: id
            },
            data: {
                name: name,
                message: message,
                visible_message: visible_message,
            }
        })

        return (pixEdited)
    }
}

export { EditPixService }