import prismaClient from '../../prisma'

interface PixRequest {
    id: string;
}

class DeletePixKeysService {
    async execute({ id }: PixRequest) {
        const pixKeyDeleted = await prismaClient.pixKey.delete({
            where: {
                id: id,
            }
        })
        return (pixKeyDeleted)
    }
}

export { DeletePixKeysService }