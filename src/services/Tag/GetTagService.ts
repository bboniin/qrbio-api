import prismaClient from '../../prisma'

interface TagRequest {
    id: string;
}

class GetTagService {
    async execute({ id }: TagRequest) {

        if (!id) {
            throw new Error("ID é obrigátorio")
        }

        const getTag = await prismaClient.tag.findMany({
            where: {
                id: {
                    contains: id,
                },
            },
            include: {
                batch: {
                    include: {
                        tags: true
                    }
                },
            }
        })

        if (getTag.length == 0) {
            throw new Error("Nenhuma tag foi encontrada")
        }

        if (getTag.length != 1) {
            throw new Error("Várias tags foram encontradas, digite mais caracteres")
        }

        return (getTag)
    }
}

export { GetTagService }