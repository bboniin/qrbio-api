import prismaClient from '../../prisma'

interface TagRequest {
    id: string;
}

class GetTagService {
    async execute({ id }: TagRequest) {

        if (!id) {
            throw new Error("ID é obrigátorio")
        }

        const getTag = await prismaClient.tag.findUnique({
            where: {
                id: id
            },
            include: {
                batch: {
                    include: {
                        tags: true
                    }
                },
            }
        })

        if (!getTag) {
            throw new Error("Tag não foi encontrada")
        }

        return (getTag)
    }
}

export { GetTagService }