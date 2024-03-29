import prismaClient from '../../prisma'

interface TextRequest {
    name: string;
    id: string;
    userId: string;
    text: string;
    alignment: string;
    icon_name: string;
    open: boolean;
}

class EditTextService {
    async execute({ name, id, icon_name, userId, text, open, alignment }: TextRequest) {

        const getText = await prismaClient.text.findUnique({
            where: {
                id: id
            }
        })

        if (getText.user_id != userId) {
            throw new Error("Esse perfil não pertence ao Usuário")
        }

        if (name === "" || text === "") {
            throw new Error("Nome e url é obrigátorio")
        }

        const textEdited = await prismaClient.text.update({
            where: {
                id: id
            },
            data: {
                name: name,
                text: text,
                open: open,
                icon_name: icon_name,
                alignment: alignment
            }
        })

        return (textEdited)
    }
}

export { EditTextService }