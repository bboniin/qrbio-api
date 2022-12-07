import prismaClient from '../../prisma'

interface PixRequest {
    id: string;
    userId: string;
}

class DeletePixService {
    async execute({ id, userId }: PixRequest) {

        const getPix = await prismaClient.pix.findUnique({
            where: {
                id: id
            }
        })

        if (getPix.user_id != userId) {
            throw new Error("Esse perfil não pertence ao Usuário")
        }

        const pixDeleted = await prismaClient.pix.delete({
            where: {
                id: id,
            }
        })
        return (pixDeleted)
    }
}

export { DeletePixService }