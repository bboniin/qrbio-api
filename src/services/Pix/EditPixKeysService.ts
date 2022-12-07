import prismaClient from '../../prisma'

interface PixRequest {
    name: string;
    key: string;
    visible: boolean;
    id: string;
}

class EditPixKeysService {
    async execute({ name, id, visible, key }: PixRequest) {
        if (name === "" || key === "") {
            throw new Error("Nome e chave é obrigátorio")
        }

        const pixEdited = await prismaClient.pixKey.update({
            where: {
                id: id
            },
            data: {
                name: name,
                key: key,
                visible: visible
            }
        })

        return (pixEdited)
    }
}

export { EditPixKeysService }