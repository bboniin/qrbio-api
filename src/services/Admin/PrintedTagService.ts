import prismaClient from '../../prisma'

interface TagRequest {
    id: string;
}

class PrintedTagService {
    async execute({ id }: TagRequest) {

        if (!id) {
            throw new Error("Id da tag é obrigátorio")
        }
        const tagPrinted = await prismaClient.tag.update({
            where: {
                id: id
            },
            data: {
                printed: true,
            }
        })

        return (tagPrinted)
    }
}

export { PrintedTagService }