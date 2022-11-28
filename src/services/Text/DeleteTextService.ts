import prismaClient from '../../prisma'

interface TextRequest {
    id: string;
    userId: string;
}

class DeleteTextService {
    async execute({ id, userId }: TextRequest) {

        const getText = await prismaClient.text.findUnique({
            where: {
                id: id
            }
        })

        if (getText.user_id != userId) {
            throw new Error("Esse perfil não pertence ao Usuário")
        }

        const textDeleted = await prismaClient.text.delete({
            where: {
                id: id,
            }
        })
        return (textDeleted)
    }
}

export { DeleteTextService }