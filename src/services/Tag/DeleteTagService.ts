import prismaClient from '../../prisma'

interface TagRequest {
    id: string;
}

class DeleteTagService {
    async execute({ id }: TagRequest) {

        const tagDeleted = await prismaClient.tag.delete({
            where: {
                id: id
            }
        })
        return (tagDeleted)
    }
}

export { DeleteTagService }