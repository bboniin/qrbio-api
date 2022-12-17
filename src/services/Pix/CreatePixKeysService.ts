import prismaClient from '../../prisma'

interface PixRequest {
    name: string;
    key: string;
    pix_id: string;
    type: string;
    order: number;
}

class CreatePixKeysService {
    async execute({ name, pix_id, key, type, order }: PixRequest) {
        if (name === "" || key === "" || type === "") {
            throw new Error("Nome, tipo e chave é obrigátorio")
        }

        const pixCreated = await prismaClient.pixKey.create({
            data: {
                pix_id: pix_id,
                name: name,
                key: key,
                type: type,
                visible: true,
                order: order,
            }
        })

        return (pixCreated)
    }
}

export { CreatePixKeysService }