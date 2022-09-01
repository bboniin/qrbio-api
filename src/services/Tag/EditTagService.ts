import prismaClient from '../../prisma'

interface TagRequest {
    name: string;
    id: string;
}

class EditTagService {
    async execute({ name, id }: TagRequest) {

        if (name === "") {
            throw new Error("Nome é obrigátorio")
        }

        console.log(name)

        const tagEdited = await prismaClient.tag.update({
            where: {
                id: id
            },
            data: {
                name: name,
            }
        })

        return (tagEdited)
    }
}

export { EditTagService }