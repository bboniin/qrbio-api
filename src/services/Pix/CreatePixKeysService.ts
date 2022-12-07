import prismaClient from '../../prisma'

interface PixRequest {
    name: string;
    key: string;
    pix_id: string;
    order: number;
}

class CreatePixKeysService {
    async execute({ name, pix_id, key, order }: PixRequest) {
        if (name === "" || key === "") {
            throw new Error("Nome e chave é obrigátorio")
        }

        const pixCreated = await prismaClient.pixKey.create({
            data: {
                pix_id: pix_id,
                name: name,
                key: key,
                visible: true,
                order: order,
            }
        })

        return (pixCreated)
    }
}

export { CreatePixKeysService }