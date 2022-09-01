import prismaClient from '../../prisma'

interface TagRequest {
    id: string;
}

class ListTagsService {
    async execute({ id }: TagRequest) {

        const listTags = await prismaClient.tag.findMany({
            where: {
                profile_id: id
            }
        })

        return (listTags)
    }
}

export { ListTagsService }