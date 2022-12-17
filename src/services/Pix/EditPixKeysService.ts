import prismaClient from '../../prisma'

interface PixRequest {
    name: string;
    key: string;
    type: string;
    visible: boolean;
    id: string;
}

class EditPixKeysService {
    async execute({ id, visible, name, key, type }: PixRequest) {
        if (name === "" || key === "" || type === "") {
            throw new Error("Nome, tipo e chave é obrigátorio")
        }


        const pixEdited = await prismaClient.pixKey.update({
            where: {
                id: id
            },
            data: {
                name: name,
                key: key,
                type: type,
                visible: visible
            }
        })

        return (pixEdited)
    }
}

export { EditPixKeysService }