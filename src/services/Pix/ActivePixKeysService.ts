import prismaClient from '../../prisma'

interface PixRequest {
    visible: boolean;
    id: string;
}

class ActivePixKeysService {
    async execute({ id, visible, }: PixRequest) {

        const pixEdited = await prismaClient.pixKey.update({
            where: {
                id: id
            },
            data: {
                visible: visible
            }
        })

        return (pixEdited)
    }
}

export { ActivePixKeysService }